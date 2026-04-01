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

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return jsonResponse({ error: "Failed to send email" }, 500);
  }
}

// Respond to preflight requests and attach CORS headers to JSON responses
function corsHeaders() {
  // You can restrict this to specific origins by setting ALLOWED_ORIGINS in env
  const allowed = process.env.ALLOWED_ORIGINS ?? "*";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function jsonResponse(body: unknown, status = 200) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...corsHeaders(),
  };
  return new Response(JSON.stringify(body), { status, headers });
}

export async function OPTIONS() {
  // Reply to CORS preflight
  return new Response(null, { status: 204, headers: corsHeaders() });
}
