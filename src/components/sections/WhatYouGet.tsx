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
    <SectionWrapper id="what-you-get">
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-gold mb-4 text-center">
        Your AI Chief of Staff
      </h2>
      <p className="text-center text-[#A0A0A0] text-base mb-14 font-[family-name:var(--font-inter)]">
        Custom-built for your business. Not a template.
      </p>

      <div className="space-y-4 max-w-3xl mx-auto">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 border-b border-surface-border last:border-0"
          >
            <span className="text-[#A0A0A0] text-sm md:text-base text-right">
              {row.before}
            </span>
            <ArrowRight className="text-gold shrink-0" size={18} />
            <span className="text-gold text-sm md:text-base font-medium">
              {row.after}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
