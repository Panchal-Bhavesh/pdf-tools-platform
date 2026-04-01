import { Resend } from "resend";

const getResend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const resend = getResend();
    if (!resend) {
      console.error("Missing RESEND_API_KEY");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500 },
      );
    }

    if (!process.env.CONTACT_RECEIVER_EMAIL) {
      console.error("Missing CONTACT_RECEIVER_EMAIL");
      return new Response(
        JSON.stringify({ error: "Contact receiver not configured" }),
        { status: 500 },
      );
    }
    const body = await req.json();
    const { firstName, lastName, email, message } = body;
    if (!email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }
    await resend.emails.send({
      from: "PagelyPDF Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_RECEIVER_EMAIL!],
      subject: "New PagelyPDF Contact Message",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(String(firstName ?? ""))} ${escapeHtml(String(lastName ?? ""))}</p>
        <p><strong>Email:</strong> ${escapeHtml(String(email))}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(String(message)).replace(/\n/g, "<br>")}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
