import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();
    const msg = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}
  `;

  await sendTelegramMessage(msg);
  } catch (error) {
    console.error("Error sending form data:", error);
    return new Response("Invalid request", { status: 400 });
  }

  return new Response("Form submitted successfully");
}
