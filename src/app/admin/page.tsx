import Link from "next/link";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";

const cards = [
  {
    href: "/admin/noticias",
    title: "Noticias",
    description: "Crear y publicar noticias regionales.",
  },
  {
    href: "/admin/comunicados",
    title: "Comunicados",
    description: "Publicar comunicados con texto y archivos adjuntos.",
  },
  {
    href: "/admin/documentos",
    title: "Documentos",
    description: "Subir PDFs y gestionar documentos internos.",
  },
  {
    href: "/admin/convenios",
    title: "Convenios",
    description: "Administrar convenios locales del cliente.",
  },
];

export default async function AdminHomePage() {
  return (
    <ProtectedAdminPage>
      <section className="space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">Inicio</p>
          <h2
            className="mt-2 text-3xl font-extrabold text-[#0c2340]"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Panel de contenidos
          </h2>
          <p className="mt-2 text-sm text-[#5d6675]">
            Desde aquí podrás administrar noticias, comunicados, documentos y convenios en una sola cuenta.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-[#d9e6f5] bg-white p-6 transition-all hover:border-[#0c71c3]/40 hover:shadow-sm"
            >
              <h3
                className="text-lg font-bold text-[#0c2340]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-[#5d6675]">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </ProtectedAdminPage>
  );
}
