"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "./SiteData";
import type { NavItem } from "@/types";

function DropdownMenu({ items }: { items: NavItem[] }) {
  return (
    <ul
      className="absolute top-full left-0 z-50 min-w-[220px] bg-white border border-[#e3e9f1] rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
    >
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="block px-4 py-2 text-sm text-[#5d6675] hover:bg-[#f5f9fc] hover:text-[#0c71c3] transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header
      className="w-full bg-white border-b border-[#e3e9f1] sticky top-0 z-40"
      role="banner"
    >
      {/* Top bar — logo + social */}
      <div className="container-site">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://asemuch.cl/wp-content/uploads/2026/05/80-ASEMUCH.png"
              alt="ASEMUCH"
              width={196}
              height={72}
              className="h-14 w-auto"
            />
          </Link>

          {/* Social icons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.facebook.com/asemuch.cl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#0c71c3] hover:text-[#2ea3f2] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/asemuchchileoficial/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#0c71c3] hover:text-[#2ea3f2] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Burger (mobile) */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block w-6 h-0.5 bg-[#0c2340] transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#0c2340] transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#0c2340] transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Navigation bar */}
      <nav
        className="bg-[#0c2340]"
        role="navigation"
        aria-label="Menú principal"
      >
        {/* Desktop nav */}
        <div className="container-site hidden md:block">
          <ul className="flex items-center gap-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-white hover:bg-[#0c71c3] transition-colors duration-150"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {item.label}
                  {item.children && (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 opacity-70">
                      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
                    </svg>
                  )}
                </Link>
                {item.children && <DropdownMenu items={item.children} />}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10">
            <ul className="py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    className="w-full text-left px-6 py-3 text-sm font-semibold text-white hover:bg-[#0c71c3] transition-colors flex items-center justify-between"
                    onClick={() =>
                      setOpenSubmenu(openSubmenu === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    {item.children && (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-3 h-3 transition-transform ${openSubmenu === item.label ? "rotate-180" : ""}`}
                      >
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  {item.children && openSubmenu === item.label && (
                    <ul className="bg-[#0a1f3c] border-t border-white/5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-10 py-2.5 text-sm text-white/80 hover:text-white hover:bg-[#0c71c3] transition-colors"
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
