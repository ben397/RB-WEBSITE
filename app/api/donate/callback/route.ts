import { NextResponse } from "next/server";
import { siteInfo } from "@/content/site";
import { donationStatus } from "@/lib/donationStatus";
import { upstash } from "@/lib/upstash";

// The callback payload shape isn't documented anywhere seen so far. What's known: (a)
// PayHero's own initiation response uses success/status/reference/CheckoutRequestID
// (see ../route.ts), so the callback plausibly mirrors that; (b) PayHero sits on top of
// Safaricom's Daraja STK callback, which nests everything under
// Body.stkCallback.{ResultCode,ResultDesc,CheckoutRequestID,CallbackMetadata.Item[]} —
// some aggregators pass that through directly or flatten it into a "response" object.
// Rather than commit to one shape, check the plausible spots for each field. Verify
// against a real test donation's logged payload and adjust if this misses anything.
interface ParsedCallback {
  externalReference?: string;
  checkoutRequestId?: string;
  payheroReference?: string;
  success: boolean;
  mpesaReceiptNumber?: string;
  resultDescription?: string;
}

function parseCallback(raw: unknown): ParsedCallback {
  const obj = (raw ?? {}) as Record<string, unknown>;
  const nested = (obj.response ?? obj.Body ?? {}) as Record<string, unknown>;
  const stk = (nested as { stkCallback?: Record<string, unknown> }).stkCallback ?? nested;

  const pick = (...keys: string[]): unknown => {
    for (const source of [obj, nested, stk]) {
      for (const key of keys) {
        const value = (source as Record<string, unknown>)?.[key];
        if (value !== undefined && value !== null) return value;
      }
    }
    return undefined;
  };

  // Daraja's CallbackMetadata.Item is an array of {Name, Value} pairs rather than a flat
  // object — flatten it so the same `pick` helper can reach into it too.
  const metadataItems = (stk as { CallbackMetadata?: { Item?: { Name?: string; Value?: unknown }[] } })
    ?.CallbackMetadata?.Item;
  const metadata: Record<string, unknown> = {};
  if (Array.isArray(metadataItems)) {
    for (const item of metadataItems) {
      if (item?.Name) metadata[item.Name] = item.Value;
    }
  }
  const pickWithMetadata = (...keys: string[]): unknown => pick(...keys) ?? keys.map((k) => metadata[k]).find((v) => v != null);

  const resultCode = pick("ResultCode", "result_code");
  const status = String(pick("status", "Status") ?? "").toUpperCase();
  const successFlag = pick("success");

  const success =
    successFlag === true ||
    resultCode === 0 ||
    resultCode === "0" ||
    ["SUCCESS", "COMPLETED", "PAID"].includes(status);
  const explicitFailure =
    successFlag === false ||
    (typeof resultCode === "number" && resultCode !== 0) ||
    ["FAILED", "CANCELLED", "CANCELED", "TIMEOUT", "ERROR"].includes(status);

  return {
    externalReference: pick("external_reference", "ExternalReference") as string | undefined,
    checkoutRequestId: pick("CheckoutRequestID", "checkout_request_id") as string | undefined,
    payheroReference: pick("reference", "Reference") as string | undefined,
    success: success && !explicitFailure,
    mpesaReceiptNumber: pickWithMetadata("MpesaReceiptNumber", "mpesa_receipt_number") as
      | string
      | undefined,
    resultDescription: pick("ResultDesc", "result_desc", "resultDesc") as string | undefined,
  };
}

// PayHero POSTs the payment result here (to PAYHERO_CALLBACK_URL) once the donor confirms
// on their phone. The initiation request/response in ../route.ts are matched against
// PayHero's docs, but this callback's payload shape isn't — read defensively and log the
// raw body either way so nothing silently disappears.
export async function POST(request: Request) {
  const raw = await request.json().catch(() => null);

  if (raw) {
    console.log("[donate callback] raw payload:", JSON.stringify(raw));

    if (upstash.isConfigured()) {
      const parsed = parseCallback(raw);
      const reference = await donationStatus.resolveReference(parsed);
      if (reference) {
        await donationStatus.markResolved(reference, {
          state: parsed.success ? "SUCCESS" : "FAILED",
          mpesaReceiptNumber: parsed.mpesaReceiptNumber,
          resultDescription: parsed.resultDescription,
        });
      } else {
        console.error(
          "[donate callback] couldn't match this callback to a tracked donation — the payload shape may not match what parseCallback expects:",
          JSON.stringify(parsed),
        );
      }
    }

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
