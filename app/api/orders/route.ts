import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";
import { createWayForPaySignature } from "@/lib/wayforpay";

type CartItem = {
  slug: string;
  name?: string;
  color?: string;
  price?: number;
  currency?: string;
  image?: string;
  size?: string;
  qty: number;
};

function makeOrderNumber() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `FRM-${y}${m}${day}-${rnd}`;
}

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cart: CartItem[] = body.cart ?? [];
    const customer = body.customer ?? {};

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const fullName = String(customer.fullName ?? "").trim();
    const phone = String(customer.phone ?? "").trim();
    const email = String(customer.email ?? "").trim() || null;
    const city = String(customer.city ?? "").trim() || null;
    const address = String(customer.address ?? "").trim() || null;
    const delivery = String(customer.delivery ?? "nova");
    const payment = String(customer.payment ?? "cod");
    const comment = String(customer.comment ?? "").trim() || null;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Missing name/phone" },
        { status: 400 }
      );
    }

    const slugs = cart.map((item) => item.slug);

    const products = await prisma.product.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
    });

    let totalAmount = 0;
    const currency = "UAH";

    const orderItems = cart.map((item) => {
      const product = products.find((p) => p.slug === item.slug);

      if (!product) {
        throw new Error(`Product not found: ${item.slug}`);
      }

      const qty = Number(item.qty);

      if (!qty || qty < 1) {
        throw new Error(`Invalid quantity for: ${item.slug}`);
      }

      const price = product.price;
      const total = price * qty;

      totalAmount += total;

      return {
        productId: product.id,
        name: product.name,
        size: item.size ?? null,
        color: item.color ?? null,
        quantity: qty,
        price,
        total,
      };
    });

    const orderNumber = makeOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,

        customerName: fullName,
        customerPhone: phone,
        customerEmail: email,

        subtotal: totalAmount,
        deliveryFee: 0,
        total: totalAmount,
        currency,

        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    const orderDate = Math.floor(Date.now() / 1000);

    const productName = order.items.map((item) => item.name);
    const productCount = order.items.map((item) => item.quantity);
    const productPrice = order.items.map((item) => item.price);

    const merchantAccount = process.env.MERCHANT_LOGIN!;
    const merchantDomainName = process.env.WAYFORPAY_DOMAIN!;
    const amount = order.total;
    // const currency = order.currency;

    const merchantSignature = createWayForPaySignature([
      merchantAccount,
      merchantDomainName,
      order.orderNumber,
      orderDate,
      amount,
      currency,
      ...productName,
      ...productCount,
      ...productPrice,
    ]);

    const paymentData = {
      merchantAccount,
      merchantDomainName,
      merchantTransactionType: "AUTO",
      merchantTransactionSecureType: "AUTO",
      merchantSignature,
      apiVersion: 1,
      language: "UA",

      serviceUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/wayforpay/callback`,
      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?order=${order.orderNumber}`,

      orderReference: order.orderNumber,
      orderDate,
      amount,
      currency,

      productName,
      productCount,
      productPrice,

      clientFirstName: fullName,
      clientPhone: phone,
      clientEmail: email ?? "",
    };

    try {
      const itemsText = order.items
        .map(
          (i) =>
            `• ${esc(i.name)} — <b>${esc(i.size ?? "-")}</b> - <b>${esc(
              i.color ?? "-"
            )}</b> × ${i.quantity} = ${i.total} ${esc(currency)}`
        )
        .join("\n");

      const msg =
        `🛒 <b>Нове замовлення</b>\n` +
        `№ <b>${esc(order.orderNumber)}</b>\n\n` +
        `👤 ${esc(fullName)}\n` +
        `📞 ${esc(phone)}\n` +
        (email ? `✉️ ${esc(email)}\n` : "") +
        `🚚 ${esc(delivery)}\n` +
        (city ? `🏙 ${esc(city)}\n` : "") +
        (address ? `📍 ${esc(address)}\n` : "") +
        `💳 ${esc(payment)}\n` +
        (comment ? `📝 ${esc(comment)}\n` : "") +
        `\n<b>Товари:</b>\n${itemsText}\n\n` +
        `💰 <b>Разом:</b> ${totalAmount} ${esc(currency)}`;

      await sendTelegramMessage(msg);
    } catch {
      // Telegram не має ламати створення замовлення
    }

    return NextResponse.json(
      {
        ok: true,
        orderNumber: order.orderNumber,
        orderId: order.id,
        total: order.total,
        paymentData,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("ORDER_CREATE_ERROR", e);

    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}