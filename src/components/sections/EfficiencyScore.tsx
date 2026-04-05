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
  const r = 120;
  const n = 7;

  const angleStep = (2 * Math.PI) / n;
  const offset = -Math.PI / 2;

  const axisPoints = domains.map((_, i) => {
    const angle = offset + i * angleStep;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      lx: cx + (r + 30) * Math.cos(angle),
      ly: cy + (r + 30) * Math.sin(angle),
    };
  });

  const dataPoints = sampleScores.map((score, i) => {
    const angle = offset + i * angleStep;
    const dr = (score / 100) * r;
    return `${cx + dr * Math.cos(angle)},${cy + dr * Math.sin(angle)}`;
  });

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[300px]">
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
          stroke="#2A2A2A"
          strokeWidth="0.5"
        />
      ))}

      {axisPoints.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="#2A2A2A"
          strokeWidth="0.5"
        />
      ))}

      <polygon
        points={dataPoints.join(" ")}
        fill="rgba(212, 175, 55, 0.15)"
        stroke="#D4AF37"
        strokeWidth="2"
      />

      {dataPoints.map((point, i) => {
        const [px, py] = point.split(",").map(Number);
        return (
          <circle key={i} cx={px} cy={py} r="3" fill="#D4AF37" />
        );
      })}

      {axisPoints.map((p, i) => (
        <text
          key={i}
          x={p.lx}
          y={p.ly}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#A0A0A0"
          fontSize="8"
          fontFamily="var(--font-jetbrains), monospace"
        >
          {domains[i]}
        </text>
      ))}
    </svg>
  );
}

export default function EfficiencyScore() {
  return (
    <SectionWrapper id="score">
      <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-gold mb-14 text-center">
        Your Score. Your Roadmap.
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#E0E0E0] text-base mb-8 leading-relaxed">
            We assess every business across 7 dimensions:
          </p>
          <ul className="space-y-3">
            {domains.map((d, i) => (
              <li key={d} className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-cormorant)] text-gold font-bold text-lg w-6">
                  {i + 1}
                </span>
                <span className="text-[#E0E0E0] text-sm font-[family-name:var(--font-inter)]">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <RadarChart />
          <div className="mt-8 text-center">
            <span className="font-[family-name:var(--font-cormorant)] text-6xl font-bold text-gold">
              580
            </span>
            <span className="font-[family-name:var(--font-cormorant)] text-2xl text-[#A0A0A0] ml-2">
              / 1000
            </span>
            <p className="text-[#F5D061] font-[family-name:var(--font-inter)] font-semibold text-sm mt-2">
              Average
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-[#A0A0A0] text-sm mt-14">
        Most businesses score between 400-600. Where do you think you land?
      </p>
    </SectionWrapper>
  );
}
