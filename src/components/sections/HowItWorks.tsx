"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const steps = [
  {
    num: "01",
    title: "Free Diagnostic",
    desc: "Meet Midas. 15-30 minutes. We assess your business across 7 dimensions and deliver your Business Efficiency Score, a custom report, a tailored pitch deck, and a free automation.",
  },
  {
    num: "02",
    title: "Full Audit",
    desc: "Go deeper. Midas maps your workflows, audits your tech stack, documents your team structure, and builds your complete transformation plan.",
  },
  {
    num: "03",
    title: "Custom Deployment",
    desc: "Your AI Chief of Staff is built specifically for your business. Custom agents, custom workflows, custom intelligence. Black Label Certified before it goes live.",
  },
  {
    num: "04",
    title: "Ongoing Excellence",
    desc: "Your AI Chief of Staff learns, improves, and adapts. Continuous optimization. It gets better every week.",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-cream mb-20 text-center">
        Four Steps to <span className="text-gold">Excellence</span>
      </h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full border border-gold-border/50 mx-auto mb-6 flex items-center justify-center bg-surface-card/50">
              <span className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-gold">
                {step.num}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-inter)] font-semibold text-cream text-base mb-3">
              {step.title}
            </h3>
            <p className="text-cream-dim/70 text-sm leading-relaxed font-[family-name:var(--font-inter)] font-light">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
