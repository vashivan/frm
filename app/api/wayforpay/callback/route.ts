import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createWayForPaySignature } from "@/lib/wayforpay";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    orderReference,
    transactionStatus,
    reasonCode,
  } = body;

  if (!orderReference) {
    return NextResponse.json({ error: "Missing orderReference" }, { status: 400 });
  }

  const paymentStatus =
    transactionStatus === "Approved" ? "paid" : "failed";

  await prisma.order.update({
    where: {
      orderNumber: orderReference,
    },
    data: {
      paymentStatus,
      status: paymentStatus === "paid" ? "paid" : "payment_failed",
    },
  });

  const merchantAccount = process.env.MERCHANT_LOGIN!;

  const responseSignature = createWayForPaySignature([
    merchantAccount,
    orderReference,
    "accept",
    reasonCode,
  ]);

  return NextResponse.json({
    orderReference,
    status: "accept",
    time: Math.floor(Date.now() / 1000),
    signature: responseSignature,
  });
}