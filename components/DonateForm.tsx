"use client";

import { useState, type FormEvent } from "react";
import { programmes } from "@/content/programs";

type Status = "idle" | "submitting" | "success" | "error";

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

export function DonateForm() {
  const [amount, setAmount] = useState<number | "">(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const effectiveAmount = customAmount ? Number(customAmount) : amount;

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
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Check your connection and try again.");
    }
  }

  if (status === "success") {
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
