import Image from "next/image";
import Link from "next/link";
import { siteInfo } from "@/content/site";
import { impactStats } from "@/content/impact";
import { StatBlock } from "@/components/StatBlock";
import { Reveal } from "@/components/Reveal";

// Stock photo standing in for real photography of RB's work — swap for consented
// photography of RB's actual activities once available.
export function Hero() {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-5">
        <Reveal className="md:col-span-3" variant="up">
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
        </Reveal>

        <Reveal className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl md:col-span-2 md:block" delay={150} variant="scale">
          <Image
            src="/images/hero-community.jpg"
            alt="Smiling children in the community Refugee Brotherhood serves"
            fill
            className="hero-image-drift object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
            priority
          />
          <div className="absolute inset-x-8 bottom-8 rounded-2xl bg-paper/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-paper/90">Peace Cup · Kayole, Nairobi</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
