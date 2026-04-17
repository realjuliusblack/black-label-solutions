"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { label: "Case Study", href: "#lpu" },
  { label: "Approach", href: "#approach" },
  { label: "Engagement", href: "#engagements" },
  { label: "Brief", href: "#brief" },
];

/**
 * Minimal portfolio-scoped nav. Single CTA on the right.
 * Renders above the hero; becomes sticky with blur on scroll.
 */
export default function PortfolioNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0C0B09]/95 backdrop-blur-md border-b border-[#7A6528]/15"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5">
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#C9A84C] tracking-wide"
        >
          BLACK LABEL
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="font-[family-name:var(--font-inter)] text-sm text-[#C8C0B0]/55 hover:text-[#C9A84C] transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
          <a
            href="#brief"
            className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#060503] bg-[#C9A84C] hover:bg-[#E2C873] px-5 py-2.5 rounded-md transition-colors duration-200"
          >
            Request a brief
          </a>
        </div>
      </div>
    </nav>
  );
}
