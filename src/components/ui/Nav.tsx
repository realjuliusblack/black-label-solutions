"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Diagnostic", href: "#diagnostic" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gold-border/30"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-gold tracking-wide"
        >
          BLACK LABEL
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-inter)] text-sm text-[#A0A0A0] hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#diagnostic"
            className="font-[family-name:var(--font-inter)] text-sm font-semibold text-black bg-gold hover:bg-gold-light px-5 py-2 rounded-sm transition-colors"
          >
            Free Diagnostic
          </a>
        </div>

        <button
          className="md:hidden text-gold"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-md border-t border-gold-border/20 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-inter)] text-base text-[#E0E0E0] hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#diagnostic"
            onClick={() => setOpen(false)}
            className="font-[family-name:var(--font-inter)] text-base font-semibold text-black bg-gold px-5 py-2.5 rounded-sm text-center"
          >
            Free Diagnostic
          </a>
        </div>
      )}
    </nav>
  );
}
