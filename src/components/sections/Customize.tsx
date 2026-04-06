"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { User, MessageCircle, Brain, Layers, Phone, Lock } from "lucide-react";

const features = [
  {
    icon: User,
    title: "Custom Name & Identity",
    desc: "Your AI gets a name that fits your brand. Your team and clients interact with your AI, not ours. It becomes part of your company.",
  },
  {
    icon: MessageCircle,
    title: "Custom Voice & Personality",
    desc: "Formal or casual. Technical or friendly. We program the exact tone, vocabulary, and communication style that matches your culture.",
  },
  {
    icon: Brain,
    title: "Custom Knowledge",
    desc: "Your industry terminology, your processes, your client base, your data sources. Your Operator knows your business as well as you do.",
  },
  {
    icon: Layers,
    title: "Custom Workflows",
    desc: "We don't give you generic automations. Every workflow is built around how your business actually operates. Your processes, automated.",
  },
  {
    icon: Phone,
    title: "Every Channel",
    desc: "Slack, email, phone calls, text, video meetings. Your Operator works wherever your team works. It even joins your weekly huddle.",
  },
  {
    icon: Lock,
    title: "Your Data. Only Yours.",
    desc: "Complete data isolation. Your Operator never sees another company's data. Your credentials, your systems, your information. Locked tight.",
  },
];

export default function Customize() {
  return (
    <SectionWrapper id="customize" className="bg-surface-elevated">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] font-bold text-cream mb-5">
          Your Company. <span className="text-gold">Your Operator.</span>
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-cream-dim/70 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
          When you hire Midas, we don&apos;t give you a generic AI. We build a
          custom Operator: your own AI Chief of Staff with a unique name,
          personality, and skill set tailored to your business. Same
          intelligence underneath. Entirely yours on the surface.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="bg-surface-card/60 border border-surface-border/50 rounded-lg p-5 sm:p-7 hover:border-gold-border/40 active:border-gold-border/40 transition-all duration-300 group"
          >
            <f.icon
              className="text-gold/60 mb-5 group-hover:text-gold transition-colors"
              size={24}
              strokeWidth={1.5}
            />
            <h3 className="font-[family-name:var(--font-inter)] font-semibold text-cream text-base mb-2.5">
              {f.title}
            </h3>
            <p className="text-cream-dim/60 text-sm leading-relaxed font-[family-name:var(--font-inter)] font-light">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <p className="font-[family-name:var(--font-inter)] text-cream-dim/40 text-sm">
          Every Operator is powered by Midas. Every deployment is Black Label Certified.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
