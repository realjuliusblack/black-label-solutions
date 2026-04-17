import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Black Label Solutions",
  description:
    "A permanent AI executive, installed. The Locums United case study. Custom built. Certified. Deployed in 90 days. Excellence in Execution.",
  openGraph: {
    title: "Portfolio | Black Label Solutions",
    description:
      "A permanent AI executive, installed. The Locums United case study.",
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
