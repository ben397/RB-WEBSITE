import Link from "next/link";
import { siteInfo } from "@/content/site";
import { impactStats } from "@/content/impact";
import { StatBlock } from "@/components/StatBlock";

// The visual panel is a deliberate abstract placeholder (gradient + layered shapes), not a
// stock photo pretending to be real. Swap for consented photography of RB's actual work
// once it's available — this environment has no network access to pull external images.
export function Hero() {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-5">
        <div className="md:col-span-3">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-navy sm:text-5xl">
            Refugees supporting refugees, in Nairobi and beyond.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80">{siteInfo.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/programmes"
              className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-paper hover:opacity-90"
            >
              See our programmes
            </Link>
            <Link
              href="/donate"
              className="rounded-full bg-ochre px-6 py-3 text-sm font-semibold text-paper hover:opacity-90"
            >
              Support the work
            </Link>
          </div>
          <div className="mt-14">
            <StatBlock stats={impactStats} />
          </div>
        </div>

        <div
          className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-blue via-navy to-ochre md:col-span-2 md:block"
          aria-hidden="true"
        >
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-paper/10" />
          <div className="absolute bottom-16 right-0 h-56 w-56 rounded-full bg-ochre/30" />
          <div className="absolute inset-x-8 bottom-8 rounded-2xl bg-paper/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-paper/90">Peace Cup · Kayole, Nairobi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
