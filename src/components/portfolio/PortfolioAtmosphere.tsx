/**
 * Shared atmosphere layer: ambient gold glows, grid, grain.
 * Renders once at the top of every portfolio page.
 * Matches the Hero section pattern from the main site.
 */
export default function PortfolioAtmosphere() {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute -top-48 -left-48 w-[min(900px,120vw)] h-[min(900px,120vw)] rounded-full bg-[#C9A84C]/[0.05] blur-[160px]" />
      <div className="absolute -bottom-48 -right-48 w-[min(900px,120vw)] h-[min(900px,120vw)] rounded-full bg-[#C9A84C]/[0.04] blur-[160px]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
