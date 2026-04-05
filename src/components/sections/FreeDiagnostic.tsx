"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GoldButton from "@/components/ui/GoldButton";
import { MessageSquare, Phone, Smartphone, Video, CheckCircle } from "lucide-react";

const deliverables = [
  "Business Efficiency Score",
  "Custom Report",
  "Pitch Deck",
  "Free Automation",
];

export default function FreeDiagnostic() {
  return (
    <SectionWrapper id="diagnostic" className="relative bg-surface-deep">
      {/* Warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C9A84C]/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-cream mb-4">
            See What Midas Finds in <span className="text-gold">15 Minutes</span>
          </h2>
          <p className="text-cream-dim/60 text-base font-[family-name:var(--font-inter)] font-light">
            Call, chat, or text. Your choice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-16 max-w-4xl mx-auto">
          {[
            { icon: MessageSquare, label: "Chat", cta: "Start Now", primary: true },
            { icon: Phone, label: "Phone", cta: "Call Midas", primary: false },
            { icon: Video, label: "Video Call", cta: "Book a Call", primary: false },
            { icon: Smartphone, label: "Text", cta: "Text Midas", primary: false },
          ].map((ch, i) => (
            <motion.div
              key={ch.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface-card/60 border border-surface-border rounded-lg p-8 text-center flex flex-col items-center gap-5 hover:border-gold-border/40 transition-colors"
            >
              <ch.icon className="text-gold/70" size={32} strokeWidth={1.5} />
              <h3 className="font-[family-name:var(--font-inter)] font-semibold text-cream text-lg">
                {ch.label}
              </h3>
              <GoldButton variant={ch.primary ? "primary" : "outline"}>
                {ch.cta}
              </GoldButton>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {deliverables.map((d, i) => (
            <motion.div
              key={d}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-2.5"
            >
              <CheckCircle className="text-gold/60 shrink-0" size={16} />
              <span className="text-cream-dim/70 text-sm font-[family-name:var(--font-inter)]">
                {d}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
