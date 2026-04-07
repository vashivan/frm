export async function sendTelegramMessage(text: string) {
  const token = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  // Якщо не задано — просто нічого не робимо (щоб не ламати checkout)
  if (!token || !chatId) return;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
}
