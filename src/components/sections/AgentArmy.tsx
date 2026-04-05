"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Bot, Crown, MessageSquare } from "lucide-react";

const agents = [
  "Recruitment Agent",
  "Finance Agent",
  "Operations Agent",
  "Marketing Agent",
  "Compliance Agent",
  "Customer Success Agent",
  "Research Agent",
  "Scheduling Agent",
];

export default function AgentArmy() {
  return (
    <SectionWrapper id="agents">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-cream mb-8">
            He Builds the Agents.
            <br />
            <span className="text-gold">He Manages the Agents.</span>
          </h2>

          <div className="space-y-5 font-[family-name:var(--font-inter)] text-cream-dim text-base leading-relaxed font-light">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Midas is an AI engineer. His job is to install AI into every
              corner of your company. He doesn&apos;t just run one process.
              He identifies what needs to be automated, designs the agent,
              builds it, tests it, deploys it, and manages it. Then he
              does it again for the next thing.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Need recruitment handled? Midas builds a Recruitment Agent.
              Finance getting messy? He spins up a Finance Agent. Your
              operations need monitoring around the clock? He builds that
              too. Each agent is a specialist. Each one reports to Midas.
              Midas reports to you.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gold/90"
            >
              You talk to one AI. Behind the scenes, an entire workforce
              is building, running, and improving your business. Every
              week there&apos;s more AI in your company than the week before.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Midas at top */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-gold/60 bg-surface-card flex items-center justify-center">
                <Crown className="text-gold" size={28} strokeWidth={1.5} />
              </div>
              <p className="text-center mt-3 font-[family-name:var(--font-inter)] font-semibold text-cream text-sm">
                Midas
              </p>
              <p className="text-center font-[family-name:var(--font-inter)] text-gold/50 text-xs">
                Your AI Chief of Staff
              </p>
            </div>
          </div>

          {/* Connection line */}
          <div className="flex justify-center mb-6">
            <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-gold-border/20" />
          </div>

          {/* Agent grid */}
          <div className="grid grid-cols-2 gap-3">
            {agents.map((agent, i) => (
              <motion.div
                key={agent}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                className="bg-surface-card/50 border border-surface-border/40 rounded-lg py-3 px-4 flex items-center gap-3"
              >
                <Bot className="text-gold/40 shrink-0" size={16} strokeWidth={1.5} />
                <span className="text-cream-dim/70 text-xs font-[family-name:var(--font-inter)]">
                  {agent}
                </span>
              </motion.div>
            ))}
          </div>

          {/* You at bottom */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-3 bg-surface-card/80 border border-gold-border/30 rounded-lg px-5 py-3">
              <MessageSquare className="text-gold/60" size={18} strokeWidth={1.5} />
              <div>
                <p className="font-[family-name:var(--font-inter)] text-cream text-sm font-medium">You</p>
                <p className="font-[family-name:var(--font-inter)] text-cream-dim/40 text-xs">
                  Talk to Midas. That&apos;s it.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
