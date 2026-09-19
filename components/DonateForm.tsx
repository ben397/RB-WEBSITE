"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { programmes } from "@/content/programs";

type Status =
  | "idle"
  | "submitting"
  | "waiting" // STK sent, polling for PayHero's callback result
  | "untracked" // STK sent, but no status store configured to poll against
  | "success"
  | "failed"
  | "timeout"
  | "error";

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];
const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 40; // ~2 minutes, generous for entering an M-Pesa PIN

export function DonateForm() {
  const [amount, setAmount] = useState<number | "">(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const pollCount = useRef(0);

  const effectiveAmount = customAmount ? Number(customAmount) : amount;

  useEffect(() => {
    if (status !== "waiting" || !reference) return;

    const interval = setInterval(async () => {
      pollCount.current += 1;
      try {
        const res = await fetch(`/api/donate/status?reference=${encodeURIComponent(reference)}`);
        const result = await res.json();

        if (!result.tracked) {
          setStatus("untracked");
          return;
        }
        if (result.state === "SUCCESS") {
          setReceipt(result.mpesaReceiptNumber ?? null);
          setStatus("success");
          return;
        }
        if (result.state === "FAILED") {
          setFailureReason(result.resultDescription ?? null);
          setStatus("failed");
          return;
        }
      } catch {
        // A single missed poll isn't fatal — try again next tick.
      }

      if (pollCount.current >= MAX_POLLS) {
        setStatus("timeout");
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [status, reference]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      amount: effectiveAmount,
      programme: String(data.get("programme") ?? ""),
    };

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setReference(result.reference ?? null);
      pollCount.current = 0;
      setStatus(result.tracked ? "waiting" : "untracked");
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Check your connection and try again.");
    }
  }

  function startOver() {
    setStatus("idle");
    setError(null);
    setReference(null);
    setReceipt(null);
    setFailureReason(null);
    pollCount.current = 0;
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage/40 bg-sage/10 p-8 text-center">
        <p className="font-serif text-2xl font-semibold text-navy">Thank you.</p>
        <p className="mt-2 text-ink/70">
          Your donation of KES {effectiveAmount.toLocaleString()} is confirmed — it goes
          straight to work RB is already doing.
        </p>
        <dl className="mt-6 space-y-1 text-sm text-ink/70">
          {receipt && (
            <p>
              M-Pesa receipt: <span className="font-semibold text-navy">{receipt}</span>
            </p>
          )}
          {reference && (
            <p>
              Reference: <span className="font-semibold text-navy">{reference}</span>
            </p>
          )}
        </dl>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="rounded-2xl border border-ochre/40 bg-ochre/5 p-6">
        <p className="font-semibold text-navy">Payment didn&apos;t go through.</p>
        <p className="mt-1 text-sm text-ink/70">
          {failureReason || "The M-Pesa payment wasn't completed."} Nothing was charged.
        </p>
        <button
          type="button"
          onClick={startOver}
          className="mt-4 rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold text-navy hover:border-ochre"
        >
          Try again
        </button>
      </div>
    );
  }

  if (status === "waiting") {
    return (
      <div className="rounded-2xl border border-sage/40 bg-sage/10 p-6">
        <p className="font-semibold text-navy">Check your phone.</p>
        <p className="mt-1 text-sm text-ink/70">
          We&apos;ve sent an M-Pesa prompt to complete your donation of KES{" "}
          {effectiveAmount.toLocaleString()}. Enter your M-Pesa PIN to confirm — this page
          will update automatically.
        </p>
        {reference && (
          <p className="mt-3 text-xs text-ink/70">
            Reference: <span className="font-semibold text-navy">{reference}</span>
          </p>
        )}
      </div>
    );
  }

  if (status === "timeout") {
    return (
      <div className="rounded-2xl border border-ink/20 bg-paper p-6">
        <p className="font-semibold text-navy">Still waiting to hear back.</p>
        <p className="mt-1 text-sm text-ink/70">
          If you completed the M-Pesa prompt, you should get an SMS confirmation from
          Safaricom shortly — that&apos;s proof of payment either way. If you didn&apos;t
          complete it, no donation was made.
        </p>
        {reference && (
          <p className="mt-3 text-xs text-ink/70">
            Reference: <span className="font-semibold text-navy">{reference}</span> — quote
            this if you follow up with us.
          </p>
        )}
        <button
          type="button"
          onClick={startOver}
          className="mt-4 rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold text-navy hover:border-ochre"
        >
          Start over
        </button>
      </div>
    );
  }

  if (status === "untracked") {
    return (
      <div className="rounded-2xl border border-sage/40 bg-sage/10 p-6">
        <p className="font-semibold text-navy">Check your phone.</p>
        <p className="mt-1 text-sm text-ink/70">
          We&apos;ve sent an M-Pesa prompt to complete your donation of KES{" "}
          {effectiveAmount.toLocaleString()}. Enter your M-Pesa PIN to confirm.
        </p>
        {reference && (
          <p className="mt-3 text-sm text-ink/70">
            Reference: <span className="font-semibold text-navy">{reference}</span> — quote
            this if you need to follow up on this donation.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-navy">Amount (KES)</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESET_AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAmount(a);
                setCustomAmount("");
              }}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                amount === a && !customAmount
                  ? "border-ochre bg-ochre text-paper"
                  : "border-ink/20 text-navy hover:border-ochre"
              }`}
            >
              {a.toLocaleString()}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={10}
          placeholder="Or enter a custom amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="mt-3 w-full rounded-lg border border-ink/20 bg-paper px-4 py-2.5 text-ink outline-none focus:border-ochre"
        />
      </div>

      <div>
        <label htmlFor="programme" className="block text-sm font-semibold text-navy">
          Support a specific programme (optional)
        </label>
        <select
          id="programme"
          name="programme"
          className="mt-1 w-full rounded-lg border border-ink/20 bg-paper px-4 py-2.5 text-ink outline-none focus:border-ochre"
        >
          <option value="">Wherever it&apos;s needed most</option>
          {programmes.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-navy">
          Name (optional)
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="mt-1 w-full rounded-lg border border-ink/20 bg-paper px-4 py-2.5 text-ink outline-none focus:border-ochre"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-navy">
          M-Pesa phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="07XX XXX XXX"
          className="mt-1 w-full rounded-lg border border-ink/20 bg-paper px-4 py-2.5 text-ink outline-none focus:border-ochre"
        />
      </div>

      {status === "error" && error && (
        <p role="alert" className="text-sm text-ochre">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !effectiveAmount}
        className="w-full rounded-full bg-ochre px-6 py-3 text-sm font-semibold text-paper hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting"
          ? "Sending prompt…"
          : `Donate KES ${effectiveAmount ? Number(effectiveAmount).toLocaleString() : "—"} via M-Pesa`}
      </button>
    </form>
  );
}
