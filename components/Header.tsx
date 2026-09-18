import Link from "next/link";
import { navLinks, siteInfo } from "@/content/site";

export function Header() {
  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-semibold text-navy">
          {siteInfo.name}
        </Link>
        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-ochre"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/donate"
          className="rounded-full bg-ochre px-5 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
        >
          Donate
        </Link>
      </div>
    </header>
  );
}
