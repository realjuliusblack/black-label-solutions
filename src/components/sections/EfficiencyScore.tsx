"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const domains = [
  "Business Model",
  "Operations",
  "Team Structure",
  "Technology",
  "Customer Journey",
  "Data & Decisions",
  "Growth Readiness",
];

const sampleScores = [45, 60, 35, 40, 55, 30, 50];

function RadarChart() {
  const cx = 150;
  const cy = 150;
  const r = 100;
  const n = 7;
  const angleStep = (2 * Math.PI) / n;
  const offset = -Math.PI / 2;

  const axisPoints = domains.map((_, i) => {
    const angle = offset + i * angleStep;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      lx: cx + (r + 32) * Math.cos(angle),
      ly: cy + (r + 32) * Math.sin(angle),
    };
  });

  const dataPoints = sampleScores.map((score, i) => {
    const angle = offset + i * angleStep;
    const dr = (score / 100) * r;
    return `${cx + dr * Math.cos(angle)},${cy + dr * Math.sin(angle)}`;
  });

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[300px] sm:max-w-[280px]">
      {rings.map((scale) => (
        <polygon
          key={scale}
          points={axisPoints
            .map((_, i) => {
              const angle = offset + i * angleStep;
              return `${cx + r * scale * Math.cos(angle)},${cy + r * scale * Math.sin(angle)}`;
            })
            .join(" ")}
          fill="none"
          stroke="#2A2620"
          strokeWidth="0.5"
        />
      ))}

      {axisPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#2A2620" strokeWidth="0.5" />
      ))}

      <polygon
        points={dataPoints.join(" ")}
        fill="rgba(201, 168, 76, 0.1)"
        stroke="#C9A84C"
        strokeWidth="1.5"
      />

      {dataPoints.map((point, i) => {
        const [px, py] = point.split(",").map(Number);
        return <circle key={i} cx={px} cy={py} r="3" fill="#C9A84C" />;
      })}

      {axisPoints.map((p, i) => (
        <text
          key={i}
          x={p.lx}
          y={p.ly}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#C8C0B0"
          fontSize="8.5"
          fontFamily="var(--font-inter), sans-serif"
        >
          {domains[i]}
        </text>
      ))}
    </svg>
  );
}

export default function EfficiencyScore() {
  return (
    <SectionWrapper id="score" className="bg-surface-elevated">
      <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] font-bold text-cream mb-10 sm:mb-16 text-center">
        Your Score. <span className="text-gold">Your Roadmap.</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Radar chart first on mobile for visual impact */}
        <div className="flex flex-col items-center order-1 md:order-2">
          <RadarChart />
          <div className="mt-8 sm:mt-10 text-center">
            <span className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl font-bold text-gold">
              580
            </span>
            <span className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl text-cream-dim/50 ml-2">
              / 1000
            </span>
            <p className="text-gold/60 font-[family-name:var(--font-inter)] font-medium text-sm mt-2 tracking-wide uppercase">
              Average
            </p>
          </div>
        </div>

        <div className="order-2 md:order-1">
          <p className="text-cream-dim text-base mb-6 sm:mb-8 leading-relaxed font-[family-name:var(--font-inter)] font-light">
            We assess every business across 7 dimensions:
          </p>
          <ul className="space-y-3 sm:space-y-4">
            {domains.map((d, i) => (
              <li key={d} className="flex items-center gap-4">
                <span className="font-[family-name:var(--font-cormorant)] text-gold/70 font-bold text-lg w-6 text-right">
                  {i + 1}
                </span>
                <span className="text-cream-dim text-[15px] font-[family-name:var(--font-inter)]">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-cream-dim/50 text-sm mt-12 sm:mt-16 font-[family-name:var(--font-inter)]">
        Most businesses score between 400-600. Where do you think you land?
      </p>
    </SectionWrapper>
  );
}
