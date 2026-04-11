export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const scriptUrl = "https://script.google.com/macros/s/AKfycby-U34BqwuyMFIzEyv7m_36FYzmSsiBZPCoHTI1qZWiMrArl612WpeYOekYuueW1P2G/exec";

    if (!scriptUrl) {
      return Response.json(
        { success: false, message: "GOOGLE_SCRIPT_URL is missing" },
        { status: 500 }
      );
    }

    const googleRes = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const text = await googleRes.text();

    if (!googleRes.ok) {
      return Response.json(
        {
          success: false,
          message: "Google Script request failed",
          details: text,
        },
        { status: 500 }
      );
    }

    return Response.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("SUBSCRIBE API ERROR:", error);

    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}