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
    "inline-flex items-center justify-center px-8 py-3.5 font-[family-name:var(--font-inter)] font-semibold text-base tracking-wide transition-all duration-200 rounded-sm cursor-pointer";

  const variants = {
    primary:
      "bg-gold text-black hover:bg-gold-light active:bg-gold-hover",
    outline:
      "border border-gold-border text-gold hover:border-gold hover:text-gold-light bg-transparent",
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
