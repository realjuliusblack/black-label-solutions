"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const faqs = [
  {
    q: "What does it cost?",
    a: "Every deployment is custom-scoped from the diagnostic. Start with the free assessment and we\u2019ll show you exactly what\u2019s needed for your business.",
  },
  {
    q: "Is the diagnostic really free?",
    a: "Yes. You get your Business Efficiency Score, a custom report, a pitch deck, and a free automation. No strings. No credit card. No obligation.",
  },
  {
    q: "What industries do you work with?",
    a: "Any. Your AI Chief of Staff adapts to your industry, your terminology, your workflows. Healthcare, real estate, e-commerce, professional services, construction, restaurants. If you run a business, we can run it better.",
  },
  {
    q: "How long until my AI Chief of Staff is live?",
    a: "Depends on complexity. Simple deployments: weeks. Complex enterprise deployments: 1-3 months. The full audit determines the timeline.",
  },
  {
    q: "What if it doesn\u2019t work?",
    a: "It will. That\u2019s what Black Label Certification means. Battle-tested against real production conditions. 100% pass rate. But if something breaks, we fix it before you even notice.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "Zero. Your AI Chief of Staff reports to you in plain language. No dashboards to learn. No settings to configure. It just works.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq">
      <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] font-bold text-cream mb-10 sm:mb-16 text-center">
        Questions
      </h2>

      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border border-surface-border/50 rounded-lg overflow-hidden bg-surface-card/30"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-5 text-left cursor-pointer hover:bg-surface-card/50 active:bg-surface-card/50 transition-colors min-h-[48px]"
              >
                <span className="font-[family-name:var(--font-inter)] font-medium text-cream text-[15px] pr-4">
                  {faq.q}
                </span>
                {isOpen ? (
                  <Minus className="text-gold/60 shrink-0" size={16} />
                ) : (
                  <Plus className="text-gold/60 shrink-0" size={16} />
                )}
              </button>
              <div
                className="grid transition-all duration-300 ease-out overflow-hidden"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 sm:px-6 pb-5 text-cream-dim/70 text-sm leading-relaxed font-[family-name:var(--font-inter)] font-light">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
