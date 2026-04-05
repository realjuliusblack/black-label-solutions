"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060503]">
      {/* Warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C9A84C]/[0.04] blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/[0.03] blur-[120px] pointer-events-none" />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[family-name:var(--font-inter)] text-sm tracking-[0.25em] uppercase text-[#C9A84C]/70 mb-8"
        >
          Black Label Solutions
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[#F5F0E8] leading-[1.05] mb-8"
        >
          Meet <span className="text-gold">Midas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-[family-name:var(--font-inter)] text-lg md:text-xl text-[#C8C0B0] leading-relaxed max-w-2xl mx-auto mb-12 font-light"
        >
          Your AI Chief of Staff. Built by AI, powered by AI, proudly AI.
          Midas runs your operations, manages your team, and scales your
          business. Then we customize him for your company, your brand,
          your way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <GoldButton href="#diagnostic" className="text-base px-12 py-4">
            Talk to Midas Free
          </GoldButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-6 text-sm text-[#C8C0B0]/60 font-[family-name:var(--font-inter)]"
        >
          15 minutes with Midas. He&apos;ll diagnose your business for free.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#meet-midas">
          <ChevronDown className="text-[#7A6528] animate-bounce" size={24} />
        </a>
      </motion.div>
    </section>
  );
}
