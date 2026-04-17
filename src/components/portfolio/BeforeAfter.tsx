import { LPU_BEFORE_AFTER } from "@/lib/portfolio/metrics";

/**
 * Before/After table. Six rows. Muted gold for "before", full gold for "after".
 * Matches the BRAND.md compare-table spec.
 */
export default function BeforeAfter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,2px,1fr,1fr] gap-0 md:gap-4 bg-[#161412]/40 border border-[#7A6528]/20 rounded-2xl p-1">
      {/* Headers */}
      <div className="hidden md:block md:col-span-1 px-5 py-4">
        <p className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.3em] uppercase text-[#C8C0B0]/50">
          Dimension
        </p>
      </div>
      <div className="hidden md:block" aria-hidden />
      <div className="hidden md:block px-5 py-4">
        <p className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/40">
          Before
        </p>
      </div>
      <div className="hidden md:block px-5 py-4">
        <p className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]">
          After
        </p>
      </div>

      {LPU_BEFORE_AFTER.map((row, i) => (
        <div key={i} className="contents">
          <div className="px-5 py-5 border-t border-[#7A6528]/15">
            <p className="md:hidden font-[family-name:var(--font-inter)] text-[10px] tracking-[0.3em] uppercase text-[#C8C0B0]/50 mb-2">
              Dimension
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#F5F0E8] font-medium leading-snug">
              {row.dimension}
            </p>
          </div>

          <div
            aria-hidden
            className="hidden md:block border-t border-[#7A6528]/15"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)",
              width: 2,
            }}
          />

          <div className="px-5 py-5 border-t border-[#7A6528]/15">
            <p className="md:hidden font-[family-name:var(--font-inter)] text-[10px] tracking-[0.3em] uppercase text-[#C9A84C]/40 mb-2">
              Before
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#C9A84C]/45 font-light leading-snug">
              {row.before}
            </p>
          </div>
          <div className="px-5 py-5 border-t border-[#7A6528]/15">
            <p className="md:hidden font-[family-name:var(--font-inter)] text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">
              After
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#F5F0E8] font-light leading-snug">
              {row.after}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
