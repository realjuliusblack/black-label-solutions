"use client";

import { motion } from "framer-motion";
import { LPU_TIMELINE } from "@/lib/portfolio/metrics";

/**
 * 12-week timeline. Vertical on mobile, horizontal on desktop.
 * Gold connector dots, staggered reveal.
 */
export default function TimelineBlock() {
  return (
    <div className="relative">
      {/* Desktop horizontal line */}
      <div
        aria-hidden
        className="hidden md:block absolute top-[22px] left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 10%, rgba(201,168,76,0.4) 90%, transparent)",
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
        {LPU_TIMELINE.map((phase, i) => (
          <motion.div
            key={phase.week}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative"
          >
            <div className="flex md:justify-center mb-4">
              <span
                className="relative w-[18px] h-[18px] rounded-full bg-[#C9A84C]"
                style={{ boxShadow: "0 0 16px rgba(201,168,76,0.5)" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-[-6px] rounded-full border border-[#C9A84C]/25"
                />
              </span>
            </div>
            <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] text-[#C9A84C]/75 uppercase mb-2 md:text-center">
              {phase.week}
            </p>
            <h4 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[#F5F0E8] mb-2 md:text-center">
              {phase.title}
            </h4>
            <p className="font-[family-name:var(--font-inter)] text-sm text-[#C8C0B0]/80 leading-relaxed font-light md:text-center">
              {phase.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
