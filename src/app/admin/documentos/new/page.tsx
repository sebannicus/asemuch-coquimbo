import Link from "next/link";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";

export default async function AdminNuevoDocumentoPage() {
  return (
    <ProtectedAdminPage>
      <section className="space-y-6 rounded-3xl border border-[#d9e6f5] bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">Documentos</p>
            <h2
              className="mt-2 text-3xl font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Formulario en preparación
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#5d6675]">
              Dejé la ruta creada para que el siguiente tramo sea conectar subida de archivos y publicación.
            </p>
          </div>
          <Link
            href="/admin/documentos"
            className="inline-flex rounded-xl border border-[#d9e6f5] px-4 py-2 text-sm font-semibold text-[#0c2340] transition-colors hover:border-[#0c71c3] hover:text-[#0c71c3]"
          >
            Volver
          </Link>
        </div>
      </section>
    </ProtectedAdminPage>
  );
}
