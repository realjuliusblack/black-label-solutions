interface SectionLabelProps {
  children: React.ReactNode;
}

/**
 * Eyebrow label. Uppercase, tracked wide, gold.
 * Used above every major section title.
 */
export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="font-[family-name:var(--font-inter)] text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#C9A84C]/70 mb-5">
      {children}
    </p>
  );
}
