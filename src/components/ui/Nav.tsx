"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Midas", href: "#meet-midas" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Customize", href: "#customize" },
  { label: "Diagnostic", href: "#diagnostic" },
  { label: "FAQ", href: "#faq" },
];

const luxuryEase = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0C0B09]/95 backdrop-blur-md border-b border-[#7A6528]/15"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5">
          <a
            href="#"
            className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-gold tracking-wide relative z-[60]"
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
            className="md:hidden relative z-[60] w-12 h-12 flex items-center justify-center -mr-2 active:scale-95 transition-transform"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="text-gold" size={22} />
            ) : (
              <Menu className="text-gold" size={22} />
            )}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className="fixed inset-0 z-[55] md:hidden bg-[#060503]/[0.98] backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-7">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 + i * 0.06,
                    ease: luxuryEase,
                  }}
                  className="font-[family-name:var(--font-cormorant)] text-[2rem] font-bold text-[#F5F0E8]/80 active:text-gold transition-colors min-h-[48px] flex items-center"
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.a
                href="#diagnostic"
                onClick={close}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.05 + links.length * 0.06,
                  ease: luxuryEase,
                }}
                className="mt-6 font-[family-name:var(--font-inter)] text-base font-semibold text-[#060503] bg-gold active:bg-gold-light px-10 py-4 rounded-md min-h-[48px] flex items-center active:scale-[0.98] transition-all"
              >
                Free Diagnostic
              </motion.a>
            </nav>

            {/* Decorative gold accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: luxuryEase }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-16 font-[family-name:var(--font-inter)] text-[11px] text-gold/25 tracking-[0.3em] uppercase"
            >
              Excellence in Execution
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
