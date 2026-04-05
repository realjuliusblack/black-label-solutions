"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const painPoints = [
  "You are the bottleneck. Every decision runs through you.",
  "Your team is stretched thin. Key people can\u2019t take a day off.",
  "Data lives in 6 different tools. None of them talk to each other.",
  "Leads fall through the cracks because follow-up is manual.",
  "You make decisions on gut feel because the numbers take too long to pull.",
  "Growth means hiring more people to do the same manual work.",
];

export default function Problem() {
  return (
    <SectionWrapper id="problem">
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-cream mb-6">
        I Already Know Your <span className="text-gold">Problem</span>
      </h2>
      <p className="font-[family-name:var(--font-inter)] text-cream-dim/60 text-base font-light mb-14 max-w-2xl">
        I&apos;ve diagnosed hundreds of businesses. The patterns are always the same.
      </p>

      <div className="space-y-7 max-w-3xl">
        {painPoints.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-start gap-5 group"
          >
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:shadow-[0_0_8px_rgba(201,168,76,0.5)] transition-shadow" />
            <p className="text-cream-dim text-base md:text-lg leading-relaxed font-[family-name:var(--font-inter)] font-light">
              {point}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-gold italic"
      >
        Give me 15 minutes. I&apos;ll show you exactly where you&apos;re bleeding.
      </motion.p>
    </SectionWrapper>
  );
}
