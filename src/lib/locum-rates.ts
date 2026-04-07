// Locum rate calculation engine — Black Label Solutions
// All rates are direct-to-physician (100%, no agency margin).
// Equivalent agency billing = recommendedRate / 0.72 (agency margin ~28%).

// ─── Specialty Types ────────────────────────────────────────────────────────

export type Specialty =
  // Emergency Medicine
  | "emergency_medicine"
  | "pediatric_em"
  // Hospital Medicine
  | "hospitalist"
  // Anesthesia
  | "anesthesiology_md"
  | "crna"
  // Radiology
  | "radiology_diagnostic"
  | "radiology_interventional"
  | "radiology_tele" // per-RVU compensation model
  // Psychiatry
  | "psychiatry_adult"
  | "psychiatry_child_adolescent"
  // Surgery
  | "general_surgery"
  | "orthopedic_surgery"
  // Cardiology
  | "cardiology_interventional"
  | "cardiology_noninvasive"
  // Internal Medicine & Subspecialties
  | "internal_medicine"
  | "pulmonology_critical_care"
  | "gastroenterology"
  | "nephrology"
  | "oncology_medical"
  | "neurology"
  // Primary Care
  | "family_medicine"
  // OB/GYN
  | "ob_gyn"
  // Pediatrics
  | "pediatrics_general"
  | "neonatology"
  // Other Procedural
  | "urology"
  | "dermatology"
  | "ophthalmology"
  | "pain_management"
  | "pathology"
  // Rehab / Niche
  | "pmr"
  | "wound_care";

// ─── Rate Configuration ──────────────────────────────────────────────────────

export const RATE_CONFIG = {
  // Per-specialty floors, standard ceilings, and hard caps ($/hr direct-to-physician).
  // radiology_tele uses $/RVU (see unit field).
  SPECIALTY_BASE: {
    emergency_medicine:          { floor: 330, ceiling: 400, hardCap: 550 },
    pediatric_em:                { floor: 330, ceiling: 430, hardCap: 570 },
    hospitalist:                 { floor: 150, ceiling: 210, hardCap: 290 },
    anesthesiology_md:           { floor: 250, ceiling: 360, hardCap: 480 },
    crna:                        { floor: 180, ceiling: 230, hardCap: 300 },
    radiology_diagnostic:        { floor: 140, ceiling: 200, hardCap: 280 },
    radiology_interventional:    { floor: 300, ceiling: 450, hardCap: 580 },
    radiology_tele:              { floor: 30,  ceiling: 50,  hardCap: 65,  unit: "per_rvu" as const },
    psychiatry_adult:            { floor: 185, ceiling: 220, hardCap: 300 },
    psychiatry_child_adolescent: { floor: 175, ceiling: 210, hardCap: 230 },
    general_surgery:             { floor: 140, ceiling: 250, hardCap: 320 },
    orthopedic_surgery:          { floor: 200, ceiling: 240, hardCap: 465 },
    cardiology_interventional:   { floor: 250, ceiling: 400, hardCap: 520 },
    cardiology_noninvasive:      { floor: 250, ceiling: 350, hardCap: 420 },
    internal_medicine:           { floor: 120, ceiling: 145, hardCap: 165 },
    pulmonology_critical_care:   { floor: 240, ceiling: 310, hardCap: 380 },
    gastroenterology:            { floor: 182, ceiling: 407, hardCap: 500 },
    nephrology:                  { floor: 125, ceiling: 216, hardCap: 260 },
    oncology_medical:            { floor: 200, ceiling: 500, hardCap: 600 },
    neurology:                   { floor: 200, ceiling: 275, hardCap: 300 },
    family_medicine:             { floor: 100, ceiling: 145, hardCap: 160 },
    ob_gyn:                      { floor: 150, ceiling: 225, hardCap: 260 },
    pediatrics_general:          { floor: 105, ceiling: 130, hardCap: 200 },
    neonatology:                 { floor: 138, ceiling: 236, hardCap: 300 },
    urology:                     { floor: 220, ceiling: 319, hardCap: 380 },
    dermatology:                 { floor: 200, ceiling: 300, hardCap: 360 },
    ophthalmology:               { floor: 150, ceiling: 300, hardCap: 380 },
    pain_management:             { floor: 200, ceiling: 400, hardCap: 480 },
    pathology:                   { floor: 119, ceiling: 200, hardCap: 250 },
    pmr:                         { floor: 160, ceiling: 215, hardCap: 260 },
    wound_care:                  { floor: 130, ceiling: 200, hardCap: 240 },
  },

  // Geographic premium multipliers.
  // radiology_tele: ignore location (location-independent).
  LOCATION_MULTIPLIERS: {
    urban_desirable: 1.00, // Major metro, easy to staff — baseline
    urban_standard:  1.00,
    suburban:        1.05,
    rural:           1.18,
    rural_remote:    1.25,
    hpsa:            1.20, // Health Professional Shortage Area (CMS designation)
    critical_access: 1.22, // CMS Critical Access Hospital
  },

  // Shift timing multipliers.
  // "holiday" timing = 1.0x — the flat HOLIDAY_FLAT_BONUS handles holiday pay.
  SHIFT_TIMING_MULTIPLIERS: {
    day:               1.000, // 07:00–19:00
    evening:           1.120, // 15:00–23:00
    overnight:         1.175, // 19:00–07:00
    weekend_day:       1.200,
    weekend_overnight: 1.275,
    holiday:           1.000, // use isHoliday flag; flat bonus applied separately
  },

  // Shift length multipliers.
  SHIFT_LENGTH_MULTIPLIERS: {
    8:  1.000,
    10: 1.075,
    12: 1.125,
    24: 1.100, // 24-hour block (hospitalist, anesthesia call)
  },

  // Facility setting multipliers.
  FACILITY_MULTIPLIERS: {
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
  },

  // Lead time (urgency) multipliers.
  LEAD_TIME_MULTIPLIERS: {
    standard:    1.00, // >2 weeks
    short:       1.00, // 1–2 weeks
    urgent:      1.20, // 3–7 days
    last_minute: 1.35, // <72 hours
  },

  // Subspecialty skill multipliers applied to running rate.
  // Multiple flags stack with diminishing returns (see SUBSPECIALTY_STACK_DAMPENER).
  SUBSPECIALTY_MULTIPLIERS: {
    // Emergency Medicine
    boardCertifiedEM:    1.20,
    emSubspecialty:      1.20, // Tox, EMS fellowship, Sports Med, Critical Care
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
    // General (board-certified, non-EM)
    boardCertified:      1.12,
  },

  // Stacking dampener for multiple subspecialty flags.
  // 1st modifier: full value, 2nd: 70%, 3rd: 50%, beyond: ignored.
  SUBSPECIALTY_STACK_DAMPENER: [1.0, 0.70, 0.50] as const,

  // Flat dollar bonus added on top of hourly rate for holidays (not a multiplier).
  HOLIDAY_FLAT_BONUS: 1000,
} as const;

// ─── Derived Types ───────────────────────────────────────────────────────────

export type LocationType = keyof typeof RATE_CONFIG.LOCATION_MULTIPLIERS;
export type ShiftTiming = keyof typeof RATE_CONFIG.SHIFT_TIMING_MULTIPLIERS;
export type ShiftLength = 8 | 10 | 12 | 24;
export type FacilitySetting = keyof typeof RATE_CONFIG.FACILITY_MULTIPLIERS;
export type LeadTime = keyof typeof RATE_CONFIG.LEAD_TIME_MULTIPLIERS;
export type SubspecialtyKey = keyof typeof RATE_CONFIG.SUBSPECIALTY_MULTIPLIERS;
export type CompensationModel = "hourly" | "per_rvu";

// ─── Input / Output Interfaces ───────────────────────────────────────────────

export interface LocumJobParams {
  specialty: Specialty;
  locationType: LocationType;
  shiftTiming: ShiftTiming;
  shiftLength: ShiftLength;
  facilitySetting: FacilitySetting;
  leadTime: LeadTime;
  /** Subset of SUBSPECIALTY_MULTIPLIERS keys that apply to this job. */
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
  compensationModel: CompensationModel;
  rateUnit: "per_hour" | "per_rvu";
  baseRate: number;
  recommendedRate: number;
  /** What agencies typically charge hospitals for this role (recommendedRate / 0.72). */
  agencyEquivalent: number;
  breakdown: RateBreakdownItem[];
  rationale: string;
  isAboveCeiling: boolean;
  holidayBonus: number;
}

// ─── Rate Calculator ─────────────────────────────────────────────────────────

const SPECIALTY_DISPLAY_NAMES: Record<Specialty, string> = {
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
  pulmonology_critical_care:   "Pulmonology / Critical Care (Intensivist)",
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

function round(n: number): number {
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
    subspecialtyFlags = {},
    isHoliday = false,
    holidayName,
  } = params;

  const specialtyBase = RATE_CONFIG.SPECIALTY_BASE[specialty];
  const isTeleRad = specialty === "radiology_tele";
  const compensationModel: CompensationModel = isTeleRad ? "per_rvu" : "hourly";
  const rateUnit = isTeleRad ? "per_rvu" : "per_hour";

  const breakdown: RateBreakdownItem[] = [];
  let rate = specialtyBase.floor;

  breakdown.push({
    factor: "Base floor",
    multiplier: null,
    flatBonus: null,
    rationale: `${SPECIALTY_DISPLAY_NAMES[specialty]} direct-placement floor: $${specialtyBase.floor}/${rateUnit === "per_rvu" ? "RVU" : "hr"}`,
  });

  // Location (skip for teleradiology — location-independent)
  if (!isTeleRad) {
    const locMult = RATE_CONFIG.LOCATION_MULTIPLIERS[locationType];
    if (locMult !== 1.0) {
      rate = rate * locMult;
      breakdown.push({
        factor: `Location (${locationType})`,
        multiplier: locMult,
        flatBonus: null,
        rationale: locationType === "rural" || locationType === "rural_remote"
          ? "Rural location — acute physician shortage drives premium"
          : locationType === "hpsa"
          ? "Health Professional Shortage Area — 71% of locum worksites qualify"
          : locationType === "critical_access"
          ? "CMS Critical Access Hospital — cost-based reimbursement, rural premium"
          : "Suburban location — modest geographic premium",
      });
    }
  }

  // Shift timing
  const timingMult = RATE_CONFIG.SHIFT_TIMING_MULTIPLIERS[shiftTiming];
  if (timingMult !== 1.0) {
    rate = rate * timingMult;
    breakdown.push({
      factor: `Shift timing (${shiftTiming})`,
      multiplier: timingMult,
      flatBonus: null,
      rationale: shiftTiming === "overnight" || shiftTiming === "weekend_overnight"
        ? "Overnight premium — undesirable hours require higher compensation"
        : "Weekend premium — non-standard schedule",
    });
  }

  // Shift length
  const lengthMult = RATE_CONFIG.SHIFT_LENGTH_MULTIPLIERS[shiftLength];
  if (lengthMult !== 1.0) {
    rate = rate * lengthMult;
    breakdown.push({
      factor: `Shift length (${shiftLength}hr)`,
      multiplier: lengthMult,
      flatBonus: null,
      rationale: shiftLength === 12
        ? "12-hour shift — greater continuity, higher facility value, more margin per shift"
        : shiftLength === 24
        ? "24-hour block — maximum commitment premium"
        : "10-hour shift — modest length premium",
    });
  }

  // Lead time (urgency)
  const leadMult = RATE_CONFIG.LEAD_TIME_MULTIPLIERS[leadTime];
  if (leadMult !== 1.0) {
    rate = rate * leadMult;
    breakdown.push({
      factor: `Lead time (${leadTime})`,
      multiplier: leadMult,
      flatBonus: null,
      rationale: leadTime === "last_minute"
        ? "Last-minute (<72hr) — scarcity premium, physician disruption offset"
        : "Urgent (3–7 days) — compressed timeline premium",
    });
  }

  // Subspecialty flags (stack with diminishing returns)
  const activeFlags = (Object.keys(subspecialtyFlags) as SubspecialtyKey[]).filter(
    (k) => subspecialtyFlags[k] === true
  );
  // Sort by multiplier descending so highest value is applied first (full value)
  const sortedFlags = activeFlags.sort(
    (a, b) => RATE_CONFIG.SUBSPECIALTY_MULTIPLIERS[b] - RATE_CONFIG.SUBSPECIALTY_MULTIPLIERS[a]
  );

  sortedFlags.forEach((flag, idx) => {
    if (idx >= RATE_CONFIG.SUBSPECIALTY_STACK_DAMPENER.length) return;
    const dampener = RATE_CONFIG.SUBSPECIALTY_STACK_DAMPENER[idx];
    const rawMult = RATE_CONFIG.SUBSPECIALTY_MULTIPLIERS[flag];
    const effectiveMult = 1 + (rawMult - 1) * dampener;
    rate = rate * effectiveMult;
    breakdown.push({
      factor: `Subspecialty: ${flag}${idx > 0 ? ` (×${dampener} dampened)` : ""}`,
      multiplier: effectiveMult,
      flatBonus: null,
      rationale: idx === 0
        ? "Primary subspecialty skill premium — full multiplier applied"
        : "Additional subspecialty premium — diminishing returns stack",
    });
  });

  // Facility setting
  const facilityMult = RATE_CONFIG.FACILITY_MULTIPLIERS[facilitySetting];
  if (facilityMult !== 1.0) {
    rate = rate * facilityMult;
    breakdown.push({
      factor: `Facility (${facilitySetting})`,
      multiplier: facilityMult,
      flatBonus: null,
      rationale: facilityMult > 1
        ? "Higher-acuity or specialized facility — premium for complexity"
        : "Outpatient setting — reduced acuity, lower rate",
    });
  }

  // Holiday flat bonus (not a multiplier)
  const holidayBonus = isHoliday ? RATE_CONFIG.HOLIDAY_FLAT_BONUS : 0;
  if (isHoliday) {
    rate = rate + holidayBonus;
    breakdown.push({
      factor: `Holiday bonus${holidayName ? ` (${holidayName})` : ""}`,
      multiplier: null,
      flatBonus: holidayBonus,
      rationale: `Flat $${holidayBonus} holiday add — market standard for major holidays`,
    });
  }

  // Clamp
  const { floor, hardCap, ceiling } = specialtyBase;
  const rawRate = rate;
  const clampedRate = Math.max(floor, Math.min(round(rawRate), hardCap));
  const isAboveCeiling = clampedRate > ceiling;

  if (round(rawRate) !== clampedRate) {
    breakdown.push({
      factor: round(rawRate) > hardCap ? "Hard cap applied" : "Floor enforced",
      multiplier: null,
      flatBonus: null,
      rationale: round(rawRate) > hardCap
        ? `Computed $${round(rawRate)} exceeded hard cap — clamped to $${hardCap}`
        : `Computed $${round(rawRate)} below floor — set to floor $${floor}`,
    });
  }

  // Agency equivalent (what agencies bill hospitals at ~28% margin)
  const agencyEquivalent = round(clampedRate / 0.72);

  // Build rationale string
  const keyDrivers = breakdown
    .filter((b) => b.multiplier !== null && b.multiplier !== 1.0)
    .map((b) => b.factor)
    .join(", ");

  const rationale = [
    `${SPECIALTY_DISPLAY_NAMES[specialty]}.`,
    keyDrivers ? `Key drivers: ${keyDrivers}.` : "Baseline rate — no premium factors.",
    isAboveCeiling ? `Rate is above standard ceiling ($${ceiling}) but within hard cap ($${hardCap}).` : "",
    "Direct placement — physician receives 100%, no agency margin retained.",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    specialty,
    compensationModel,
    rateUnit,
    baseRate: floor,
    recommendedRate: clampedRate,
    agencyEquivalent,
    breakdown,
    rationale,
    isAboveCeiling,
    holidayBonus,
  };
}
