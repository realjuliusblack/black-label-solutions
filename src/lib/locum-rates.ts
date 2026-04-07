// Locum Rate Engine — Black Label Solutions
//
// Architecture: bill-rate-first.
//   billRate   = what hospital pays (our competitive bid, ~10% below agency)
//   physicianPay = billRate × 0.90  (physician always gets 90%)
//   ourMargin  = 10% on direct jobs, 2% on VMS jobs (8% VMS fee absorbed by BLS)
//
// Competitive advantage on every deal:
//   Hospital pays LESS than agency (we bid lower)
//   Physician earns MORE than agency pays (we keep less margin)

// ─── Specialty Types ─────────────────────────────────────────────────────────

export type Specialty =
  | "emergency_medicine"
  | "pediatric_em"
  | "hospitalist"
  | "anesthesiology_md"
  | "crna"
  | "radiology_diagnostic"
  | "radiology_interventional"
  | "radiology_tele"              // per-RVU compensation model
  | "psychiatry_adult"
  | "psychiatry_child_adolescent"
  | "general_surgery"
  | "orthopedic_surgery"
  | "cardiology_interventional"
  | "cardiology_noninvasive"
  | "internal_medicine"
  | "pulmonology_critical_care"
  | "gastroenterology"
  | "nephrology"
  | "oncology_medical"
  | "neurology"
  | "family_medicine"
  | "ob_gyn"
  | "pediatrics_general"
  | "neonatology"
  | "urology"
  | "dermatology"
  | "ophthalmology"
  | "pain_management"
  | "pathology"
  | "pmr"
  | "wound_care";

// ─── Core Config ─────────────────────────────────────────────────────────────

export const MARGIN_CONFIG = {
  directMarginPct:   0.10,   // 10% margin on direct (no VMS) jobs
  vmsFeesPct:        0.08,   // 8% VMS platform fee — absorbed by BLS
  vmsNetMarginPct:   0.02,   // 2% net margin on VMS jobs (10% - 8%)
  physicianNetPct:   0.90,   // physician always gets 90% of bill rate
  bidDiscountVsAgency: 0.10, // our bill ≈ agency bill × 0.90 (10% lower → wins bids)
  agencyMarginPct:   0.28,   // industry standard agency margin (for comparison output)
} as const;

// Bill rates are BLS competitive bid rates (what we charge hospitals).
// Derived as: physicianMarketPay / (1 - agencyMarginPct) × (1 - bidDiscount)
// = physicianMarketPay / 0.72 × 0.90
// All $/hr unless unit is "per_rvu".
export const SPECIALTY_BILL_RATES = {
  emergency_medicine:          { billFloor: 380, billCeiling: 500, billHardCap: 690 },
  pediatric_em:                { billFloor: 415, billCeiling: 540, billHardCap: 715 },
  hospitalist:                 { billFloor: 188, billCeiling: 263, billHardCap: 363 },
  anesthesiology_md:           { billFloor: 313, billCeiling: 450, billHardCap: 600 },
  crna:                        { billFloor: 225, billCeiling: 288, billHardCap: 375 },
  radiology_diagnostic:        { billFloor: 175, billCeiling: 250, billHardCap: 350 },
  radiology_interventional:    { billFloor: 375, billCeiling: 563, billHardCap: 725 },
  radiology_tele:              { billFloor: 38,  billCeiling: 62,  billHardCap: 81,  unit: "per_rvu" as const },
  psychiatry_adult:            { billFloor: 231, billCeiling: 275, billHardCap: 375 },
  psychiatry_child_adolescent: { billFloor: 219, billCeiling: 263, billHardCap: 288 },
  general_surgery:             { billFloor: 175, billCeiling: 313, billHardCap: 400 },
  orthopedic_surgery:          { billFloor: 250, billCeiling: 300, billHardCap: 581 },
  cardiology_interventional:   { billFloor: 313, billCeiling: 500, billHardCap: 650 },
  cardiology_noninvasive:      { billFloor: 313, billCeiling: 438, billHardCap: 525 },
  internal_medicine:           { billFloor: 150, billCeiling: 181, billHardCap: 206 },
  pulmonology_critical_care:   { billFloor: 300, billCeiling: 388, billHardCap: 475 },
  gastroenterology:            { billFloor: 228, billCeiling: 509, billHardCap: 625 },
  nephrology:                  { billFloor: 156, billCeiling: 270, billHardCap: 325 },
  oncology_medical:            { billFloor: 250, billCeiling: 625, billHardCap: 750 },
  neurology:                   { billFloor: 250, billCeiling: 344, billHardCap: 375 },
  family_medicine:             { billFloor: 125, billCeiling: 181, billHardCap: 200 },
  ob_gyn:                      { billFloor: 188, billCeiling: 281, billHardCap: 325 },
  pediatrics_general:          { billFloor: 131, billCeiling: 163, billHardCap: 250 },
  neonatology:                 { billFloor: 173, billCeiling: 295, billHardCap: 375 },
  urology:                     { billFloor: 275, billCeiling: 399, billHardCap: 475 },
  dermatology:                 { billFloor: 250, billCeiling: 375, billHardCap: 450 },
  ophthalmology:               { billFloor: 188, billCeiling: 375, billHardCap: 475 },
  pain_management:             { billFloor: 250, billCeiling: 500, billHardCap: 600 },
  pathology:                   { billFloor: 149, billCeiling: 250, billHardCap: 313 },
  pmr:                         { billFloor: 200, billCeiling: 269, billHardCap: 325 },
  wound_care:                  { billFloor: 163, billCeiling: 250, billHardCap: 300 },
} as const satisfies Record<Specialty, { billFloor: number; billCeiling: number; billHardCap: number; unit?: "per_rvu" }>;

// ─── Multiplier Tables ────────────────────────────────────────────────────────

// All multipliers apply to the BILL RATE. Physician pay is always 90% of bill.

export const LOCATION_MULTIPLIERS = {
  urban_desirable: 1.000, // Major metro, easy to staff — baseline
  urban_standard:  1.000,
  suburban:        1.050,
  rural:           1.180, // Rural physician shortage — 18% premium
  rural_remote:    1.250,
  hpsa:            1.200, // Health Professional Shortage Area
  critical_access: 1.220, // CMS Critical Access Hospital
} as const;
// Note: radiology_tele ignores location (location-independent service)

export const SHIFT_TIMING_MULTIPLIERS = {
  day:               1.000, // 07:00–19:00 baseline
  evening:           1.120,
  overnight:         1.175,
  weekend_day:       1.200,
  weekend_overnight: 1.275,
  holiday:           1.000, // isHoliday flag triggers flat bonus instead
} as const;

export const SHIFT_LENGTH_MULTIPLIERS = {
  8:  1.000,
  10: 1.075,
  12: 1.125,
  24: 1.100, // 24-hour block (hospitalist, anesthesia call)
} as const;

export const FACILITY_MULTIPLIERS = {
  standard_ed:              1.000,
  high_volume_urban_ed:     1.000,
  trauma_center:            1.125,
  critical_access_hospital: 1.200,
  community_hospital:       1.000,
  academic_medical_center:  1.100,
  childrens_hospital:       1.100,
  surgical_center:          1.050,
  imaging_center:           1.000,
  outpatient_clinic:        0.950,
  dialysis_center:          1.000,
  infusion_center:          1.000,
} as const;

export const LEAD_TIME_MULTIPLIERS = {
  standard:    1.00, // >2 weeks
  short:       1.00, // 1–2 weeks
  urgent:      1.20, // 3–7 days
  last_minute: 1.35, // <72 hours
} as const;

export const SUBSPECIALTY_MULTIPLIERS = {
  // Emergency Medicine
  boardCertifiedEM:    1.20,
  emSubspecialty:      1.20,
  // Hospitalist
  nocturnist:          1.23,
  icuCoverage:         1.18,
  procedureHeavy:      1.20,
  // Anesthesia
  cardiacAnesthesia:   1.25,
  regionalAnesthesia:  1.15,
  pediatricAnesthesia: 1.15,
  traumaAnesthesia:    1.18,
  // Radiology
  nighthawkReading:    1.15,
  neuroradiology:      1.20,
  pediatricRadiology:  1.15,
  // Psychiatry
  telehealthCapable:   1.20,
  // Surgery
  traumaSurgery:       1.25,
  callCoverage:        1.22,
  // Cardiology
  interventionalProc:  1.15,
  // GI
  ercp:                1.20,
  procedureVolume:     1.15,
  // OB/GYN
  callDeliveries:      1.20,
  // Oncology
  complexChemo:        1.20,
  clinicalTrials:      1.15,
  // General
  boardCertified:      1.12,
} as const;

// Diminishing returns when stacking multiple subspecialty flags.
// 1st: full value, 2nd: 70% of its increment, 3rd: 50%.
export const SUBSPECIALTY_STACK_DAMPENER = [1.0, 0.70, 0.50] as const;

// Flat dollar bonus added to BILL RATE on holidays.
// Physician gets 90% of this bonus; BLS keeps 10%.
export const HOLIDAY_FLAT_BONUS = 1000;

// ─── Derived Types ────────────────────────────────────────────────────────────

export type LocationType    = keyof typeof LOCATION_MULTIPLIERS;
export type ShiftTiming     = keyof typeof SHIFT_TIMING_MULTIPLIERS;
export type ShiftLength     = 8 | 10 | 12 | 24;
export type FacilitySetting = keyof typeof FACILITY_MULTIPLIERS;
export type LeadTime        = keyof typeof LEAD_TIME_MULTIPLIERS;
export type SubspecialtyKey = keyof typeof SUBSPECIALTY_MULTIPLIERS;
export type CompensationModel = "hourly" | "per_rvu";
export type JobSource       = "direct" | "vms";

// ─── Input / Output ───────────────────────────────────────────────────────────

export interface LocumJobParams {
  specialty: Specialty;
  locationType: LocationType;
  shiftTiming: ShiftTiming;
  shiftLength: ShiftLength;
  facilitySetting: FacilitySetting;
  leadTime: LeadTime;
  /** "direct" = no VMS fee (10% margin). "vms" = 8% VMS fee absorbed (2% net margin). */
  jobSource: JobSource;
  subspecialtyFlags?: Partial<Record<SubspecialtyKey, boolean>>;
  isHoliday?: boolean;
  holidayName?: string;
}

export interface RateBreakdownItem {
  factor: string;
  multiplier: number | null;
  flatBonus: number | null;
  rationale: string;
}

export interface RateRecommendation {
  specialty: Specialty;
  jobSource: JobSource;
  compensationModel: CompensationModel;
  rateUnit: "per_hour" | "per_rvu";

  // What hospital pays
  billRate: number;

  // What physician gets (always billRate × 0.90)
  physicianPay: number;

  // BLS economics
  vmsFee: number;          // 0 (direct) or billRate × 0.08 (vms — absorbed by BLS)
  ourMargin: number;       // billRate × 0.10 (direct) or billRate × 0.02 (vms)
  ourMarginPct: number;

  holidayBonus: number;    // physician's share of holiday bonus (billBonus × 0.90)

  // Competitive context — what Midas uses when communicating value to hospitals/physicians
  agencyBillEstimate: number;  // billRate / 0.90 — what agencies charge hospitals
  agencyPayEstimate: number;   // agencyBillEstimate × 0.72 — what agencies pay physicians
  physicianAdvantage: number;  // physicianPay - agencyPayEstimate (always positive)
  hospitalAdvantage: number;   // agencyBillEstimate - billRate (always positive)

  isAboveCeiling: boolean;
  breakdown: RateBreakdownItem[];
  rationale: string;
}

// ─── Display Names ────────────────────────────────────────────────────────────

export const SPECIALTY_DISPLAY_NAMES: Record<Specialty, string> = {
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
  pmr:                         "Physical Medicine & Rehabilitation",
  wound_care:                  "Wound Care / Hyperbaric Medicine",
};

// ─── Rate Calculator ──────────────────────────────────────────────────────────

function r(n: number): number {
  return Math.round(n);
}

export function calculateRate(params: LocumJobParams): RateRecommendation {
  const {
    specialty,
    locationType,
    shiftTiming,
    shiftLength,
    facilitySetting,
    leadTime,
    jobSource,
    subspecialtyFlags = {},
    isHoliday = false,
    holidayName,
  } = params;

  const rates = SPECIALTY_BILL_RATES[specialty];
  const isTeleRad = specialty === "radiology_tele";
  const compensationModel: CompensationModel = isTeleRad ? "per_rvu" : "hourly";
  const rateUnit = isTeleRad ? "per_rvu" : "per_hour";
  const unitLabel = isTeleRad ? "/RVU" : "/hr";

  const breakdown: RateBreakdownItem[] = [];
  let bill = rates.billFloor;

  breakdown.push({
    factor: "Base bill rate",
    multiplier: null,
    flatBonus: null,
    rationale: `${SPECIALTY_DISPLAY_NAMES[specialty]} — BLS competitive bid floor: $${rates.billFloor}${unitLabel}`,
  });

  // Location (skip for teleradiology)
  if (!isTeleRad) {
    const m = LOCATION_MULTIPLIERS[locationType];
    if (m !== 1.0) {
      bill *= m;
      breakdown.push({
        factor: `Location (${locationType})`,
        multiplier: m,
        flatBonus: null,
        rationale: locationType === "rural" || locationType === "rural_remote"
          ? "Rural physician shortage — premium required to attract coverage"
          : locationType === "hpsa"
          ? "Health Professional Shortage Area — federally designated underserved zone"
          : locationType === "critical_access"
          ? "CMS Critical Access Hospital — rural, cost-based reimbursement"
          : "Suburban location — modest geographic premium",
      });
    }
  }

  // Shift timing
  const timingM = SHIFT_TIMING_MULTIPLIERS[shiftTiming];
  if (timingM !== 1.0) {
    bill *= timingM;
    breakdown.push({
      factor: `Shift timing (${shiftTiming})`,
      multiplier: timingM,
      flatBonus: null,
      rationale: shiftTiming.includes("overnight")
        ? "Overnight premium — undesirable hours command higher rates"
        : "Weekend premium — non-standard scheduling",
    });
  }

  // Shift length
  const lengthM = SHIFT_LENGTH_MULTIPLIERS[shiftLength];
  if (lengthM !== 1.0) {
    bill *= lengthM;
    breakdown.push({
      factor: `Shift length (${shiftLength}hr)`,
      multiplier: lengthM,
      flatBonus: null,
      rationale: shiftLength === 12
        ? "12-hour shift — higher per-shift value, preferred continuity of care"
        : shiftLength === 24
        ? "24-hour block — maximum commitment, full day coverage"
        : "10-hour shift — moderate length premium",
    });
  }

  // Lead time
  const leadM = LEAD_TIME_MULTIPLIERS[leadTime];
  if (leadM !== 1.0) {
    bill *= leadM;
    breakdown.push({
      factor: `Lead time (${leadTime})`,
      multiplier: leadM,
      flatBonus: null,
      rationale: leadTime === "last_minute"
        ? "Last-minute (<72hr) — scarcity premium, physician schedule disruption offset"
        : "Urgent (3–7 days) — compressed timeline requires premium",
    });
  }

  // Subspecialty flags — stack with diminishing returns
  const activeFlags = (Object.keys(subspecialtyFlags) as SubspecialtyKey[])
    .filter((k) => subspecialtyFlags[k] === true)
    .sort((a, b) => SUBSPECIALTY_MULTIPLIERS[b] - SUBSPECIALTY_MULTIPLIERS[a]);

  activeFlags.forEach((flag, idx) => {
    if (idx >= SUBSPECIALTY_STACK_DAMPENER.length) return;
    const dampener = SUBSPECIALTY_STACK_DAMPENER[idx];
    const rawM = SUBSPECIALTY_MULTIPLIERS[flag];
    const effectiveM = 1 + (rawM - 1) * dampener;
    bill *= effectiveM;
    breakdown.push({
      factor: `Subspecialty: ${flag}${idx > 0 ? ` (×${dampener} dampened)` : ""}`,
      multiplier: effectiveM,
      flatBonus: null,
      rationale: idx === 0
        ? "Primary subspecialty skill — full premium applied to bill rate"
        : "Additional subspecialty — diminishing returns stack",
    });
  });

  // Facility
  const facilityM = FACILITY_MULTIPLIERS[facilitySetting];
  if (facilityM !== 1.0) {
    bill *= facilityM;
    breakdown.push({
      factor: `Facility (${facilitySetting})`,
      multiplier: facilityM,
      flatBonus: null,
      rationale: facilityM > 1
        ? "Higher-acuity or specialized facility — premium for complexity and risk"
        : "Outpatient setting — lower acuity, reduced bill rate",
    });
  }

  // Holiday flat bonus added to BILL RATE
  const rawHolidayBillBonus = isHoliday ? HOLIDAY_FLAT_BONUS : 0;
  if (isHoliday) {
    bill += rawHolidayBillBonus;
    breakdown.push({
      factor: `Holiday bonus${holidayName ? ` (${holidayName})` : ""}`,
      multiplier: null,
      flatBonus: rawHolidayBillBonus,
      rationale: `Flat $${rawHolidayBillBonus} added to bill rate — market standard for holiday coverage`,
    });
  }

  // Clamp bill rate
  const { billFloor, billHardCap, billCeiling } = rates;
  const rawBill = bill;
  const billRate = Math.max(billFloor, Math.min(r(rawBill), billHardCap));
  const isAboveCeiling = billRate > billCeiling;

  if (r(rawBill) !== billRate) {
    breakdown.push({
      factor: r(rawBill) > billHardCap ? "Hard cap applied" : "Floor enforced",
      multiplier: null,
      flatBonus: null,
      rationale: r(rawBill) > billHardCap
        ? `Computed $${r(rawBill)} exceeded hard cap — clamped to $${billHardCap}`
        : `Computed $${r(rawBill)} below floor — set to floor $${billFloor}`,
    });
  }

  // Physician pay — always 90% of bill rate
  const physicianPay = r(billRate * MARGIN_CONFIG.physicianNetPct);

  // BLS economics
  const vmsFee = jobSource === "vms" ? r(billRate * MARGIN_CONFIG.vmsFeesPct) : 0;
  const ourMargin = billRate - vmsFee - physicianPay;
  const ourMarginPct = ourMargin / billRate;

  // Holiday bonus split
  const holidayBonus = isHoliday ? r(rawHolidayBillBonus * MARGIN_CONFIG.physicianNetPct) : 0;

  // Competitive comparison
  const agencyBillEstimate = r(billRate / (1 - MARGIN_CONFIG.bidDiscountVsAgency));
  const agencyPayEstimate = r(agencyBillEstimate * (1 - MARGIN_CONFIG.agencyMarginPct));
  const physicianAdvantage = physicianPay - agencyPayEstimate;
  const hospitalAdvantage = agencyBillEstimate - billRate;

  // Rationale
  const drivers = breakdown
    .filter((b) => b.multiplier !== null && b.multiplier !== 1.0)
    .map((b) => b.factor)
    .join(", ");

  const rationale = [
    `${SPECIALTY_DISPLAY_NAMES[specialty]}.`,
    drivers ? `Key drivers: ${drivers}.` : "Baseline — no premium factors.",
    isAboveCeiling ? `Bill rate above standard ceiling ($${billCeiling}) — justified by compounding premiums.` : "",
    jobSource === "vms"
      ? `VMS job: 8% platform fee ($${vmsFee}) absorbed by BLS. BLS net margin: $${ourMargin} (${(ourMarginPct * 100).toFixed(1)}%).`
      : `Direct job: BLS margin $${ourMargin} (10%).`,
  ].filter(Boolean).join(" ");

  return {
    specialty,
    jobSource,
    compensationModel,
    rateUnit,
    billRate,
    physicianPay,
    vmsFee,
    ourMargin,
    ourMarginPct,
    holidayBonus,
    agencyBillEstimate,
    agencyPayEstimate,
    physicianAdvantage,
    hospitalAdvantage,
    isAboveCeiling,
    breakdown,
    rationale,
  };
}
