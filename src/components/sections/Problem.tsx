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
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-gold mb-12">
        Your Business Runs on You
      </h2>

      <div className="space-y-6 max-w-3xl">
        {painPoints.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-start gap-4"
          >
            <span className="mt-2 w-2 h-2 bg-gold rotate-45 shrink-0" />
            <p className="text-[#E0E0E0] text-base md:text-lg leading-relaxed">
              {point}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-14 font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-gold italic"
      >
        Sound familiar?
      </motion.p>
    </SectionWrapper>
  );
}
