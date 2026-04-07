// AI Rate Context — Black Label Solutions
//
// Exports two things for injecting into any LLM (Claude, GPT, etc.):
//   1. RATE_KNOWLEDGE_BASE  — static prose for the system prompt (always-on)
//   2. generateRateContext  — per-job rate recommendation string (inject before posting)
//
// These are the source of truth for Midas when pricing locum jobs.
// Do NOT use a vector store for this data — rate logic is deterministic and
// must be present in every request, not retrieved probabilistically.

import { calculateRate, LocumJobParams } from "@/lib/locum-rates";

// ─── Static Knowledge Base (inject into Midas system prompt) ─────────────────

export const RATE_KNOWLEDGE_BASE = `
## BLACK LABEL SOLUTIONS — LOCUM RATE INTELLIGENCE

You are posting locum physician jobs directly to physicians. There is NO recruiter or agency middleman. Physicians receive 100% of the stated rate. Our rates are equivalent to what an agency-placed physician would net after the agency's 28% cut — meaning we are 39% more competitive than agency-posted rates for the same physician. Always lead with this advantage.

### RATE PHILOSOPHY
- Always offer at the higher end of the range. Our competitive edge is rate transparency and maximum physician pay.
- When a job has multiple premium factors (rural + overnight + last-minute), rates stack via multipliers and may exceed the standard ceiling up to the hard cap.
- Agency equivalent = our rate ÷ 0.72. Use this to show hospitals the true cost comparison.

### SPECIALTY RATE FLOORS & STANDARD CEILINGS ($/hr direct, unless noted)

**Emergency Medicine**
- General EM: $330–$400/hr (hard cap $550)
- Pediatric EM: $330–$430/hr (hard cap $570) — fellowship-trained scarcity premium

**Hospital Medicine**
- Hospitalist: $150–$210/hr (hard cap $290)
- Nocturnist (overnight hospitalist): +23% above base

**Anesthesia**
- Anesthesiologist (MD/DO): $250–$360/hr (hard cap $480)
- CRNA: $180–$230/hr (hard cap $300)
- Note: Cardiac, regional, trauma subspecialties command 15–25% additional premium

**Radiology**
- Diagnostic Radiology: $140–$200/hr (hard cap $280)
- Interventional Radiology: $300–$450/hr (hard cap $580) — entirely separate market
- Teleradiology: $30–$50/RVU (location-independent; no geographic premium)

**Psychiatry**
- Adult Psychiatry: $185–$220/hr (hard cap $300) — telehealth-capable +20%
- Child & Adolescent Psychiatry: $175–$210/hr (hard cap $230) — extreme shortage

**Surgery**
- General Surgery: $140–$250/hr (hard cap $320) — call coverage +22%
- Orthopedic Surgery: $200–$240/hr (hard cap $465 for trauma)

**Cardiology**
- Interventional Cardiology: $250–$400/hr (hard cap $520)
- Non-Invasive Cardiology: $250–$350/hr (hard cap $420)

**Internal Medicine & Subspecialties**
- Internal Medicine: $120–$145/hr (hard cap $165)
- Pulmonology/Critical Care (Intensivist): $240–$310/hr (hard cap $380)
- Gastroenterology: $182–$407/hr (hard cap $500) — ERCP +20%, procedure volume +15%
- Nephrology: $125–$216/hr (hard cap $260)
- Medical Oncology: $200–$500/hr (hard cap $600) — wide range by complexity
- Neurology: $200–$275/hr (hard cap $300)

**Primary Care**
- Family Medicine: $100–$145/hr (hard cap $160)

**OB/GYN**
- OB/GYN: $150–$225/hr (hard cap $260) — delivery call +20%

**Pediatrics**
- General Pediatrics: $105–$130/hr (hard cap $200)
- Neonatology/NICU: $138–$236/hr (hard cap $300)

**Other Procedural**
- Urology: $220–$319/hr (hard cap $380)
- Dermatology: $200–$300/hr (hard cap $360)
- Ophthalmology: $150–$300/hr (hard cap $380)
- Pain Management: $200–$400/hr (hard cap $480)
- Pathology: $119–$200/hr (hard cap $250)

**Rehab & Niche**
- PM&R: $160–$215/hr (hard cap $260)
- Wound Care / Hyperbaric: $130–$200/hr (hard cap $240)

### UNIVERSAL RATE MULTIPLIERS

**Geography** (stacks on base):
- Rural: +18% | Rural Remote: +25% | HPSA: +20% | Critical Access Hospital: +22%
- Urban / suburban: baseline or +5%
- Teleradiology: geography-independent

**Shift Timing**:
- Evening: +12% | Overnight: +17.5% | Weekend day: +20% | Weekend overnight: +27.5%
- Holidays: flat $1,000 bonus (not a multiplier)

**Shift Length**:
- 8hr: baseline | 10hr: +7.5% | 12hr: +12.5% | 24hr block: +10%

**Lead Time**:
- Standard (>2 weeks): baseline | Short (1–2 weeks): baseline
- Urgent (3–7 days): +20% | Last-minute (<72hr): +35%

**Subspecialty skills**: Each adds 12–25% (see per-specialty notes above). When stacking multiple subspecialty flags: 2nd flag applies at 70% of its value, 3rd at 50%.

**Facility type**: Trauma center +12.5% | Critical access hospital +20% | Academic medical center +10% | Children's hospital +10% | Outpatient clinic −5%
`.trim();

// ─── Per-Job Rate Context Generator ─────────────────────────────────────────

const SPECIALTY_DISPLAY: Record<LocumJobParams["specialty"], string> = {
  emergency_medicine:          "Emergency Medicine",
  pediatric_em:                "Pediatric Emergency Medicine",
  hospitalist:                 "Hospitalist",
  anesthesiology_md:           "Anesthesiology (MD/DO)",
  crna:                        "CRNA",
  radiology_diagnostic:        "Diagnostic Radiology",
  radiology_interventional:    "Interventional Radiology",
  radiology_tele:              "Teleradiology",
  psychiatry_adult:            "Psychiatry (Adult)",
  psychiatry_child_adolescent: "Child & Adolescent Psychiatry",
  general_surgery:             "General Surgery",
  orthopedic_surgery:          "Orthopedic Surgery",
  cardiology_interventional:   "Interventional Cardiology",
  cardiology_noninvasive:      "Non-Invasive Cardiology",
  internal_medicine:           "Internal Medicine",
  pulmonology_critical_care:   "Pulmonology / Critical Care",
  gastroenterology:            "Gastroenterology",
  nephrology:                  "Nephrology",
  oncology_medical:            "Medical Oncology",
  neurology:                   "Neurology",
  family_medicine:             "Family Medicine",
  ob_gyn:                      "OB/GYN",
  pediatrics_general:          "Pediatrics (General)",
  neonatology:                 "Neonatology / NICU",
  urology:                     "Urology",
  dermatology:                 "Dermatology",
  ophthalmology:               "Ophthalmology",
  pain_management:             "Pain Management",
  pathology:                   "Pathology",
  pmr:                         "PM&R",
  wound_care:                  "Wound Care",
};

/**
 * Generate a rate recommendation string for a specific job.
 * Paste this directly into Midas's context before it prices or posts a job.
 *
 * @example
 * const context = generateRateContext({
 *   specialty: "emergency_medicine",
 *   locationType: "rural",
 *   shiftTiming: "overnight",
 *   shiftLength: 12,
 *   facilitySetting: "critical_access_hospital",
 *   leadTime: "urgent",
 * });
 * // Inject `context` into the LLM message alongside the job details.
 */
export function generateRateContext(params: LocumJobParams): string {
  const rec = calculateRate(params);
  const unit = rec.rateUnit === "per_rvu" ? "/RVU" : "/hr";
  const specialtyName = SPECIALTY_DISPLAY[params.specialty];

  const lines: string[] = [
    `## RATE RECOMMENDATION — ${specialtyName}`,
    ``,
    `Recommended rate: $${rec.recommendedRate}${unit} (direct to physician, 100%)`,
    `Agency equivalent: ~$${rec.agencyEquivalent}${unit} (what agencies charge hospitals for the same role)`,
    ``,
    `Breakdown:`,
    ...rec.breakdown.map((item) => {
      if (item.multiplier !== null) {
        return `  • ${item.factor}: ×${item.multiplier.toFixed(3)} — ${item.rationale}`;
      } else if (item.flatBonus !== null) {
        return `  • ${item.factor}: +$${item.flatBonus} flat — ${item.rationale}`;
      } else {
        return `  • ${item.factor}: ${item.rationale}`;
      }
    }),
    ``,
    `Rationale: ${rec.rationale}`,
  ];

  if (rec.isAboveCeiling) {
    lines.push(
      ``,
      `Note: Rate is above standard ceiling for this specialty — justified by extreme premium factors.`
    );
  }

  if (rec.holidayBonus > 0) {
    lines.push(
      ``,
      `Holiday note: $${rec.holidayBonus} flat bonus included for ${params.holidayName ?? "holiday"} coverage.`
    );
  }

  return lines.join("\n");
}
