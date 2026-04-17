"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "./SectionLabel";
import { INSTALL_PHASES } from "@/lib/portfolio/metrics";

/**
 * The Black Label Install. 10 phases, shown as a grid of phase cards.
 * Matches the BRAND.md phase-card spec.
 */
export default function ApproachInstall() {
  return (
    <SectionWrapper id="approach">
      <SectionLabel>The Approach</SectionLabel>
      <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,1rem+3.5vw,3.75rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-6">
        The <span className="text-[#C9A84C]">Black Label Install</span>.
      </h2>
      <p className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#C8C0B0] leading-relaxed max-w-3xl font-light mb-12">
        The same ten phases on every install. Repeatable, documented, and battle tested. Every phase has a deliverable. Every deliverable goes through certification. If a phase fails, the install pauses. It never ships broken.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {INSTALL_PHASES.map((phase, i) => (
          <motion.div
            key={phase.code}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative p-5 rounded-xl transition-all duration-300 hover:bg-[#C9A84C]/[0.05]"
            style={{
              background: "rgba(201,168,76,0.03)",
              border: "1px solid rgba(201,168,76,0.12)",
            }}
          >
            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-[0.25em] uppercase text-[#C9A84C]/75 mb-3">
              Phase {phase.code}. {phase.name}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#F5F0E8]/85 leading-relaxed font-light">
              {phase.summary}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
