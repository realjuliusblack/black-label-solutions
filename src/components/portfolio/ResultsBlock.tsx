"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { LPU_HEADLINE_METRICS } from "@/lib/portfolio/metrics";

/**
 * The results block. Four giant numbers on black. JetBrains Mono.
 * This is the beat that sells the case study.
 */
export default function ResultsBlock() {
  return (
    <div>
      <SectionLabel>Results</SectionLabel>
      <h3 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1rem+2.5vw,3rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-12">
        What shipped.
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {LPU_HEADLINE_METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
            className="relative p-7 rounded-2xl bg-[#161412]/70 border border-[#7A6528]/20 backdrop-blur-sm"
          >
            <div
              className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
              }}
            />
            <p className="font-[family-name:var(--font-inter)] text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#C9A84C]/70 mb-4">
              {m.label}
            </p>
            <p className="font-[family-name:var(--font-jetbrains)] text-[clamp(2.5rem,1.5rem+3vw,4rem)] font-medium text-[#C9A84C] leading-none mb-3">
              {m.value}
            </p>
            {m.detail ? (
              <p className="font-[family-name:var(--font-inter)] text-sm text-[#C8C0B0]/70 font-light">
                {m.detail}
              </p>
            ) : null}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
