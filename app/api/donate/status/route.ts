import { NextResponse } from "next/server";
import { donationStatus } from "@/lib/donationStatus";
import { upstash } from "@/lib/upstash";

// Polled by the donate form while a donor is completing the M-Pesa PIN prompt on their
// phone. `tracked: false` means Upstash isn't configured — the client falls back to a
// static "check your phone" message rather than polling forever for a status that will
// never arrive.
export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Missing reference." }, { status: 400 });
  }

  if (!upstash.isConfigured()) {
    return NextResponse.json({ tracked: false, state: "PENDING" });
  }

  const record = await donationStatus.get(reference);
  if (!record) {
    // Not found yet is expected right after initiation (a write can lag a read by a
    // beat) and also once the TTL expires long after the fact — treat both as PENDING
    // rather than erroring, since the client only polls for a bounded window anyway.
    return NextResponse.json({ tracked: true, state: "PENDING" });
  }

  return NextResponse.json({
    tracked: true,
    state: record.state,
    mpesaReceiptNumber: record.mpesaReceiptNumber,
    resultDescription: record.resultDescription,
  });
}
