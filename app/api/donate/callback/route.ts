import { NextResponse } from "next/server";
import { siteInfo } from "@/content/site";
import { donationStatus } from "@/lib/donationStatus";
import { upstash } from "@/lib/upstash";

// Confirmed real PayHero callback shape (from an actual test donation):
//
//   {
//     "forward_url": "",
//     "response": {
//       "Amount": 10,
//       "CheckoutRequestID": "ws_CO_...",
//       "ExternalReference": "INV-009",
//       "MerchantRequestID": "...",
//       "MpesaReceiptNumber": "SAE3YULR0Y",
//       "Phone": "+254...",
//       "ResultCode": 0,
//       "ResultDesc": "The service request is processed successfully.",
//       "Status": "Success"
//     },
//     "status": true
//   }
//
// The top-level `status` is a BOOLEAN pass/fail flag; the nested `response.Status` is a
// separate STRING ("Success"/presumably "Failed"). Must not be treated as the same field
// under two spellings — an earlier version of this code did exactly that (picked
// `status`/`Status` together, so the boolean `true` shadowed the string every time) and
// only produced the right answer by accident, because ResultCode also independently
// confirmed success. Kept a fallback for raw Safaricom Daraja nesting
// (Body.stkCallback.{ResultCode,CallbackMetadata.Item[]}) in case a different PayHero
// account or event type ever sends that shape instead — untested, but harmless if unused.
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
  const pickTyped = <T,>(guard: (v: unknown) => v is T, ...keys: string[]): T | undefined => {
    for (const source of [obj, nested, stk]) {
      for (const key of keys) {
        const value = (source as Record<string, unknown>)?.[key];
        if (guard(value)) return value;
      }
    }
    return undefined;
  };
  const isBoolean = (v: unknown): v is boolean => typeof v === "boolean";
  const isString = (v: unknown): v is string => typeof v === "string";

  // Daraja's CallbackMetadata.Item is an array of {Name, Value} pairs rather than a flat
  // object — flatten it so `pick` can reach into it too.
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
  // "status"/"success" only when they're actually booleans, "Status" only when a string —
  // deliberately not merged into one lookup (see the shape note above for why).
  const booleanFlag = pickTyped(isBoolean, "status", "success");
  const statusString = (pickTyped(isString, "Status") ?? "").toUpperCase();

  const success =
    booleanFlag === true ||
    resultCode === 0 ||
    resultCode === "0" ||
    ["SUCCESS", "COMPLETED", "PAID"].includes(statusString);
  const explicitFailure =
    booleanFlag === false ||
    (typeof resultCode === "number" && resultCode !== 0) ||
    ["FAILED", "CANCELLED", "CANCELED", "TIMEOUT", "ERROR"].includes(statusString);

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
