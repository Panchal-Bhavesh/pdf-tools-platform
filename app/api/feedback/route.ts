import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const body = await req.json();
    const { rating, note, tool } = body;

    if (!rating || rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: "Invalid rating" }), {
        status: 400,
      });
    }

    const stars = "⭐".repeat(Number(rating));
    const toolLine = tool
      ? `<p><strong>Tool:</strong> ${escapeHtml(String(tool))}</p>`
      : "";
    const noteLine = note
      ? `<p><strong>Note:</strong></p><p>${escapeHtml(String(note)).replace(/\n/g, "<br>")}</p>`
      : "<p><em>No note provided</em></p>";

    await resend.emails.send({
      from: "PagelyPDF Feedback <onboarding@resend.dev>",
      to: [process.env.CONTACT_RECEIVER_EMAIL!],
      subject: `New Feedback ${stars} (${rating}/5) — PagelyPDF`,
      html: `
        <h2>New User Feedback</h2>
        <p><strong>Rating:</strong> ${stars} (${rating}/5)</p>
        ${toolLine}
        ${noteLine}
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Feedback Error:", error);
    return new Response(JSON.stringify({ error: "Failed to send feedback" }), {
      status: 500,
    });
  }
}
