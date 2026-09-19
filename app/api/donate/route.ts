import { NextResponse } from "next/server";
import { donationStatus } from "@/lib/donationStatus";
import { upstash } from "@/lib/upstash";

interface DonateBody {
  name?: string;
  phone?: string;
  amount?: number;
  programme?: string;
}

// Accepts 2547XXXXXXXX, 2541XXXXXXXX, 07XXXXXXXX, 01XXXXXXXX, or +254 variants and
// normalises to the 07XXXXXXXX / 01XXXXXXXX format PayHero's docs show
// (e.g. "0787677676") — not the 254-prefixed form.
function normaliseKenyanPhone(raw: string): string | null {
  const digits = raw.replace(/[^\d]/g, "");
  if (/^254(7|1)\d{8}$/.test(digits)) return `0${digits.slice(3)}`;
  if (/^0(7|1)\d{8}$/.test(digits)) return digits;
  if (/^(7|1)\d{8}$/.test(digits)) return `0${digits}`;
  return null;
}

// PayHero's dashboard issues an API Username + API Password (used as standard HTTP
// Basic auth) and separately shows the already-base64-encoded "Basic auth token" for
// convenience — there's no separate opaque "API key". Support either: a token pasted
// directly, or a username/password pair encoded here.
function resolvePayheroBasicAuth(): string | null {
  const token = process.env.PAYHERO_BASIC_AUTH_TOKEN;
  if (token) return token.startsWith("Basic ") ? token : `Basic ${token}`;

  const username = process.env.PAYHERO_API_USERNAME;
  const password = process.env.PAYHERO_API_PASSWORD;
  if (username && password) {
    return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
  }

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

  const basicAuth = resolvePayheroBasicAuth();
  const channelId = process.env.PAYHERO_CHANNEL_ID;

  if (!basicAuth || !channelId) {
    // No credentials configured — say so plainly instead of pretending the STK push went out.
    return NextResponse.json(
      {
        error:
          "M-Pesa payments aren't wired up yet. Set PAYHERO_API_USERNAME + PAYHERO_API_PASSWORD (or PAYHERO_BASIC_AUTH_TOKEN) and PAYHERO_CHANNEL_ID in the environment.",
      },
      { status: 503 },
    );
  }

  const externalReference = `RB-${Date.now()}`;
  const upstashConfigured = upstash.isConfigured();
  const paymentFailedResponse = NextResponse.json(
    { error: "Couldn't start the M-Pesa payment right now. Please try again shortly." },
    { status: 502 },
  );

  let result: { success?: boolean; reference?: string; CheckoutRequestID?: string } | null;
  try {
    // PayHero's "Initiate MPESA STK Push" endpoint (backend.payhero.co.ke/api/v2/payments).
    const payheroRes = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount),
        phone_number: phone,
        channel_id: Number(channelId),
        provider: "m-pesa",
        external_reference: externalReference,
        customer_name: body.name || undefined,
        callback_url: process.env.PAYHERO_CALLBACK_URL,
        credential_id: process.env.PAYHERO_CREDENTIAL_ID || undefined,
      }),
    });
    result = await payheroRes.json().catch(() => null);
    if (!payheroRes.ok) return paymentFailedResponse;
  } catch (err) {
    // Network failure reaching PayHero (DNS, timeout, connection reset) — fail the same
    // way as a bad response, not with an unhandled 500.
    console.error("[donate] PayHero request failed", err);
    return paymentFailedResponse;
  }

  // A 201 with success:true and status "QUEUED" means the STK push was sent to the
  // phone — it does not mean the donor has paid yet. That confirmation arrives later at
  // PAYHERO_CALLBACK_URL (app/api/donate/callback/route.ts), tracked below by
  // externalReference so the client can poll for it.
  if (!result?.success) {
    return paymentFailedResponse;
  }

  if (upstashConfigured) {
    await donationStatus.createPending({
      reference: externalReference,
      checkoutRequestId: result.CheckoutRequestID,
      payheroReference: result.reference,
      amount: Math.round(amount),
      phone,
    });
  }

  return NextResponse.json({
    ok: true,
    reference: externalReference,
    tracked: upstashConfigured,
  });
}
