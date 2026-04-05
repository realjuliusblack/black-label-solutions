"use client";

import { motion } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";

export default function FinalCTA() {
  return (
    <section className="relative py-32 px-6 bg-surface-deep overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl font-bold text-gold leading-tight mb-6"
        >
          Ready to Meet Your AI Chief of Staff?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[#E0E0E0] text-lg mb-10 font-[family-name:var(--font-jetbrains)]"
        >
          15 minutes. Zero risk. Real results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
