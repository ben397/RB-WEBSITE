import type { Metadata } from "next";
import { siteInfo } from "@/content/site";
import { DonateForm } from "@/components/DonateForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Donate",
  description: `Support ${siteInfo.name}'s work via M-Pesa.`,
};

export default function DonatePage() {
  const { paybill, tillNumber } = siteInfo.payments;

  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Reveal variant="up">
            <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
              Support Our Work
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink/80">
              Your donation supports savings groups, psychosocial support, the Peace Cup,
              and advocacy work — led by the community it serves.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-12 px-6 py-16 md:grid-cols-5">
        <Reveal className="md:col-span-3" variant="up" delay={100}>
          <DonateForm />
        </Reveal>

        <Reveal className="md:col-span-2" variant="up" delay={180}>
          <h2 className="font-serif text-lg font-semibold text-navy">
            Prefer to pay directly?
          </h2>
          {paybill || tillNumber ? (
            <dl className="mt-4 space-y-3 text-sm">
              {paybill && (
                <div>
                  <dt className="font-semibold text-ink/60">M-Pesa Paybill</dt>
                  <dd className="text-ink/80">{paybill}</dd>
                </div>
              )}
              {tillNumber && (
                <div>
                  <dt className="font-semibold text-ink/60">Till Number</dt>
                  <dd className="text-ink/80">{tillNumber}</dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="mt-4 rounded-xl border border-dashed border-ink/20 p-4 text-sm text-ink/70">
              A direct paybill/till number will be published here once confirmed by RB. Use
              the form for now — it sends an M-Pesa prompt straight to your phone.
            </p>
          )}

          <p className="mt-6 text-sm text-ink/70">
            All amounts are in Kenyan Shillings (KES). For donations from outside Kenya,
            email{" "}
            <a href={`mailto:${siteInfo.email.value}`} className="text-blue hover:text-ochre">
              {siteInfo.email.value}
            </a>{" "}
            to arrange an international transfer.
          </p>
        </Reveal>
      </section>
    </>
  );
}
