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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0C0B09]/95 backdrop-blur-md border-b border-[#7A6528]/15"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-5">
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
              className="font-[family-name:var(--font-inter)] text-sm text-[#C8C0B0]/50 hover:text-gold transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#diagnostic"
            className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#060503] bg-gold hover:bg-gold-light px-6 py-2.5 rounded-md transition-colors duration-200"
          >
            Free Diagnostic
          </a>
        </div>

        <button
          className="md:hidden text-gold"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0C0B09]/98 backdrop-blur-md border-t border-[#7A6528]/15 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-inter)] text-base text-[#C8C0B0]/70 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#diagnostic"
            onClick={() => setOpen(false)}
            className="font-[family-name:var(--font-inter)] text-base font-semibold text-[#060503] bg-gold px-5 py-2.5 rounded-md text-center"
          >
            Free Diagnostic
          </a>
        </div>
      )}
    </nav>
  );
}
