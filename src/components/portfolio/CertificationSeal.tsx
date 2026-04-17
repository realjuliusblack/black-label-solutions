import { ShieldCheck } from "lucide-react";

interface CertificationSealProps {
  size?: number;
  label?: string;
}

/**
 * Triple-ring glow certification seal.
 * Matches the BRAND.md spec lines 370-387.
 * Used in place of named testimonial in v1 (until Ali quote lands).
 */
export default function CertificationSeal({ size = 180, label = "Black Label Certified" }: CertificationSealProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Outer ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -22,
            border: "1px solid rgba(201,168,76,0.08)",
          }}
        />
        {/* Middle ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -10,
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        />
        {/* Primary ring with glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid rgba(201,168,76,0.4)",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 50%, transparent 70%)",
            boxShadow:
              "0 0 60px rgba(201,168,76,0.15), 0 0 120px rgba(201,168,76,0.06), inset 0 0 40px rgba(201,168,76,0.06)",
          }}
        />
        <ShieldCheck
          className="relative text-[#C9A84C]"
          size={size * 0.29}
          strokeWidth={1.2}
          style={{
            filter:
              "drop-shadow(0 0 16px rgba(201,168,76,0.5)) drop-shadow(0 0 40px rgba(201,168,76,0.2))",
          }}
        />
      </div>
      <div className="text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-lg sm:text-xl text-[#F5F0E8] font-semibold">
          {label}
        </p>
        <p className="font-[family-name:var(--font-jetbrains)] text-xs text-[#C9A84C]/70 tracking-[0.2em] uppercase mt-1">
          52 / 52 tests passed
        </p>
      </div>
    </div>
  );
}
