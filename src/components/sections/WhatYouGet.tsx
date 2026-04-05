"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ArrowRight } from "lucide-react";

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
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-cream mb-3">
          Your AI <span className="text-gold">Chief of Staff</span>
        </h2>
        <p className="text-cream-dim/60 text-base font-[family-name:var(--font-inter)] font-light">
          Custom-built for your business. Not a template.
        </p>
      </div>

      <div className="space-y-0 max-w-3xl mx-auto">
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
    </SectionWrapper>
  );
}
