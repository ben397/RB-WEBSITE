import { NextResponse } from "next/server";
import { siteInfo } from "@/content/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactBody | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No credential configured — say so plainly instead of pretending the message sent.
    return NextResponse.json(
      {
        error:
          "This form isn't wired to send email yet. Set RESEND_API_KEY (and optionally CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL) in the environment.",
      },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || siteInfo.email.value;
  const from = process.env.CONTACT_FROM_EMAIL || "Refugee Brotherhood Website <onboarding@resend.dev>";

  // Resend's HTTP API — verify field names against resend.com/docs/api-reference/emails/send-email
  // before relying on this in production; it hasn't been exercised against a live key here.
  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!resendRes.ok) {
    return NextResponse.json(
      { error: "Message could not be sent right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
