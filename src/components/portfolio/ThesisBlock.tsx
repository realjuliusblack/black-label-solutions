"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "./SectionLabel";

/**
 * The Thesis. What separates BLS from every other AI agency.
 * This is the proprietary POV. The Operator Model.
 */
export default function ThesisBlock() {
  return (
    <SectionWrapper id="thesis" className="bg-[#060503]/60">
      <SectionLabel>The Thesis</SectionLabel>

      <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,1rem+3.5vw,3.75rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-8">
        The <span className="text-[#C9A84C]">Operator Model</span>.
      </h2>

      <div className="space-y-6 max-w-3xl font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#C8C0B0] leading-relaxed font-light">
        <p>
          Most AI is sold as a tool. A thing you open, a thing you prompt, a thing you put down. That is not what your business needs. Your business needs an executive.
        </p>
        <p>
          An <span className="text-[#F5F0E8]">Operator</span> is a permanent AI executive installed into your company. It has a name. It has a voice. It has the authority you give it. It runs your workflows, manages your sub agents, reports to you on your terms, and gets smarter every day it runs.
        </p>
        <p>
          We build one operator. For one company. Every time. No templates. No app store. No multi tenant SaaS. Your operator lives in your account, on your credentials, reporting to your team. If the engagement ends, you keep it.
        </p>
        <p className="text-[#F5F0E8]/90">
          This is what separates a $25K integration from a $250K install. The install is the product.
        </p>
      </div>
    </SectionWrapper>
  );
}
