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
      className="relative py-12 overflow-hidden"
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
          <nav className="flex items-center gap-2 mb-4 text-sm text-white/60">
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
          className="text-3xl lg:text-4xl font-extrabold text-white"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-white/70 text-base max-w-xl">{subtitle}</p>
        )}

        {/* Accent line */}
        <div className="mt-5 w-16 h-1 rounded-full bg-[#0c71c3]" />
      </div>
    </section>
  );
}
