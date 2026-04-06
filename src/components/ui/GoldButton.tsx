interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
}

export default function GoldButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: GoldButtonProps) {
  const base =
    "inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] font-[family-name:var(--font-inter)] font-semibold text-[15px] tracking-wide transition-all duration-300 rounded-md cursor-pointer active:scale-[0.98]";

  const variants = {
    primary:
      "bg-gold text-[#060503] hover:bg-gold-light hover:shadow-[0_0_30px_rgba(201,168,76,0.15)] active:bg-gold-hover",
    outline:
      "border border-gold-border/50 text-gold/80 hover:border-gold/60 hover:text-gold bg-transparent",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
