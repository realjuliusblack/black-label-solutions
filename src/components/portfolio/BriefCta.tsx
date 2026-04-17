"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionLabel from "./SectionLabel";
import GoldButton from "@/components/ui/GoldButton";

/**
 * Final CTA block. Single form, captures company + pain + budget tier.
 * v1 is client-only: POSTs to /api/brief when that endpoint lands.
 * Until then, mailto fallback so no prospect is lost.
 */
export default function BriefCta() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Company: ${data.get("company")}`,
      `Contact: ${data.get("name")} (${data.get("email")})`,
      `Pain: ${data.get("pain")}`,
      `Tier: ${data.get("tier")}`,
    ].join("\n");
    const href = `mailto:brief@blacklabel.solutions?subject=${encodeURIComponent(
      "Navigator Brief Request"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSubmitted(true);
  }

  return (
    <SectionWrapper id="brief">
      <SectionLabel>Next Step</SectionLabel>
      <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,1rem+3.5vw,3.75rem)] font-bold text-[#F5F0E8] leading-[1.1] mb-6">
        Request a <span className="text-[#C9A84C]">Navigator brief</span>.
      </h2>
      <p className="font-[family-name:var(--font-inter)] text-base sm:text-lg text-[#C8C0B0] leading-relaxed max-w-2xl font-light mb-10">
        Tell us the workflow that bleeds the most hours. We will come back within two business days with a diagnostic call date and a one page scoping doc. No pitch deck. No long sales cycle.
      </p>

      {submitted ? (
        <div className="max-w-xl p-8 rounded-2xl bg-[#161412]/70 border border-[#C9A84C]/30">
          <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#F5F0E8] mb-3">
            Draft open in your mail client.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-sm text-[#C8C0B0]/80 font-light">
            Send it when ready. We reply within two business days.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              name="name"
              placeholder="Your name"
              className="px-4 py-3 rounded-md bg-[#161412] border border-[#7A6528]/30 text-[#F5F0E8] placeholder-[#C8C0B0]/40 focus:outline-none focus:border-[#C9A84C]/60 focus:ring-1 focus:ring-[#C9A84C]/20 font-[family-name:var(--font-inter)] text-sm"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Work email"
              className="px-4 py-3 rounded-md bg-[#161412] border border-[#7A6528]/30 text-[#F5F0E8] placeholder-[#C8C0B0]/40 focus:outline-none focus:border-[#C9A84C]/60 focus:ring-1 focus:ring-[#C9A84C]/20 font-[family-name:var(--font-inter)] text-sm"
            />
          </div>
          <input
            required
            name="company"
            placeholder="Company"
            className="w-full px-4 py-3 rounded-md bg-[#161412] border border-[#7A6528]/30 text-[#F5F0E8] placeholder-[#C8C0B0]/40 focus:outline-none focus:border-[#C9A84C]/60 focus:ring-1 focus:ring-[#C9A84C]/20 font-[family-name:var(--font-inter)] text-sm"
          />
          <textarea
            required
            name="pain"
            rows={3}
            placeholder="The workflow that bleeds the most hours"
            className="w-full px-4 py-3 rounded-md bg-[#161412] border border-[#7A6528]/30 text-[#F5F0E8] placeholder-[#C8C0B0]/40 focus:outline-none focus:border-[#C9A84C]/60 focus:ring-1 focus:ring-[#C9A84C]/20 font-[family-name:var(--font-inter)] text-sm resize-none"
          />
          <select
            required
            name="tier"
            defaultValue=""
            className="w-full px-4 py-3 rounded-md bg-[#161412] border border-[#7A6528]/30 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]/60 focus:ring-1 focus:ring-[#C9A84C]/20 font-[family-name:var(--font-inter)] text-sm"
          >
            <option value="" disabled>
              Engagement interest
            </option>
            <option value="pilot">Pilot. One workflow, 30 days.</option>
            <option value="install">Permanent Install. Full operator, 90 days.</option>
            <option value="portfolio">Portfolio. Multiple operators.</option>
            <option value="exploring">Just exploring</option>
          </select>

          <div className="pt-2">
            <GoldButton className="text-base px-10 py-4 min-h-[48px] w-full sm:w-auto">
              Request the brief
            </GoldButton>
          </div>
        </form>
      )}

      <p className="font-[family-name:var(--font-inter)] text-xs text-[#C8C0B0]/40 mt-10 tracking-[0.2em] uppercase">
        Excellence in Execution.
      </p>
    </SectionWrapper>
  );
}
