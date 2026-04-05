"use client";

import { motion } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";

export default function FinalCTA() {
  return (
    <section className="relative py-36 px-6 bg-surface-deep overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/[0.04] blur-[150px] pointer-events-none" />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-border/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight mb-6"
        >
          Ready to Meet Your
          <br />
          <span className="text-gold">AI Chief of Staff?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-cream-dim/60 text-lg mb-12 font-[family-name:var(--font-inter)] font-light"
        >
          15 minutes. Zero risk. Real results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GoldButton href="#diagnostic" className="text-base px-10">
            Start Chat with Midas
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
