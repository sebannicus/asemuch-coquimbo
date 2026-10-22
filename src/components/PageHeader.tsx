import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <section
      className="relative py-5 lg:py-6 overflow-hidden"
      style={{
        background: "linear-gradient(120deg, #0a1f3c 0%, #0c2340 55%, #10498a 100%)",
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 container-site">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="motion-enter flex items-center gap-2 mb-1.5 text-xs text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title */}
        <h1
          data-title-reveal
          className="text-2xl lg:text-3xl font-extrabold text-white leading-tight"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="motion-enter motion-enter-delay-2 mt-1 text-white/70 text-sm max-w-2xl">{subtitle}</p>
        )}

        {/* Accent line */}
        <div className="motion-accent mt-3 w-12 h-1 rounded-full bg-[#0c71c3]" />
      </div>
    </section>
  );
}
