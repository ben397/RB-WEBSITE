import type { Metadata } from "next";
import { siteInfo } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteInfo.name}.`,
};

export default function ContactPage() {
  const { phone, email, address, hours, socials } = siteInfo;

  const socialLinks = [
    { label: "Facebook", channel: socials.facebook },
    { label: "Instagram", channel: socials.instagram },
    { label: "X (Twitter)", channel: socials.twitter },
    { label: "LinkedIn", channel: socials.linkedin },
  ];

  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/80">
            Questions about our programmes, partnership enquiries, or ways to get
            involved — we&apos;d like to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-3">
          <ContactForm />
        </div>

        <div className="md:col-span-2">
          <h2 className="font-serif text-xl font-semibold text-navy">Reach us directly</h2>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="font-semibold text-ink/60">Phone</dt>
              <dd>
                <a href={`tel:${phone.value.replace(/\s+/g, "")}`} className="text-blue hover:text-ochre">
                  {phone.value}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink/60">Email</dt>
              <dd>
                <a href={`mailto:${email.value}`} className="text-blue hover:text-ochre">
                  {email.value}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink/60">Address</dt>
              <dd className="text-ink/80">{address.value}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink/60">Hours</dt>
              <dd className="text-ink/80">{hours.weekdays}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink/60">Follow us</dt>
              <dd className="mt-1 flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.channel.value}
                    className="text-blue hover:text-ochre"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
