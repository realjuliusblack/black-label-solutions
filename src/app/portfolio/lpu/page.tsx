import PortfolioPage from "@/components/portfolio/PortfolioPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locums United Case Study | Black Label Solutions",
  description:
    "How Locums United replaced 50 recruiters with one AI clone. Five engines. 52 of 52 certified tests. Zero human hours on routine pipeline.",
  openGraph: {
    title: "Locums United Case Study | Black Label Solutions",
    description:
      "How Locums United replaced 50 recruiters with one AI clone.",
    type: "article",
  },
};

export default function LpuCaseStudyPage() {
  return <PortfolioPage />;
}
