import Link from "next/link";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { requireAdminSession } from "@/lib/auth";
import { getContentCounts, type DashboardTable } from "@/lib/content/dashboard";

const ACTIONS: Array<{ table: DashboardTable; icon: string; label: string; newHref: string; listHref: string; listLabel: string }> = [
  { table: "news", icon: "📰", label: "Publicar una noticia", newHref: "/admin/noticias/new", listHref: "/admin/noticias", listLabel: "noticias" },
  { table: "communications", icon: "📢", label: "Publicar un comunicado", newHref: "/admin/comunicados/new", listHref: "/admin/comunicados", listLabel: "comunicados" },
  { table: "documents", icon: "📄", label: "Subir un documento PDF", newHref: "/admin/documentos/new", listHref: "/admin/documentos", listLabel: "documentos" },
  { table: "agreements", icon: "🤝", label: "Agregar un convenio", newHref: "/admin/convenios/new", listHref: "/admin/convenios", listLabel: "convenios" },
];

export default async function AdminHomePage() {
  await requireAdminSession();
  const counts = await getContentCounts();

  return (
    <ProtectedAdminPage>
      <section className="space-y-10">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0c2340] sm:text-4xl" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
            ¿Qué quieres hacer hoy?
          </h2>
          <p className="mt-2 text-lg text-[#3d4756]">
            Elige una opción. Si tienes dudas, abre la{" "}
            <Link href="/admin/ayuda" className="font-bold text-[#0c71c3] underline">
              Ayuda
            </Link>
            .
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {ACTIONS.map((action) => (
            <Link
              key={action.newHref}
              href={action.newHref}
              className="flex min-h-28 items-center gap-5 rounded-3xl border-2 border-[#b9cde3] bg-white p-6 transition hover:border-[#0c71c3] hover:bg-[#eef5fc] focus:outline-none focus:ring-4 focus:ring-[#0c71c3]/30"
            >
              <span className="text-5xl" aria-hidden="true">
                {action.icon}
              </span>
              <span className="text-2xl font-extrabold text-[#0c2340]">{action.label}</span>
            </Link>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-[#0c2340]">Ver o cambiar lo que ya está</h3>
          <ul className="mt-4 divide-y-2 divide-[#eef4fb] rounded-3xl border-2 border-[#e1ebf6] bg-white">
            {ACTIONS.map((action) => {
              const count = counts?.[action.table];

              return (
                <li key={action.listHref}>
                  <Link
                    href={action.listHref}
                    className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-6 py-4 text-xl font-bold text-[#0c2340] hover:bg-[#f5f9fc] hover:text-[#0c71c3]"
                  >
                    <span>
                      Mis {action.listLabel}
                      {count ? (
                        <span className="ml-3 text-lg font-semibold text-[#3d4756]">
                          {count.published} publicados{count.draft ? ` · ${count.draft} sin publicar` : ""}
                        </span>
                      ) : null}
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </ProtectedAdminPage>
  );
}
