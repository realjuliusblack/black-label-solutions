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
    <SectionWrapper id="solution" className="bg-surface-elevated">
      <div className="text-center mb-16">
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-cream mb-4">
          Meet <span className="text-gold">Midas</span>
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-cream-dim text-lg font-light max-w-2xl mx-auto leading-relaxed">
          Not a chatbot. Not a dashboard. Not another tool to learn.
          A permanent AI executive that runs your business. 24/7.
          Getting smarter every day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="bg-surface-card/80 border border-surface-border rounded-lg p-6 hover:border-gold-border/60 transition-all duration-300 group"
          >
            <cap.icon
              className="text-gold/80 mb-4 group-hover:text-gold transition-colors"
              size={26}
              strokeWidth={1.5}
            />
            <h3 className="font-[family-name:var(--font-inter)] font-semibold text-cream text-[15px] mb-2">
              {cap.name}
            </h3>
            <p className="text-cream-dim/70 text-sm leading-relaxed font-[family-name:var(--font-inter)] font-light">
              {cap.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
