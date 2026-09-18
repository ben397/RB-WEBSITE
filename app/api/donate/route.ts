import { NextResponse } from "next/server";

interface DonateBody {
  name?: string;
  phone?: string;
  amount?: number;
  programme?: string;
}

// Accepts 2547XXXXXXXX, 2541XXXXXXXX, 07XXXXXXXX, 01XXXXXXXX, or +254 variants and
// normalises to the 2547XXXXXXXX / 2541XXXXXXXX format M-Pesa APIs expect.
function normaliseKenyanPhone(raw: string): string | null {
  const digits = raw.replace(/[^\d]/g, "");
  if (/^254(7|1)\d{8}$/.test(digits)) return digits;
  if (/^0(7|1)\d{8}$/.test(digits)) return `254${digits.slice(1)}`;
  if (/^(7|1)\d{8}$/.test(digits)) return `254${digits}`;
  return null;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as DonateBody | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const phone = normaliseKenyanPhone(body.phone ?? "");
  const amount = Number(body.amount);

  if (!phone) {
    return NextResponse.json(
      { error: "Enter a valid Safaricom M-Pesa number (e.g. 07XX XXX XXX)." },
      { status: 400 },
    );
  }
  if (!Number.isFinite(amount) || amount < 10) {
    return NextResponse.json(
      { error: "Enter an amount of at least KES 10." },
      { status: 400 },
    );
  }

  const apiKey = process.env.PAYHERO_API_KEY;
  const channelId = process.env.PAYHERO_CHANNEL_ID;

  if (!apiKey || !channelId) {
    // No credentials configured — say so plainly instead of pretending the STK push went out.
    return NextResponse.json(
      {
        error:
          "M-Pesa payments aren't wired up yet. Set PAYHERO_API_KEY and PAYHERO_CHANNEL_ID in the environment.",
      },
      { status: 503 },
    );
  }

  const reference = `RB-${Date.now()}`;

  // PayHero's STK push API — verify field names and auth scheme against
  // docs.payhero.co.ke before relying on this in production; it hasn't been exercised
  // against a live key here.
  const payheroRes = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
    method: "POST",
    headers: {
      Authorization: apiKey.startsWith("Basic ") ? apiKey : `Basic ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amount),
      phone_number: phone,
      channel_id: Number(channelId),
      provider: "m-pesa",
      external_reference: reference,
      customer_name: body.name || undefined,
      callback_url: process.env.PAYHERO_CALLBACK_URL,
    }),
  });

  if (!payheroRes.ok) {
    return NextResponse.json(
      { error: "Couldn't start the M-Pesa payment right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, reference });
}
