import { NextResponse } from "next/server";
import { siteInfo } from "@/content/site";

// PayHero (or M-Pesa directly) POSTs the payment result here once the donor confirms on
// their phone. Payload shape isn't verified against live docs from this environment —
// read defensively and log the raw body either way so nothing silently disappears.
export async function POST(request: Request) {
  const raw = await request.json().catch(() => null);

  if (raw) {
    console.log("[donate callback]", JSON.stringify(raw));

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const to = process.env.CONTACT_TO_EMAIL || siteInfo.email.value;
      const from =
        process.env.CONTACT_FROM_EMAIL || "Refugee Brotherhood Website <onboarding@resend.dev>";

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          subject: "Donation payment notification",
          text: `A donation payment callback was received:\n\n${JSON.stringify(raw, null, 2)}`,
        }),
      }).catch((err) => console.error("[donate callback] notification email failed", err));
    }
  }

  // M-Pesa/PayHero expects a fast 200 acknowledgement regardless of what we do with it.
  return NextResponse.json({ received: true });
}
