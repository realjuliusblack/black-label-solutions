"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Mic, Paintbrush, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Mic,
    title: "Midas Diagnoses Your Business",
    desc: "You talk to Midas. Phone, chat, or text. In 15 minutes, he assesses your business across 7 dimensions, identifies your biggest pain points, and delivers a Business Efficiency Score, a custom report, and a free automation he builds for you on the spot. All AI-generated. All free.",
  },
  {
    num: "02",
    icon: Paintbrush,
    title: "We Customize Your Operator",
    desc: "When you hire Midas, we don't just hand you a login. We build your own version of him. Custom name, custom personality, custom voice. He learns your industry, your terminology, your team, your workflows. Your clients and team will never know they're talking to AI unless you tell them.",
  },
  {
    num: "03",
    icon: Cpu,
    title: "Your AI Chief of Staff Goes Live",
    desc: "Every deployment is Black Label Certified. We battle-test your Operator against real production conditions before he goes live. 100% pass rate or he doesn't ship. When he's deployed, he works from day one. No ramp-up period. No hand-holding.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "He Gets Smarter Every Week",
    desc: "Your Operator learns your business deeper every day. Patterns become automations. Problems get solved before you notice them. Every skill Midas learns across all deployments makes your Operator better. You're not buying static software. You're hiring intelligence that compounds.",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] font-bold text-cream mb-5">
          How <span className="text-gold">Midas</span> Becomes Yours
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-cream-dim/60 text-base font-light max-w-2xl mx-auto">
          You meet Midas. He proves himself. You hire him into your company
          with a custom name, personality, and set of skills built around
          your business.
        </p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative bg-surface-card/40 border border-surface-border/50 rounded-lg p-6 sm:p-8 md:p-10 hover:border-gold-border/30 transition-colors duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold-border/40 flex items-center justify-center bg-surface-deep/50">
                <step.icon className="text-gold/70" size={20} strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <span className="font-[family-name:var(--font-cormorant)] text-gold/50 text-lg font-bold">
                    {step.num}
                  </span>
                  <h3 className="font-[family-name:var(--font-inter)] font-semibold text-cream text-base sm:text-lg">
                    {step.title}
                  </h3>
                </div>
                <p className="text-cream-dim/70 text-sm sm:text-[15px] leading-relaxed font-[family-name:var(--font-inter)] font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
