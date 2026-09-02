import Link from "next/link";

const NAV_ITEMS = [
  { href: "/admin", label: "Inicio" },
  { href: "/admin/noticias", label: "Noticias" },
  { href: "/admin/documentos", label: "Documentos" },
  { href: "/admin/convenios", label: "Convenios" },
];

export function AdminSidebar() {
  return (
    <aside className="rounded-2xl border border-[#d9e6f5] bg-white p-4">
      <nav className="space-y-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#0c2340] transition-colors hover:bg-[#f5f9fc] hover:text-[#0c71c3]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
