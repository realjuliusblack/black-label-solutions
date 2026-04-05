export default function Footer() {
  return (
    <footer className="bg-surface-deep px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-gold tracking-wide">
          BLACK LABEL
        </h3>
        <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.3em] text-[#A0A0A0] mt-2">
          SOLUTIONS
        </p>
        <p className="font-[family-name:var(--font-jetbrains)] text-sm text-gold mt-4">
          Excellence in Execution.
        </p>

        <div className="mt-10 border-t border-gold-border/30 pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-[#666666] font-[family-name:var(--font-inter)]">
          <span>&copy; {new Date().getFullYear()} Black Label Solutions</span>
          <a href="#" className="hover:text-gold transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gold transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
