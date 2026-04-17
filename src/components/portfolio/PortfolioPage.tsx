import PortfolioNav from "./PortfolioNav";
import PortfolioAtmosphere from "./PortfolioAtmosphere";
import PortfolioHero from "./PortfolioHero";
import ProblemBlock from "./ProblemBlock";
import ThesisBlock from "./ThesisBlock";
import CaseStudyLPU from "./CaseStudyLPU";
import ApproachInstall from "./ApproachInstall";
import EngagementTiers from "./EngagementTiers";
import BriefCta from "./BriefCta";
import Footer from "@/components/sections/Footer";
import type { Prospect } from "@/lib/portfolio/prospects";

interface PortfolioPageProps {
  prospect?: Prospect | null;
}

/**
 * Single composed portfolio page, reused across /portfolio, /portfolio/lpu,
 * and /portfolio/for/[slug]. Optional prospect swaps the hero subject and
 * problem-section industry copy.
 */
export default function PortfolioPage({ prospect }: PortfolioPageProps) {
  return (
    <>
      <PortfolioAtmosphere />
      <PortfolioNav />
      <main className="relative z-10">
        <PortfolioHero
          prospectName={prospect?.name}
          subject={prospect?.subject}
        />
        <ProblemBlock industry={prospect?.industry} />
        <ThesisBlock />
        <CaseStudyLPU />
        <ApproachInstall />
        <EngagementTiers />
        <BriefCta />
      </main>
      <Footer />
    </>
  );
}
