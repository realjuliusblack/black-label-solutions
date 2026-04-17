"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "./SectionLabel";
import BeforeAfter from "./BeforeAfter";
import InstallDiagram from "./InstallDiagram";
import TimelineBlock from "./TimelineBlock";
import EngineList from "./EngineList";
import CertificationSeal from "./CertificationSeal";
import ResultsBlock from "./ResultsBlock";
import { LPU_HEADLINE, LPU_STAKES } from "@/lib/portfolio/metrics";

/**
 * The flagship. All 9 beats of the LPU case study.
 *
 * Order:
 *  1. Headline with the number
 *  2. Context
 *  3. Before / After
 *  4. Stakes
 *  5. Install diagram
 *  6. Timeline
 *  7. Engine roster (stands in for artifact gallery until screenshots land)
 *  8. Certification seal (stands in for named quote until Ali provides one)
 *  9. Results block
 */
export default function CaseStudyLPU() {
  return (
    <SectionWrapper id="lpu" className="bg-[#060503]/40">
      {/* 1 + 2. Headline and context */}
      <SectionLabel>{LPU_HEADLINE.eyebrow}</SectionLabel>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-8">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,1rem+4vw,4.25rem)] font-bold text-[#F5F0E8] leading-[1.05]">
          {LPU_HEADLINE.title}
        </h2>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 font-[family-name:var(--font-jetbrains)] text-xs sm:text-sm text-[#C9A84C]/70 tracking-[0.2em] uppercase">
        <span>{LPU_HEADLINE.clientLabel}</span>
        <span className="h-3 w-px bg-[#7A6528]/50" />
        <span>{LPU_HEADLINE.industry}</span>
        <span className="h-3 w-px bg-[#7A6528]/50" />
        <span>Operator: {LPU_HEADLINE.operator}</span>
        <span className="h-3 w-px bg-[#7A6528]/50" />
        <span>Shipped {LPU_HEADLINE.shipped}</span>
      </div>
      <p className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#C8C0B0] leading-relaxed max-w-3xl font-light mb-16">
        {LPU_HEADLINE.subtitle}
      </p>

      {/* 3. Before / After */}
      <div className="mb-20">
        <SectionLabel>Before and After</SectionLabel>
        <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1rem+2.5vw,3rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-10">
          The install, in six dimensions.
        </h3>
        <BeforeAfter />
      </div>

      {/* 4. Stakes */}
      <div className="mb-20">
        <SectionLabel>The Stakes</SectionLabel>
        <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1rem+2.5vw,3rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-8">
          Why this mattered.
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#C8C0B0] leading-relaxed max-w-3xl font-light">
          {LPU_STAKES}
        </p>
      </div>

      {/* 5. Install diagram */}
      <div className="mb-20">
        <SectionLabel>The Install</SectionLabel>
        <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1rem+2.5vw,3rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-10">
          Where the operator plugs in.
        </h3>
        <div className="rounded-2xl bg-[#161412]/50 border border-[#7A6528]/20 p-6 sm:p-10">
          <InstallDiagram />
        </div>
      </div>

      {/* 6. Timeline */}
      <div className="mb-20">
        <SectionLabel>The Timeline</SectionLabel>
        <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1rem+2.5vw,3rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-10">
          Zero to shipped in twelve weeks.
        </h3>
        <TimelineBlock />
      </div>

      {/* 7. Engines (artifact placeholder) */}
      <div className="mb-20">
        <SectionLabel>The Engines</SectionLabel>
        <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1rem+2.5vw,3rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-10">
          Five engines. One operator. Every day.
        </h3>
        <EngineList />
      </div>

      {/* 8. Certification seal (quote placeholder until Ali lands) */}
      <div className="mb-20 flex justify-center py-8">
        <CertificationSeal />
      </div>

      {/* 9. Results */}
      <ResultsBlock />
    </SectionWrapper>
  );
}
