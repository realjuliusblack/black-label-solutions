// AI Rate Context — Black Label Solutions
//
// Two exports for injecting into any LLM (Claude, GPT, etc.):
//   1. RATE_KNOWLEDGE_BASE  — static prose for Midas system prompt (always-on)
//   2. generateRateContext  — per-job rate string (inject before each job post/bid)
//
// Architecture note: rate logic belongs in the system prompt, NOT a vector store.
// It is deterministic, always needed, and must be present in every request.

import { calculateRate, LocumJobParams, SPECIALTY_DISPLAY_NAMES } from "@/lib/locum-rates";

// ─── Static Knowledge Base ────────────────────────────────────────────────────

export const RATE_KNOWLEDGE_BASE = `
## BLACK LABEL SOLUTIONS — RATE INTELLIGENCE & COMPETITIVE STRATEGY

### HOW BLS WINS EVERY DEAL

BLS competes against traditional locum agencies on TWO fronts simultaneously:

1. **Lower bill rate to hospitals** (~10% below agency rates) → hospitals prefer us on cost
2. **Higher pay to physicians** (90% of bill vs. agency's 72%) → physicians prefer us on earnings

This is possible because we have no recruiters and a fully automated pipeline. Every efficiency gain goes to the deal — not overhead.

**The math on a typical EM shift (direct job):**
- Agency bills hospital: ~$422/hr, pays physician: ~$304/hr, keeps: $118 (28%)
- BLS bills hospital: $380/hr (10% lower), pays physician: $342/hr (12% more), keeps: $38 (10%)
- Hospital saves $42/hr. Physician earns $38/hr more. BLS still profitable at scale.

### JOB SOURCE: DIRECT vs VMS

**Direct jobs** (e.g., posted directly to hospitals we have relationships with):
- BLS margin: 10% of bill rate
- No platform fee

**VMS jobs** (sourced through platforms like Aya Healthcare, Locum Nation, etc.):
- VMS platform takes 8% fee — **BLS absorbs this entirely**
- BLS net margin: 2% of bill rate (very thin, but profitable at volume)
- Hospital still pays same bill rate. Physician still earns same pay.
- Never pass VMS cost to hospital or physician — both sides stay attractive.

### BILL RATES BY SPECIALTY (BLS competitive bid rates, $/hr)

These are what BLS charges hospitals. Physician receives 90% of these rates.

**Emergency Medicine**
- General EM: $380–$500/hr (hard cap $690)
- Pediatric EM: $415–$540/hr (hard cap $715) — fellowship scarcity premium

**Hospital Medicine**
- Hospitalist: $188–$263/hr (hard cap $363)
- Nocturnist (overnight hospitalist): +23% on top of base

**Anesthesia**
- Anesthesiologist (MD/DO): $313–$450/hr (hard cap $600)
- CRNA: $225–$288/hr (hard cap $375)
- Cardiac/trauma subspecialties: +15–25% additional

**Radiology**
- Diagnostic Radiology: $175–$250/hr (hard cap $350)
- Interventional Radiology: $375–$563/hr (hard cap $725) — separate market
- Teleradiology: $38–$62/RVU (hard cap $81/RVU; location-independent)

**Psychiatry**
- Adult Psychiatry: $231–$275/hr (hard cap $375) — telehealth capable +20%
- Child & Adolescent Psychiatry: $219–$263/hr (hard cap $288) — extreme shortage

**Surgery**
- General Surgery: $175–$313/hr (hard cap $400) — call coverage +22%
- Orthopedic Surgery: $250–$300/hr (hard cap $581 for trauma)

**Cardiology**
- Interventional Cardiology: $313–$500/hr (hard cap $650)
- Non-Invasive Cardiology: $313–$438/hr (hard cap $525)

**Internal Medicine & Subspecialties**
- Internal Medicine: $150–$181/hr (hard cap $206)
- Pulmonology / Critical Care: $300–$388/hr (hard cap $475)
- Gastroenterology: $228–$509/hr (hard cap $625) — ERCP +20%, procedure volume +15%
- Nephrology: $156–$270/hr (hard cap $325)
- Medical Oncology: $250–$625/hr (hard cap $750)
- Neurology: $250–$344/hr (hard cap $375)

**Primary Care**
- Family Medicine: $125–$181/hr (hard cap $200)

**OB/GYN**
- OB/GYN: $188–$281/hr (hard cap $325) — delivery call +20%

**Pediatrics**
- General Pediatrics: $131–$163/hr (hard cap $250)
- Neonatology / NICU: $173–$295/hr (hard cap $375)

**Other Procedural**
- Urology: $275–$399/hr (hard cap $475)
- Dermatology: $250–$375/hr (hard cap $450)
- Ophthalmology: $188–$375/hr (hard cap $475)
- Pain Management: $250–$500/hr (hard cap $600)
- Pathology: $149–$250/hr (hard cap $313)

**Rehab & Niche**
- PM&R: $200–$269/hr (hard cap $325)
- Wound Care / Hyperbaric: $163–$250/hr (hard cap $300)

### BILL RATE MULTIPLIERS (applied to base bill rate; physician gets 90% of final)

**Geography:**
- Urban/suburban: +0–5% | Rural: +18% | Rural remote: +25%
- HPSA (shortage area): +20% | Critical Access Hospital: +22%
- Teleradiology: location-independent (no geographic multiplier)

**Shift timing:**
- Day: baseline | Evening: +12% | Overnight: +17.5%
- Weekend day: +20% | Weekend overnight: +27.5%
- Holiday: flat $1,000 added to bill rate (physician gets 90% = $900)

**Shift length:**
- 8hr: baseline | 10hr: +7.5% | 12hr: +12.5% | 24hr block: +10%

**Urgency:**
- Standard / short notice: baseline | Urgent (3–7 days): +20% | Last-minute (<72hr): +35%

**Facility:**
- Trauma center: +12.5% | Critical access hospital: +20% | Academic center: +10%
- Children's hospital: +10% | Surgical center: +5% | Outpatient clinic: −5%

**Subspecialty skills (on bill rate; stacks with 70%/50% dampening for 2nd/3rd flag):**
- Board-certified EM: +20% | EM subspecialty fellowship: +20%
- Nocturnist: +23% | ICU coverage: +18% | Procedure-heavy: +20%
- Cardiac anesthesia: +25% | Regional/trauma anesthesia: +15–18%
- Call coverage (surgical): +22% | Trauma surgery: +25%
- Telehealth-capable (psych): +20% | Delivery call (OB): +20%

### MESSAGING FRAMEWORK FOR MIDAS

When communicating a rate to a hospital, always lead with:
> "Our bill rate is $X/hr — approximately $Y/hr less than you're paying your current agency."

When communicating a rate to a physician, always lead with:
> "You'll earn $X/hr — approximately $Y/hr more than you'd net through a traditional agency for the same position."

When asked why our rates are better:
> "No recruiters. No legacy overhead. Fully automated. Every dollar we save on operations goes to your rate and the facility's budget — not a recruiter's commission."
`.trim();

// ─── Per-Job Rate Context ─────────────────────────────────────────────────────

/**
 * Generate a rate recommendation string for a specific job.
 * Inject this into Midas's context before posting a bid or communicating rates.
 *
 * @example
 * const ctx = generateRateContext({
 *   specialty: "emergency_medicine",
 *   locationType: "rural",
 *   shiftTiming: "overnight",
 *   shiftLength: 12,
 *   facilitySetting: "critical_access_hospital",
 *   leadTime: "urgent",
 *   jobSource: "vms",
 * });
 */
export function generateRateContext(params: LocumJobParams): string {
  const rec = calculateRate(params);
  const unit = rec.rateUnit === "per_rvu" ? "/RVU" : "/hr";
  const name = SPECIALTY_DISPLAY_NAMES[params.specialty];
  const pct = (rec.ourMarginPct * 100).toFixed(1);

  const lines: string[] = [
    `## RATE RECOMMENDATION — ${name} (${params.jobSource.toUpperCase()})`,
    ``,
    `BILL RATE (what hospital pays):  $${rec.billRate}${unit}`,
    `PHYSICIAN PAY (what doctor gets): $${rec.physicianPay}${unit}`,
    `BLS MARGIN:                       $${rec.ourMargin}${unit} (${pct}%)`,
    rec.vmsFee > 0
      ? `VMS FEE (absorbed by BLS):        $${rec.vmsFee}${unit} (8%)`
      : `VMS FEE:                          $0 (direct job)`,
    ``,
    `COMPETITIVE CONTEXT:`,
    `  Agency bill estimate:  $${rec.agencyBillEstimate}${unit}  →  Hospital saves $${rec.hospitalAdvantage}${unit} vs agency`,
    `  Agency physician pay:  $${rec.agencyPayEstimate}${unit}  →  Physician earns $${rec.physicianAdvantage}${unit} MORE than agency`,
    ``,
    `RATE BREAKDOWN:`,
    ...rec.breakdown.map((item) => {
      if (item.multiplier !== null) {
        return `  • ${item.factor}: ×${item.multiplier.toFixed(3)}`;
      } else if (item.flatBonus !== null) {
        return `  • ${item.factor}: +$${item.flatBonus} flat`;
      } else {
        return `  • ${item.factor}`;
      }
    }),
    ``,
    `RATIONALE: ${rec.rationale}`,
  ];

  if (rec.isAboveCeiling) {
    lines.push(
      ``,
      `NOTE: Bill rate exceeds standard ceiling — justified by compounding premium factors.`
    );
  }

  if (rec.holidayBonus > 0) {
    lines.push(
      ``,
      `HOLIDAY: Physician receives +$${rec.holidayBonus} bonus for ${params.holidayName ?? "holiday"} coverage.`
    );
  }

  return lines.join("\n");
}
