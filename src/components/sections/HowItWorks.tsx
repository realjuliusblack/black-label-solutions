"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const steps = [
  {
    num: "01",
    title: "Free Diagnostic",
    desc: "Meet Midas. 15-30 minutes. We assess your business across 7 dimensions and deliver your Business Efficiency Score, a custom report, a tailored pitch deck, and a free automation. Zero cost.",
  },
  {
    num: "02",
    title: "Full Audit",
    desc: "Go deeper. Midas maps your workflows, audits your tech stack, documents your team structure, and builds a complete transformation plan. Still free. Still yours.",
  },
  {
    num: "03",
    title: "Custom Deployment",
    desc: "Your AI Chief of Staff is built specifically for your business. Not a template. Custom agents, custom workflows, custom intelligence. Black Label Certified: battle-tested before it goes live.",
  },
  {
    num: "04",
    title: "Ongoing Excellence",
    desc: "It doesn\u2019t stop at deployment. Your AI Chief of Staff learns, improves, and adapts. Continuous optimization. It gets better every week.",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-gold mb-16 text-center">
        Four Steps to Your AI Chief of Staff
      </h2>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gold-border/40" />

        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative pl-16 pb-14 last:pb-0"
          >
            <div className="absolute left-0 top-0 w-14 h-14 rounded-full border border-gold-border bg-surface-deep flex items-center justify-center">
              <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-gold">
                {step.num}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-inter)] font-semibold text-white text-lg mb-2">
              {step.title}
            </h3>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
