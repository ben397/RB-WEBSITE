import type { Metadata } from "next";
import { siteInfo } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Annual Report",
  description: `${siteInfo.name}'s annual reports and financial summaries.`,
};

export default function AnnualReportPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal variant="up">
        <h1 className="font-serif text-4xl font-semibold text-navy sm:text-5xl">
          Annual Report
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/80">
          Reports and financial summaries showing how {siteInfo.name} uses its resources.
        </p>
      </Reveal>

      <Reveal variant="fade" delay={120}>
        <div className="mt-10 rounded-xl border border-dashed border-ink/20 p-8 text-center">
          <p className="text-ink/70">
            No report has been published yet. This page is ready to hold {siteInfo.name}
            &apos;s first published annual report and financial summary.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
