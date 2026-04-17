"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "./SectionLabel";

interface ProblemBlockProps {
  industry?: string;
}

const DEFAULT_PAINS = [
  "The founder is the bottleneck. Every decision routes through one person.",
  "The team runs on heroics. Manual work dressed up as strategy.",
  "Tools stack up. None of them talk. Every stack is a tax on your ops.",
  "Hiring is the only lever. Growth means payroll. Payroll means drag.",
  "The work that moves the business happens at night and on weekends.",
];

/**
 * The Problem block. Buyer's language. Pain points that resonate.
 * Industry prop swaps in tailored language if the prospect belongs to a known vertical.
 */
export default function ProblemBlock({ industry }: ProblemBlockProps) {
  return (
    <SectionWrapper id="problem">
      <SectionLabel>The Problem</SectionLabel>

      <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,1rem+3.5vw,3.75rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-8">
        Your business runs on <span className="text-[#C9A84C]">manual effort</span>.
      </h2>

      <p className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#C8C0B0] leading-relaxed max-w-3xl mb-12 font-light">
        {industry
          ? `Every ${industry} firm we audit looks the same on the inside. The symptoms below are not a team problem. They are a design problem. The design is the recruiter era, stretched into a world that moved past it.`
          : "Every services firm we audit looks the same on the inside. The symptoms are not a team problem. They are a design problem. The work that used to take a twenty person team can now be done by an AI executive that never clocks out. That work does not require more people. It requires a different design."}
      </p>

      <ul className="space-y-5 max-w-3xl">
        {DEFAULT_PAINS.map((pain, i) => (
          <li key={i} className="flex items-start gap-4 group">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.4)] flex-shrink-0" />
            <span className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#F5F0E8]/85 leading-relaxed font-light">
              {pain}
            </span>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
