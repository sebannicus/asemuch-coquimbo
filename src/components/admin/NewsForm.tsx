import Link from "next/link";
import type { NewsRecord } from "@/types/admin";
import { SubmitButton } from "./SubmitButton";

interface NewsFormProps {
  action: (formData: FormData) => Promise<void>;
  news?: Partial<NewsRecord> | null;
  title: string;
  description: string;
  isFallback?: boolean;
}

export function NewsForm({
  action,
  news,
  title,
  description,
  isFallback = false,
}: NewsFormProps) {
  const isEditing = Boolean(news?.id);

  return (
    <section className="space-y-6 rounded-3xl border border-[#d9e6f5] bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">
            Noticias
          </p>
          <h2
            className="mt-2 text-3xl font-extrabold text-[#0c2340]"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#5d6675]">{description}</p>
        </div>
        <Link
          href="/admin/noticias"
          className="inline-flex rounded-xl border border-[#d9e6f5] px-4 py-2 text-sm font-semibold text-[#0c2340] transition-colors hover:border-[#0c71c3] hover:text-[#0c71c3]"
        >
          Volver al listado
        </Link>
      </div>

      {isFallback ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          La noticia que ves es una referencia temporal del sitio actual. Para editar y guardar cambios reales, primero hay que conectar Supabase y crear la tabla.
        </div>
      ) : null}

      <form action={action} className="space-y-5">
        {isEditing ? <input type="hidden" name="id" defaultValue={news?.id} /> : null}

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
            Título
            <input
              name="title"
              required
              minLength={3}
              defaultValue={news?.title ?? ""}
              className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
            Slug
            <input
              name="slug"
              defaultValue={news?.slug ?? ""}
              placeholder="se-autogenera-si-lo-dejas-vacio"
              className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
          Resumen
          <textarea
            name="excerpt"
            required
            minLength={10}
            rows={3}
            defaultValue={news?.excerpt ?? ""}
            className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
          Imagen destacada
          <input
            name="featured_image_url"
            type="url"
            defaultValue={news?.featured_image_url ?? ""}
            placeholder="https://..."
            className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]"
          />
        </label>

        <div className="grid gap-5 md:grid-cols-[1fr_220px]">
          <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
            Contenido
            <textarea
              name="content"
              required
              minLength={20}
              rows={14}
              defaultValue={news?.content ?? ""}
              className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
            Estado
            <select
              name="status"
              defaultValue={news?.status ?? "draft"}
              className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <SubmitButton
            label={isEditing ? "Guardar noticia" : "Crear noticia"}
            pendingLabel={isEditing ? "Guardando noticia..." : "Creando noticia..."}
          />
          <p className="text-sm text-[#5d6675]">
            {isFallback
              ? "Esta vista deja listo el formulario y la estructura de trabajo."
              : "Al publicar, la noticia quedará disponible también en la portada y en la sección de noticias."}
          </p>
        </div>
      </form>
    </section>
  );
}
