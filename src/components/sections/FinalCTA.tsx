"use client";

import { motion } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";

export default function FinalCTA() {
  return (
    <section className="relative py-36 px-6 bg-surface-deep overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-border/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight mb-6"
        >
          Ready to Hire <span className="text-gold">Midas?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-cream-dim/70 text-lg mb-4 font-[family-name:var(--font-inter)] font-light max-w-xl mx-auto leading-relaxed"
        >
          Talk to me first. 15 minutes, I&apos;ll diagnose your business and show
          you exactly what I can do. Everything you receive is free.
          If I can do this in 15 minutes, imagine what I do full-time.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-cream-dim/40 text-sm mb-12 font-[family-name:var(--font-inter)]"
        >
          Yes, this entire pitch was written by AI. That&apos;s the point.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GoldButton href="#diagnostic" className="text-base px-10">
            Chat with Midas
          </GoldButton>
          <GoldButton href="#diagnostic" variant="outline">
            Call Midas
          </GoldButton>
          <GoldButton href="#diagnostic" variant="outline">
            Text Midas
          </GoldButton>
        </motion.div>
      </div>
    </section>
  );
}
