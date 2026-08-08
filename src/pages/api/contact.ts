import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const subject = formData.get("subject")?.toString() || "New contact form message";
    const message = formData.get("message")?.toString() || "";
    const honeypot = formData.get("website")?.toString();
    const recaptchaToken = formData.get("recaptchaToken")?.toString();

    const wantsJson = request.headers.get("accept")?.includes("application/json");

    // Silently accept-but-drop bot submissions caught by the honeypot
    if (honeypot) {
      return wantsJson
        ? new Response(JSON.stringify({ success: true }), { status: 200 })
        : redirect("/contact?sent=true");
    }

    if (!name || !email || !message) {
      return wantsJson
        ? new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
        : redirect("/contact?error=true");
    }

    // Verify reCAPTCHA v3 token server-side
    if (!recaptchaToken) {
      return wantsJson
        ? new Response(JSON.stringify({ error: "Missing recaptcha token" }), { status: 400 })
        : redirect("/contact?error=true");
    }

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: import.meta.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      }),
    });
    const verifyData = await verifyRes.json();

    // v3 returns a score 0.0 (likely bot) to 1.0 (likely human); 0.5 is Google's suggested cutoff
    if (!verifyData.success || verifyData.score < 0.5) {
      console.warn("reCAPTCHA failed:", verifyData);
      return wantsJson
        ? new Response(JSON.stringify({ error: "Failed spam check" }), { status: 400 })
        : redirect("/contact?error=true");
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Piyush Bansod Website <hello@mail.piyushbansod.com>",
        to: "howdypiyush@gmail.com",
        cc: "clysentra@gmail.com",
        reply_to: email,
        subject: `[Contact Form] ${subject}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
      }),
    });

    if (!emailRes.ok) {
      console.error("Resend error:", await emailRes.text());
      return wantsJson
        ? new Response(JSON.stringify({ error: "Failed to send" }), { status: 502 })
        : redirect("/contact?error=true");
    }

    return wantsJson
      ? new Response(JSON.stringify({ success: true }), { status: 200 })
      : redirect("/contact?sent=true");
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
};