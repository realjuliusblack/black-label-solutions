import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import { getProspect, listProspectSlugs } from "@/lib/portfolio/prospects";

export async function generateStaticParams() {
  return listProspectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prospect = getProspect(slug);
  if (!prospect) {
    return { title: "Portfolio | Black Label Solutions" };
  }
  return {
    title: `Prepared for ${prospect.name} | Black Label Solutions`,
    description: `A permanent AI executive, installed. Portfolio prepared for ${prospect.name}.`,
    robots: { index: false, follow: false },
  };
}

export default async function ProspectPortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prospect = getProspect(slug);
  if (!prospect) notFound();
  return <PortfolioPage prospect={prospect} />;
}
