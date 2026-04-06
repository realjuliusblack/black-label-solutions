"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  Sun,
  Coffee,
  TrendingUp,
  AlertTriangle,
  Clock,
  Sunset,
  Moon,
} from "lucide-react";

const timeline = [
  {
    time: "6:00 AM",
    icon: Sun,
    title: "Before you wake up",
    desc: "Midas has already checked overnight emails, flagged anything urgent, processed new leads, updated your pipeline, and prepared your morning briefing. By the time you open your eyes, he's been working for hours.",
  },
  {
    time: "8:00 AM",
    icon: Coffee,
    title: "Your morning briefing",
    desc: "You get a message from Midas. Not a dashboard you have to dig through. A clear summary: here's what happened overnight, here's what needs your attention today, here's what I already handled. Two minutes and you're caught up.",
  },
  {
    time: "10:00 AM",
    icon: TrendingUp,
    title: "While you focus on growth",
    desc: "You're in a strategy meeting. Meanwhile, Midas is qualifying 12 new leads, sending follow-up emails to 8 prospects, onboarding a new client, and updating your team's task assignments. None of this requires your attention.",
  },
  {
    time: "1:00 PM",
    icon: AlertTriangle,
    title: "Something breaks",
    desc: "A vendor API goes down. A client sends an angry email. A team member calls in sick. Midas catches all three. He reroutes the workflow, drafts a response to the client for your approval, and reassigns the sick employee's tasks. You find out after it's fixed.",
  },
  {
    time: "3:00 PM",
    icon: Clock,
    title: "The work you used to do",
    desc: "Invoices sent. Reports generated. Compliance docs updated. Team standup notes distributed. KPIs tracked. All the operational work that used to eat your afternoon? Midas handled it between his other tasks.",
  },
  {
    time: "6:00 PM",
    icon: Sunset,
    title: "You go home",
    desc: "Midas sends your end-of-day summary. Everything that got done, anything that needs tomorrow's attention, and how your numbers moved. You close your laptop knowing nothing was missed.",
  },
  {
    time: "11:00 PM",
    icon: Moon,
    title: "While you sleep",
    desc: "Midas doesn't. He's monitoring your systems, processing overnight inquiries, preparing tomorrow's briefing, and getting smarter about your business. Tomorrow he'll be better than today. Every single day.",
  },
];

export default function DayInLife() {
  return (
    <SectionWrapper id="day-in-life" className="bg-surface-elevated">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] font-bold text-cream mb-5">
          A Day With <span className="text-gold">Midas</span>
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-cream-dim/60 text-base font-light max-w-xl mx-auto">
          This is what it actually looks like when your AI Chief of Staff
          is running your operations.
        </p>
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-gold/30 via-gold-border/20 to-transparent" />

        <div className="space-y-2">
          {timeline.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative pl-14 sm:pl-16 md:pl-20 py-4 sm:py-5 group"
            >
              {/* Icon circle */}
              <div className="absolute left-0 top-5 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-surface-border bg-surface-card/80 flex items-center justify-center group-hover:border-gold-border/50 group-active:border-gold-border/50 transition-colors">
                <item.icon
                  className="text-gold/50 group-hover:text-gold/80 transition-colors"
                  size={18}
                  strokeWidth={1.5}
                />
              </div>

              {/* Time */}
              <span className="font-[family-name:var(--font-jetbrains)] text-gold/40 text-xs tracking-wider">
                {item.time}
              </span>

              {/* Content */}
              <h3 className="font-[family-name:var(--font-inter)] font-semibold text-cream text-base mt-1.5 mb-2">
                {item.title}
              </h3>
              <p className="text-cream-dim/60 text-[13px] sm:text-sm leading-relaxed font-[family-name:var(--font-inter)] font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
