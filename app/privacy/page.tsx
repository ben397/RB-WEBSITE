import type { Metadata } from "next";
import { siteInfo } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteInfo.name} handles data collected through this website.`,
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal variant="up">
        <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-ink/60">Last updated: {new Date().getFullYear()}</p>
      </Reveal>

      <div className="mt-10 space-y-8 text-ink/80">
        <Reveal variant="up">
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">
              What this site collects
            </h2>
            <p className="mt-2">
              The contact form on this site collects the name, email address, and message you
              submit, solely to respond to your enquiry. The donate form collects the phone
              number and amount needed to initiate an M-Pesa payment. We do not collect any
              other personal data through this site, and we do not use cookies or third-party
              analytics or advertising trackers.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up">
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">How it&apos;s used</h2>
            <p className="mt-2">
              Contact form submissions are sent directly to {siteInfo.name}&apos;s email and
              used only to respond to you. Donation details are sent to our payment
              processor solely to complete your transaction; we do not store card or mobile
              money credentials ourselves.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up">
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Your rights</h2>
            <p className="mt-2">
              Under Kenya&apos;s Data Protection Act, 2019, you can ask what data we hold
              about you and request its correction or deletion. Contact{" "}
              <a href={`mailto:${siteInfo.email.value}`} className="text-blue hover:text-ochre">
                {siteInfo.email.value}
              </a>{" "}
              for any of these requests.
            </p>
          </div>
        </Reveal>

        <Reveal variant="up">
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy">Changes</h2>
            <p className="mt-2">
              If what this site collects or how it&apos;s used changes, this page will be
              updated to reflect it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
