import { LPU_ENGINES } from "@/lib/portfolio/metrics";

/**
 * Engine roster. Five engines. Card grid with hover top-line reveal.
 */
export default function EngineList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {LPU_ENGINES.map((engine) => (
        <div
          key={engine.id}
          className="relative group p-6 rounded-2xl bg-[#161412]/70 border border-[#7A6528]/20 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/35"
        >
          <div
            aria-hidden
            className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/5 transition-all duration-500"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)",
            }}
          />
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.25em] uppercase text-[#C9A84C]/65 mb-3">
            {engine.id}
          </p>
          <h4 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[#F5F0E8] mb-2">
            {engine.name}
          </h4>
          <p className="font-[family-name:var(--font-inter)] text-sm text-[#C8C0B0]/80 leading-relaxed font-light">
            {engine.role}
          </p>
        </div>
      ))}
    </div>
  );
}
