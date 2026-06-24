"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, CONTACT_INFO } from "./SiteData";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full sticky top-0 z-40" role="banner">
      {/* Top stripe — sede regional badge */}
      <div className="bg-[#0a1f3c] border-b border-white/10">
        <div className="container-site flex items-center justify-between py-1.5">
          <p className="text-xs text-white/60">
            <span className="text-[#2ea3f2] font-semibold">ASEMUCH</span>
            {" "}· Sede Región de Coquimbo
          </p>
          <div className="hidden sm:flex items-center gap-4 text-xs text-white/60">
            <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
              {CONTACT_INFO.email}
            </a>
            <span className="opacity-30">|</span>
            <span>{CONTACT_INFO.horario}</span>
          </div>
        </div>
      </div>

      {/* Logo bar */}
      <div className="bg-white border-b border-[#e3e9f1]">
        <div className="container-site flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://asemuch.cl/wp-content/uploads/2026/05/80-ASEMUCH.png"
              alt="ASEMUCH"
              width={160}
              height={58}
              className="h-12 w-auto"
            />
            <div className="hidden sm:block border-l border-[#e3e9f1] pl-3">
              <p className="text-xs font-bold text-[#0c2340] leading-tight">
                Sede Regional
              </p>
              <p className="text-xs text-[#0c71c3] font-semibold leading-tight">
                Región de Coquimbo
              </p>
            </div>
          </Link>

          {/* Social + burger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-[#f5f9fc] hover:bg-[#0c71c3] hover:text-white text-[#0c71c3] flex items-center justify-center transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-[#f5f9fc] hover:bg-[#0c71c3] hover:text-white text-[#0c71c3] flex items-center justify-center transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#f5f9fc] transition-colors"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`block w-5 h-0.5 bg-[#0c2340] transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#0c2340] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#0c2340] transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="bg-[#0c2340]" role="navigation" aria-label="Menú principal">
        {/* Desktop */}
        <div className="container-site hidden md:block">
          <ul className="flex items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              if (item.highlight) {
                return (
                  <li key={item.href} className="ml-2">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1.5 my-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                        isActive
                          ? "bg-white text-[#0c71c3]"
                          : "bg-[#0c71c3] text-white hover:bg-[#2ea3f2]"
                      }`}
                      style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                        <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                      </svg>
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-semibold transition-colors duration-150 border-b-2 ${
                      isActive
                        ? "text-white border-[#0c71c3] bg-white/5"
                        : "text-white/80 border-transparent hover:text-white hover:bg-[#0c71c3]"
                    }`}
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10">
            <ul className="py-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                if (item.highlight) {
                  return (
                    <li key={item.href} className="px-4 py-2">
                      <Link
                        href={item.href}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0c71c3] text-white text-sm font-bold"
                        onClick={() => setMenuOpen(false)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                          <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                        </svg>
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-6 py-3 text-sm font-semibold transition-colors ${
                        isActive ? "text-white bg-[#0c71c3]" : "text-white/80 hover:text-white hover:bg-[#0c71c3]"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
