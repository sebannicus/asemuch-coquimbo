"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "🏠 Inicio" },
  { href: "/admin/noticias", label: "📰 Noticias" },
  { href: "/admin/comunicados", label: "📢 Comunicados" },
  { href: "/admin/documentos", label: "📄 Documentos" },
  { href: "/admin/convenios", label: "🤝 Convenios" },
  { href: "/admin/perfil", label: "🔑 Mi contraseña" },
  { href: "/admin/ayuda", label: "❓ Ayuda" },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-2xl border-2 border-[#e1ebf6] bg-white p-2 lg:sticky lg:top-6 lg:self-start lg:p-3">
      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-col">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-12 items-center rounded-lg px-3 lg:px-4 text-lg font-bold transition-colors ${
                active ? "bg-[#0c71c3] text-white" : "text-[#0c2340] hover:bg-[#f5f9fc] hover:text-[#0c71c3]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 items-center rounded-lg px-3 lg:px-4 text-lg font-bold text-[#3d4756] transition-colors hover:bg-[#f5f9fc] hover:text-[#0c71c3] lg:mt-2"
        >
          🌐 Ver el sitio
        </a>
      </nav>
    </aside>
  );
}
