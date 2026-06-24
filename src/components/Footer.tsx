import Link from "next/link";
import { NAV_ITEMS, CONTACT_INFO } from "./SiteData";

export default function Footer() {
  const footerLinks = NAV_ITEMS.filter((i) => i.href !== "/");

  return (
    <footer className="text-[#cdd8e6]" style={{ backgroundColor: "#0c2340" }} role="contentinfo">
      <div className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Col 1: Logo + descripción */}
          <div className="flex flex-col gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://asemuch.cl/wp-content/uploads/2024/12/Logo_ASEMUCH_PIE.png"
              alt="ASEMUCH"
              width={80}
              height={68}
              className="h-14 w-auto"
            />
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                Sede Región de Coquimbo
              </p>
              <p className="text-sm leading-relaxed text-[#cdd8e6]/80 mt-2 max-w-xs">
                Representamos y defendemos los derechos laborales de los
                funcionarios municipales de las 15 comunas de la IV Región de
                Coquimbo, con más de 80 años de historia gremial.
              </p>
            </div>
          </div>

          {/* Col 2: Nav links */}
          <div>
            <h4
              className="text-white font-bold text-sm uppercase tracking-wider mb-5"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Navegación
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#cdd8e6]/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contacto */}
          <div>
            <h4
              className="text-white font-bold text-sm uppercase tracking-wider mb-5"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Contacto
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-[#cdd8e6]/80">
              <li className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0 mt-0.5 text-[#0c71c3]">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span>{CONTACT_INFO.direccion}<br />{CONTACT_INFO.region}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0 text-[#0c71c3]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12 19.79 19.79 0 0 1 1.14 3.4 2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href={`tel:${CONTACT_INFO.telefono.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.telefono}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0 text-[#0c71c3]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0 text-[#0c71c3]">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{CONTACT_INFO.horario}</span>
              </li>
            </ul>
            <div className="flex gap-2 mt-5">
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0c71c3] flex items-center justify-center transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0c71c3] flex items-center justify-center transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#cdd8e6]/50">
          <span>© 2026 ASEMUCH · Sede Región de Coquimbo</span>
          <span>{CONTACT_INFO.direccion} · {CONTACT_INFO.email}</span>
        </div>
      </div>
    </footer>
  );
}
