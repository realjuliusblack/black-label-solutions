import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "./SectionLabel";
import { ENGAGEMENT_TIERS } from "@/lib/portfolio/metrics";

/**
 * Three engagement tiers by name. No prices. Tiers are named, not listed.
 */
export default function EngagementTiers() {
  return (
    <SectionWrapper id="engagements" className="bg-[#060503]/60">
      <SectionLabel>Engagement</SectionLabel>
      <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,1rem+3.5vw,3.75rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-6">
        Three ways in.
      </h2>
      <p className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#C8C0B0] leading-relaxed max-w-3xl font-light mb-12">
        Pricing is scoped per install. The diagnostic is always free. After the audit, we propose a scope and a fee. You sign or you do not. No hourly rates. No retainers. Outcomes, not invoices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ENGAGEMENT_TIERS.map((tier, i) => (
          <div
            key={tier.code}
            className={`relative group p-7 rounded-2xl bg-[#161412]/70 border transition-all duration-300 hover:-translate-y-1 ${
              i === 1 ? "border-[#C9A84C]/40" : "border-[#7A6528]/20 hover:border-[#C9A84C]/35"
            }`}
          >
            {i === 1 ? (
              <span className="absolute -top-2.5 left-7 px-2 py-0.5 bg-[#C9A84C] text-[#060503] text-[10px] tracking-[0.25em] uppercase font-semibold rounded">
                Most installs
              </span>
            ) : null}
            <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              {tier.code}
            </p>
            <h4 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-semibold text-[#F5F0E8] mb-4 leading-snug">
              {tier.title}
            </h4>
            <p className="font-[family-name:var(--font-inter)] text-sm text-[#C8C0B0]/80 leading-relaxed font-light">
              {tier.detail}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
