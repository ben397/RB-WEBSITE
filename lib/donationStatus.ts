import { upstash } from "@/lib/upstash";

export type DonationState = "PENDING" | "SUCCESS" | "FAILED";

export interface DonationRecord {
  state: DonationState;
  amount: number;
  phone: string;
  createdAt: number;
  mpesaReceiptNumber?: string;
  resultDescription?: string;
}

const TTL_SECONDS = 30 * 60; // a donor isn't going to sit on the PIN prompt for 30 min

const recordKey = (reference: string) => `donate:ref:${reference}`;
// PayHero's callback might identify the transaction by its own reference/
// CheckoutRequestID rather than echoing back our external_reference — the shape isn't
// documented anywhere we've seen. Index every identifier PayHero could plausibly use,
// all pointing back to OUR reference, which is the one thing the client polls by.
const identifierIndexKey = (kind: "checkout" | "payhero-ref", value: string) =>
  `donate:idx:${kind}:${value}`;

export const donationStatus = {
  async createPending(params: {
    reference: string;
    checkoutRequestId?: string;
    payheroReference?: string;
    amount: number;
    phone: string;
  }): Promise<void> {
    const record: DonationRecord = {
      state: "PENDING",
      amount: params.amount,
      phone: params.phone,
      createdAt: Date.now(),
    };
    await upstash.setJson(recordKey(params.reference), record, TTL_SECONDS);
    if (params.checkoutRequestId) {
      await upstash.setJson(
        identifierIndexKey("checkout", params.checkoutRequestId),
        params.reference,
        TTL_SECONDS,
      );
    }
    if (params.payheroReference) {
      await upstash.setJson(
        identifierIndexKey("payhero-ref", params.payheroReference),
        params.reference,
        TTL_SECONDS,
      );
    }
  },

  async resolveReference(candidate: {
    externalReference?: string;
    checkoutRequestId?: string;
    payheroReference?: string;
  }): Promise<string | null> {
    // Our own external_reference, if PayHero echoed it back, is authoritative.
    if (candidate.externalReference) return candidate.externalReference;
    if (candidate.checkoutRequestId) {
      const ref = await upstash.getJson<string>(
        identifierIndexKey("checkout", candidate.checkoutRequestId),
      );
      if (ref) return ref;
    }
    if (candidate.payheroReference) {
      const ref = await upstash.getJson<string>(
        identifierIndexKey("payhero-ref", candidate.payheroReference),
      );
      if (ref) return ref;
    }
    return null;
  },

  async markResolved(
    reference: string,
    outcome: { state: "SUCCESS" | "FAILED"; mpesaReceiptNumber?: string; resultDescription?: string },
  ): Promise<void> {
    const existing = await upstash.getJson<DonationRecord>(recordKey(reference));
    const record: DonationRecord = {
      state: outcome.state,
      amount: existing?.amount ?? 0,
      phone: existing?.phone ?? "",
      createdAt: existing?.createdAt ?? Date.now(),
      mpesaReceiptNumber: outcome.mpesaReceiptNumber,
      resultDescription: outcome.resultDescription,
    };
    await upstash.setJson(recordKey(reference), record, TTL_SECONDS);
  },

  async get(reference: string): Promise<DonationRecord | null> {
    return upstash.getJson<DonationRecord>(recordKey(reference));
  },
};
