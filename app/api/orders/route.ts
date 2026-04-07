import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendTelegramMessage } from "@/lib/telegram";

type CartItem = {
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  size: string;
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
      return NextResponse.json({ error: "Missing name/phone" }, { status: 400 });
    }

    const currency = cart[0]?.currency ?? "UAH";
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const orderNumber = makeOrderNumber();

    const conn = await db.getConnection();
    let orderId: number | null = null;

    try {
      await conn.beginTransaction();

      const [orderRes]: any = await conn.query(
        `INSERT INTO orders
         (order_number, full_name, phone, email, city, address, delivery, payment, comment, currency, total_amount)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderNumber,
          fullName,
          phone,
          email,
          city,
          address,
          delivery,
          payment,
          comment,
          currency,
          total,
        ]
      );

      orderId = Number(orderRes.insertId);

      for (const item of cart) {
        await conn.query(
          `INSERT INTO order_items (order_id, slug, name, image, size, qty, price)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [orderId, item.slug, item.name, item.image, item.size, item.qty, item.price]
        );
      }

      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }

    // Telegram notify (після успішного коміту)
    try {
      const itemsText = cart
        .map((i) => `• ${esc(i.name)} — <b>${esc(i.size)}</b> ×${i.qty} = ${i.price * i.qty} ${esc(i.currency)}`)
        .join("\n");

      const msg =
        `🛒 <b>Нове замовлення</b>\n` +
        `№ <b>${esc(orderNumber)}</b>\n\n` +
        `👤 ${esc(fullName)}\n` +
        `📞 ${esc(phone)}\n` +
        (email ? `✉️ ${esc(email)}\n` : "") +
        `🚚 ${esc(delivery)}\n` +
        (city ? `🏙 ${esc(city)}\n` : "") +
        (address ? `📍 ${esc(address)}\n` : "") +
        `💳 ${esc(payment)}\n` +
        (comment ? `📝 ${esc(comment)}\n` : "") +
        `\n<b>Товари:</b>\n${itemsText}\n\n` +
        `💰 <b>Разом:</b> ${total} ${esc(currency)}`;

      await sendTelegramMessage(msg);
    } catch {
      // якщо телега впала — замовлення все одно успішне, не ламаємо UX
    }

    return NextResponse.json({ ok: true, orderNumber }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
