"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ShieldCheck } from "lucide-react";

const points = [
  "100% test pass rate. Not 99%. 100%.",
  "Real data. Real systems. No sandboxes.",
  "Security, performance, reliability. All verified.",
  "Works day one. No handholding. No surprises.",
];

function CertBadge() {
  return (
    <div className="relative w-44 h-44 mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-[#C9A84C]/[0.06] blur-xl" />
      <svg viewBox="0 0 200 200" className="relative w-full h-full">
        <circle cx="100" cy="100" r="88" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="#7A6528" strokeWidth="0.5" />
        <text x="100" y="75" textAnchor="middle" fill="#C9A84C" fontSize="10" fontFamily="var(--font-inter), sans-serif" fontWeight="600" letterSpacing="3" opacity="0.8">
          BLACK LABEL
        </text>
        <text x="100" y="110" textAnchor="middle" fill="#C9A84C" fontSize="28" fontFamily="var(--font-cormorant), serif" fontWeight="700">
          &#10003;
        </text>
        <text x="100" y="138" textAnchor="middle" fill="#C9A84C" fontSize="9" fontFamily="var(--font-inter), sans-serif" fontWeight="600" letterSpacing="4" opacity="0.8">
          CERTIFIED
        </text>
      </svg>
    </div>
  );
}

export default function Certification() {
  return (
    <SectionWrapper id="certified">
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-cream mb-16 text-center">
        Battle-Tested. <span className="text-gold">Guaranteed.</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-7">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <ShieldCheck className="text-gold/60 shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
              <p className="text-cream-dim text-base font-[family-name:var(--font-inter)] font-light leading-relaxed">
                {p}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <CertBadge />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
