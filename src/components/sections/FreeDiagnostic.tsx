"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GoldButton from "@/components/ui/GoldButton";
import { MessageSquare, Phone, Smartphone, CheckCircle } from "lucide-react";

const deliverables = [
  "Business Efficiency Score",
  "Custom Report",
  "Pitch Deck",
  "Free Automation",
];

export default function FreeDiagnostic() {
  return (
    <SectionWrapper id="diagnostic" className="bg-surface-elevated">
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-gold mb-4 text-center">
        See What Midas Finds in 15 Minutes
      </h2>
      <p className="text-center text-[#A0A0A0] text-base mb-14 font-[family-name:var(--font-inter)]">
        Call, chat, or text. Your choice.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {[
          { icon: MessageSquare, label: "Chat", cta: "Start Now", primary: true },
          { icon: Phone, label: "Phone", cta: "Call Midas", primary: false },
          { icon: Smartphone, label: "Text", cta: "Text Midas", primary: false },
        ].map((ch, i) => (
          <motion.div
            key={ch.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-surface-card border border-surface-border rounded-sm p-8 text-center flex flex-col items-center gap-5"
          >
            <ch.icon className="text-gold" size={36} strokeWidth={1.5} />
            <h3 className="font-[family-name:var(--font-inter)] font-semibold text-white text-lg">
              {ch.label}
            </h3>
            <GoldButton variant={ch.primary ? "primary" : "outline"}>
              {ch.cta}
            </GoldButton>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {deliverables.map((d, i) => (
          <motion.div
            key={d}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-3 justify-center"
          >
            <CheckCircle className="text-gold shrink-0" size={18} />
            <span className="text-[#E0E0E0] text-sm font-[family-name:var(--font-inter)]">
              {d}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
