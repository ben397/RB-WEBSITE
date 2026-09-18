import { Hero } from "@/components/Hero";
import { ProgrammeSection } from "@/components/ProgrammeSection";
import { TeamSection } from "@/components/TeamSection";
import { PartnersStrip } from "@/components/PartnersStrip";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgrammeSection />
      <PartnersStrip />
      <TeamSection />
      <CTASection />
    </>
  );
}
