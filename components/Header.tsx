import Image from "next/image";
import Link from "next/link";
import { navLinks, siteInfo } from "@/content/site";
import { MobileNav } from "@/components/MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-navy">
          <Image src="/rb-icon.png" alt="" width={36} height={36} className="h-9 w-9" priority />
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
        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="rounded-full bg-ochre px-5 py-2 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
          >
            Donate
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
