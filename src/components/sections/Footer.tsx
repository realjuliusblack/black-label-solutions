export default function Footer() {
  return (
    <footer className="bg-[#060503] px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-gold/80 tracking-wide">
          BLACK LABEL
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.35em] text-cream-dim/30 mt-2 uppercase">
          Solutions
        </p>
        <p className="font-[family-name:var(--font-inter)] text-sm text-gold/50 mt-5 italic">
          Excellence in Execution.
        </p>

        <div className="mt-12 border-t border-gold-border/15 pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-cream-dim/25 font-[family-name:var(--font-inter)]">
          <span>&copy; {new Date().getFullYear()} Black Label Solutions</span>
          <a href="#" className="hover:text-gold/50 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gold/50 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
