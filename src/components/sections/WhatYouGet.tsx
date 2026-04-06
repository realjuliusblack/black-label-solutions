"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ArrowRight, ArrowDown } from "lucide-react";

const rows = [
  { before: "Decisions take days", after: "Decisions take minutes" },
  { before: "Data in 6 disconnected tools", after: "One unified intelligence layer" },
  { before: "20 hours/week on manual follow-ups", after: "Automated. Zero dropped leads." },
  { before: "You are the bottleneck", after: "Your AI handles it" },
  { before: "Growth means hiring", after: "Growth means scaling what works" },
];

export default function WhatYouGet() {
  return (
    <SectionWrapper id="what-you-get" className="bg-surface-elevated">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] font-bold text-cream mb-3">
          Your AI <span className="text-gold">Chief of Staff</span>
        </h2>
        <p className="text-cream-dim/60 text-base font-[family-name:var(--font-inter)] font-light">
          Custom-built for your business. Not a template.
        </p>
      </div>

      {/* Desktop: horizontal table layout */}
      <div className="hidden sm:block space-y-0 max-w-3xl mx-auto">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6 py-5 border-b border-surface-border/50 last:border-0"
          >
            <span className="text-cream-dim/40 text-sm md:text-base text-right font-[family-name:var(--font-inter)] font-light">
              {row.before}
            </span>
            <ArrowRight className="text-gold/50 shrink-0" size={16} />
            <span className="text-gold text-sm md:text-base font-[family-name:var(--font-inter)] font-medium">
              {row.after}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Mobile: stacked card layout */}
      <div className="sm:hidden space-y-4 max-w-md mx-auto">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="bg-surface-card/40 border border-surface-border/40 rounded-lg p-4"
          >
            <p className="text-cream-dim/50 text-sm font-[family-name:var(--font-inter)] font-light line-through decoration-cream-dim/20">
              {row.before}
            </p>
            <div className="flex items-center gap-2 my-2">
              <ArrowDown className="text-gold/40 shrink-0" size={14} />
              <div className="h-px flex-1 bg-gold-border/20" />
            </div>
            <p className="text-gold text-[15px] font-[family-name:var(--font-inter)] font-medium">
              {row.after}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
