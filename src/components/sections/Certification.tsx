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
    <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto">
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#8B6914"
        strokeWidth="0.5"
      />
      <text
        x="100"
        y="78"
        textAnchor="middle"
        fill="#D4AF37"
        fontSize="11"
        fontFamily="var(--font-inter), sans-serif"
        fontWeight="600"
        letterSpacing="2"
      >
        BLACK LABEL
      </text>
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fill="#D4AF37"
        fontSize="24"
        fontFamily="var(--font-cormorant), serif"
        fontWeight="700"
      >
        &#10003;
      </text>
      <text
        x="100"
        y="135"
        textAnchor="middle"
        fill="#D4AF37"
        fontSize="9"
        fontFamily="var(--font-inter), sans-serif"
        fontWeight="600"
        letterSpacing="3"
      >
        CERTIFIED
      </text>
    </svg>
  );
}

export default function Certification() {
  return (
    <SectionWrapper id="certified" className="bg-surface-deep">
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-gold mb-14 text-center">
        Battle-Tested. Guaranteed.
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <ShieldCheck
                className="text-gold shrink-0 mt-0.5"
                size={22}
                strokeWidth={1.5}
              />
              <p className="text-[#E0E0E0] text-base">{p}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <CertBadge />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
