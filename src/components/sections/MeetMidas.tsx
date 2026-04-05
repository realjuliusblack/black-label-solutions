"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  Settings,
  Users,
  BarChart3,
  Mail,
  GitBranch,
  DollarSign,
  Heart,
  Shield,
} from "lucide-react";

const capabilities = [
  { icon: Settings, name: "Operations", desc: "Runs your workflows. Handles exceptions. Eliminates bottlenecks." },
  { icon: Users, name: "Team", desc: "Delegates tasks. Tracks progress. Keeps everyone aligned." },
  { icon: BarChart3, name: "Data", desc: "Real-time dashboards. Anomaly detection. Decisions in minutes." },
  { icon: Mail, name: "Communication", desc: "Email management. Meeting prep. Client correspondence." },
  { icon: GitBranch, name: "Pipeline", desc: "Sourcing. Qualification. Follow-ups. Nothing falls through." },
  { icon: DollarSign, name: "Finance", desc: "Invoicing. Forecasting. KPI tracking. Numbers always current." },
  { icon: Heart, name: "Customers", desc: "Onboarding. Retention. Support. Every customer feels handled." },
  { icon: Shield, name: "Compliance", desc: "Regulatory monitoring. Audit trails. Sleep at night." },
];

export default function MeetMidas() {
  return (
    <SectionWrapper id="solution">
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-gold mb-4">
        Meet Midas
      </h2>
      <p className="font-[family-name:var(--font-cormorant)] text-xl text-[#A0A0A0] mb-6">
        The AI behind Black Label Solutions
      </p>
      <p className="text-[#E0E0E0] text-base leading-relaxed max-w-3xl mb-14">
        Midas is not a chatbot. Not a dashboard. Not another tool to learn.
        Midas is your AI Chief of Staff. It runs your operations. Manages your
        pipeline. Monitors your data. Coordinates your team. Reports to you
        with insights, not just numbers. It doesn&apos;t wait for commands. It
        works. 24/7. Getting smarter every day.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="bg-surface-card border border-surface-border rounded-sm p-6 hover:border-gold-border transition-all duration-200 hover:scale-[1.02] group"
          >
            <cap.icon
              className="text-gold mb-4 group-hover:text-gold-light transition-colors"
              size={28}
              strokeWidth={1.5}
            />
            <h3 className="font-[family-name:var(--font-inter)] font-semibold text-white text-base mb-2">
              {cap.name}
            </h3>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              {cap.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
