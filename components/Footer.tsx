import Link from "next/link";
import { navLinks, siteInfo } from "@/content/site";

export function Footer() {
  const { phone, email, address, socials, registration } = siteInfo;

  const socialLinks = [
    { label: "Facebook", channel: socials.facebook },
    { label: "Instagram", channel: socials.instagram },
    { label: "X (Twitter)", channel: socials.twitter },
    { label: "LinkedIn", channel: socials.linkedin },
  ];

  return (
    <footer className="border-t border-paper/10 bg-navy text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold">{siteInfo.name}</p>
          <p className="mt-3 max-w-xs text-sm text-paper/70">{siteInfo.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-paper/60">
            Navigate
          </p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-paper/80 hover:text-ochre">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-paper/60">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-paper/80">
            <li>
              <a href={`tel:${phone.value.replace(/\s+/g, "")}`} className="hover:text-ochre">
                {phone.value}
              </a>
            </li>
            <li>
              <a href={`mailto:${email.value}`} className="hover:text-ochre">
                {email.value}
              </a>
            </li>
            <li>{address.value}</li>
          </ul>
          <ul className="mt-4 flex gap-4">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.channel.value} className="text-sm text-paper/80 hover:text-ochre">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 px-6 py-4 text-xs text-paper/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p>
            © {new Date().getFullYear()} {siteInfo.name}
            {registration.value && ` · Reg. No. ${registration.value}`}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            <li>
              <Link href="/governance" className="hover:text-ochre">
                Governance
              </Link>
            </li>
            <li>
              <Link href="/safeguarding" className="hover:text-ochre">
                Safeguarding
              </Link>
            </li>
            <li>
              <Link href="/annual-report" className="hover:text-ochre">
                Annual Report
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-ochre">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
