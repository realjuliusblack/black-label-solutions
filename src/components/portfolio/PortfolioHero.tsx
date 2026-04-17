"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";

interface PortfolioHeroProps {
  subject?: string;
  prospectName?: string;
}

/**
 * Hero for the portfolio. Single sentence, single proof, single CTA.
 * Matches the main site Hero pattern. Supports per-prospect subject line.
 */
export default function PortfolioHero({ subject, prospectName }: PortfolioHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl">
        {prospectName ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-[family-name:var(--font-inter)] text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#C9A84C]/60 mb-3"
          >
            Prepared for {prospectName}
          </motion.p>
        ) : null}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[family-name:var(--font-inter)] text-xs sm:text-sm tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-5 sm:mb-8"
        >
          Black Label Solutions
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(2.75rem,1.5rem+5vw,6rem)] font-bold text-[#F5F0E8] leading-[1.05] mb-5 sm:mb-8"
        >
          A permanent <span className="text-[#C9A84C]">AI executive</span>,<br />
          installed.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-[family-name:var(--font-inter)] text-base sm:text-lg md:text-xl text-[#C8C0B0] leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-10 font-light"
        >
          {subject ||
            "Custom built for your company. Deployed in 90 days. Reports to you. One case study. One standard. Excellence in Execution."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GoldButton href="#lpu" className="text-base px-10 py-4 min-h-[48px] w-full sm:w-auto">
            See the flagship
          </GoldButton>
          <GoldButton href="#brief" variant="outline" className="text-base px-10 py-4 min-h-[48px] w-full sm:w-auto">
            Request a brief
          </GoldButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-10 flex items-center justify-center gap-6 sm:gap-10 text-[#C8C0B0]/50 font-[family-name:var(--font-jetbrains)] text-xs sm:text-sm tracking-wider"
        >
          <span>
            <span className="text-[#C9A84C]/80">52/52</span> Certified
          </span>
          <span className="h-3 w-px bg-[#7A6528]/40" />
          <span>
            <span className="text-[#C9A84C]/80">0</span> Routine human hours
          </span>
          <span className="h-3 w-px bg-[#7A6528]/40 hidden sm:block" />
          <span className="hidden sm:inline">
            <span className="text-[#C9A84C]/80">5</span> Engines live
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#problem" aria-label="Scroll to problem">
          <ChevronDown className="text-[#7A6528] animate-bounce" size={24} />
        </a>
      </motion.div>
    </section>
  );
}
