import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const subject = formData.get("subject")?.toString() || "New contact form message";
    const message = formData.get("message")?.toString() || "";
    const honeypot = formData.get("website")?.toString();

    // Silently drop bot submissions
    if (honeypot) {
      return new Response(null, { status: 200 });
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const response = await fetch("https://api.resend.com/emails", {
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

    if (!response.ok) {
      console.error("Resend error:", await response.text());
      return new Response(JSON.stringify({ error: "Failed to send" }), { status: 502 });
    }

    return request.headers.get("accept")?.includes("application/json")
      ? new Response(JSON.stringify({ success: true }), { status: 200 })
      : new Response(null, { status: 302, headers: { Location: "/contact?sent=true" } });
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
};