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
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] font-bold text-cream mb-4">
            See What Midas Finds in <span className="text-gold">15 Minutes</span>
          </h2>
          <p className="text-cream-dim/60 text-base font-[family-name:var(--font-inter)] font-light">
            Call, chat, or text. Your choice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-10 sm:mb-16 max-w-4xl mx-auto">
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
              className={`border border-surface-border rounded-lg text-center flex sm:flex-col items-center sm:items-center gap-4 sm:gap-5 active:border-gold-border/40 hover:border-gold-border/40 transition-colors ${
                ch.primary
                  ? "bg-surface-card/80 border-gold-border/30 p-4 sm:p-8"
                  : "bg-surface-card/60 p-4 sm:p-8"
              }`}
            >
              <ch.icon className="text-gold/70 shrink-0" size={28} strokeWidth={1.5} />
              <div className="flex-1 sm:flex-none flex sm:flex-col items-center sm:items-center justify-between sm:justify-start gap-3 sm:gap-5 w-full sm:w-auto">
                <h3 className="font-[family-name:var(--font-inter)] font-semibold text-cream text-base sm:text-lg">
                  {ch.label}
                </h3>
                <GoldButton variant={ch.primary ? "primary" : "outline"} className="text-sm sm:text-[15px]">
                  {ch.cta}
                </GoldButton>
              </div>
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
