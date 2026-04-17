/**
 * LPU case study metrics. Single source of truth.
 *
 * All numbers here trace to verified sources:
 *   - operators/active/lpu.md (revenue, certification, engine count)
 *   - knowledge/lessons/certification-engine*.md (cert detail)
 *   - projects/bls/installation/INSTALL.md (10-phase playbook)
 *
 * If a number changes, it changes here, once.
 * v1.1 will swap static values for a daily-report pull.
 */

export type Metric = {
  label: string;
  value: string;
  detail?: string;
};

export type BeforeAfterRow = {
  dimension: string;
  before: string;
  after: string;
};

export type TimelinePhase = {
  week: string;
  title: string;
  detail: string;
};

export type Engine = {
  id: string;
  name: string;
  role: string;
};

export type InstallPhase = {
  code: string;
  name: string;
  summary: string;
};

export const LPU_HEADLINE = {
  eyebrow: "Case Study",
  title: "The firm that replaced 50 recruiters with one AI clone.",
  subtitle:
    "Locums United is a physician-led locum tenens firm. Three people. A founder, a COO, a field director. They installed an AI Chief of Staff built in their founder's voice. It now runs the full recruitment pipeline.",
  clientLabel: "Locums United",
  industry: "Locum tenens physician staffing",
  operator: "The Top Bot",
  shipped: "2026-04-04",
};

export const LPU_HEADLINE_METRICS: Metric[] = [
  { label: "Gross Revenue", value: "$13M", detail: "Current run-rate" },
  { label: "Certified Tests Passed", value: "52 / 52", detail: "S-Tier, every engine" },
  { label: "Human Hours on Routine Pipeline", value: "0", detail: "Fully automated" },
  { label: "Engines Live", value: "5", detail: "Sourcing, JD, qualification, name clear, background" },
];

export const LPU_BEFORE_AFTER: BeforeAfterRow[] = [
  {
    dimension: "Pipeline throughput",
    before: "Manual scrape, 1 recruiter per source",
    after: "LocumSmart + Aya + LotusOne, scraped daily",
  },
  {
    dimension: "Time from job posted to candidate shortlist",
    before: "Days. Sometimes a week.",
    after: "Hours. Same business day.",
  },
  {
    dimension: "Human hours per placement",
    before: "High. Every stage touched by a person.",
    after: "Near zero. Humans only review exceptions.",
  },
  {
    dimension: "Recruiter headcount required",
    before: "Dozens. Scaling meant hiring.",
    after: "Three humans. Scaling means tuning prompts.",
  },
  {
    dimension: "Certification coverage",
    before: "No automated tests. Hope.",
    after: "52 of 52 tests passing. S-Tier.",
  },
  {
    dimension: "Founder as bottleneck",
    before: "Every decision waits for Ali.",
    after: "The Top Bot decides in Ali's voice. Ali reviews.",
  },
];

export const LPU_ENGINES: Engine[] = [
  { id: "wf-101c", name: "AI Job Sourcing", role: "Scrapes LocumSmart, Aya, LotusOne daily. Posts to Job Tracker." },
  { id: "wf-103", name: "JD Engine", role: "Generates compliant job descriptions. Publishes to Google Docs and the Sheet." },
  { id: "qual", name: "AI Qualification", role: "Scores CVs. Runs IPC calls. Routes candidates into the GHL pipeline." },
  { id: "nc", name: "AI Name Clear", role: "Verifies SAM.gov, NPDB, state license before submission." },
  { id: "bg", name: "AI Background Check", role: "Full credentialing pipeline. Flags exceptions for Ahmed." },
];

export const LPU_TIMELINE: TimelinePhase[] = [
  { week: "Week 0", title: "Intake", detail: "One session. We map the business, the team, and every workflow." },
  { week: "Week 2", title: "Identity + Data", detail: "Persona designed in the founder's voice. Data layer built. Credentials isolated." },
  { week: "Week 4", title: "First Engine Live", detail: "Job sourcing running daily. First human hour saved." },
  { week: "Week 8", title: "Full Pipeline Certified", detail: "All five engines shipped. 52 of 52 tests passing." },
  { week: "Week 12", title: "Handoff", detail: "Voice deployed. Slack channels live. The Top Bot reports directly to the founder." },
];

export const LPU_STAKES =
  "The traditional locum tenens model runs on spread. A facility pays the firm. The firm pays the physician less. The difference is the firm's margin, and the physician rarely sees the full picture. Locums United was founded to fight that model. Physician-led. Transparent pay. No hidden spread. The problem: the traditional model is also operationally heavy. Dozens of recruiters. Hundreds of calls. Thousands of emails. A three-person firm fighting an industry of fifty-person shops. The choice was: hire an army and become the thing you hate, or install an AI that never takes a spread.";

export const INSTALL_PHASES: InstallPhase[] = [
  { code: "01", name: "Intake", summary: "We map the business end to end. Workflows, people, tools, data, bottlenecks." },
  { code: "02", name: "Identity", summary: "The persona. Voice, tone, team, brand. Your AI Chief of Staff sounds like you." },
  { code: "03", name: "Project", summary: "Scope locked. Success criteria defined. Everything written down before a line of code." },
  { code: "04", name: "Data", summary: "Every data source identified, credentialed, and isolated to your account." },
  { code: "05", name: "Platform", summary: "Workflow engine, CRM, messaging, voice. Provisioned fresh in your name." },
  { code: "06", name: "Workflows", summary: "Each workflow built, tested against real data, certified before it ships." },
  { code: "07", name: "Voice", summary: "Inbound and outbound voice. The AI takes and makes calls in your persona." },
  { code: "08", name: "Sub-Agents", summary: "Specialized workers for the hard parts. Scraping, qualification, scoring, compliance." },
  { code: "09", name: "Validation", summary: "Black Label Certification. Adversarial testing. If it is not certified, it does not ship." },
  { code: "10", name: "Registry", summary: "Your AI Chief of Staff registered, documented, monitored. You get the keys." },
];

export const ENGAGEMENT_TIERS = [
  {
    code: "Pilot",
    title: "A single workflow, fully automated and certified, in 30 days.",
    detail: "We pick the one workflow bleeding the most hours. We ship it. You see the model work before you commit.",
  },
  {
    code: "Permanent Install",
    title: "A full AI Chief of Staff, custom built, deployed in 90 days.",
    detail: "The 10-phase install. Every workflow mapped. Voice deployed. Black Label certified. Your operator, reporting to you.",
  },
  {
    code: "Portfolio",
    title: "Multiple operators, one operating system, run at scale.",
    detail: "For groups and holding companies. One command center. Every company in the portfolio runs its own AI Chief of Staff.",
  },
];
