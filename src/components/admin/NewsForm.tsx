"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { newsImageConfig, validateNewsImageFiles } from "@/lib/news-images";
import type { NewsFormState, NewsImageRecord, NewsRecord } from "@/types/admin";
import { SubmitButton } from "./SubmitButton";

interface NewsFormProps {
  action: (state: NewsFormState, formData: FormData) => Promise<NewsFormState>;
  news?: Partial<NewsRecord> | null;
  title: string;
  description: string;
  isFallback?: boolean;
}

interface NewImagePreview {
  key: string;
  name: string;
  url: string;
}

const INITIAL_FORM_STATE: NewsFormState = { error: null };

function getFileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
}

function dedupeFiles(files: File[]) {
  const seen = new Set<string>();
  return files.filter((file) => {
    const key = getFileKey(file);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function NewsForm({
  action,
  news,
  title,
  description,
  isFallback = false,
}: NewsFormProps) {
  const isEditing = Boolean(news?.id);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);
  const [state, formAction] = useActionState(action, INITIAL_FORM_STATE);
  const [existingImages, setExistingImages] = useState<NewsImageRecord[]>(news?.news_images ?? []);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<NewImagePreview[]>([]);
  const [clientError, setClientError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function syncInputFiles(files: File[]) {
    if (!inputRef.current) {
      return;
    }

    const transfer = new DataTransfer();
    files.forEach((file) => transfer.items.add(file));
    inputRef.current.files = transfer.files;
  }

  function replaceSelectedFiles(files: File[]) {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    const previews = files.map((file) => ({
      key: getFileKey(file),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    previewUrlsRef.current = previews.map((preview) => preview.url);
    setSelectedFiles(files);
    setNewImagePreviews(previews);
    syncInputFiles(files);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const incomingFiles = Array.from(event.currentTarget.files ?? []);
    if (!incomingFiles.length) {
      syncInputFiles(selectedFiles);
      return;
    }

    const nextFiles = dedupeFiles([...selectedFiles, ...incomingFiles]);
    const validation = validateNewsImageFiles(
      nextFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
      existingImages.length,
    );

    if (!validation.success) {
      setClientError(validation.message);
      syncInputFiles(selectedFiles);
      return;
    }

    setClientError(null);
    replaceSelectedFiles(nextFiles);
  }

  function removeExistingImage(imageId: string) {
    setClientError(null);
    setExistingImages((current) => current.filter((image) => image.id !== imageId));
  }

  function removeSelectedFile(fileKey: string) {
    setClientError(null);
    replaceSelectedFiles(selectedFiles.filter((file) => getFileKey(file) !== fileKey));
  }

  const totalImageCount = existingImages.length + selectedFiles.length;

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

      <form action={formAction} className="space-y-5" encType="multipart/form-data">
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

        <section className="space-y-4 rounded-3xl border border-[#d9e6f5] bg-[#f5f9fc] p-5">
          <div className="space-y-1">
            <h3
              className="text-lg font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Imagenes de la noticia
            </h3>
            <p className="text-sm text-[#5d6675]">
              Sube hasta {newsImageConfig.limit} imagenes JPG, PNG o WebP de maximo 5 MB. La primera imagen visible quedara como portada.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
              Subir desde mi computador
              <input
                ref={inputRef}
                name="news_images"
                type="file"
                accept={newsImageConfig.allowedTypes.join(",")}
                multiple
                onChange={handleFileChange}
                className="w-full rounded-2xl border border-dashed border-[#8eb9df] bg-white px-4 py-3 text-sm font-normal text-[#0c2340] file:mr-3 file:rounded-xl file:border-0 file:bg-[#0c71c3] file:px-3 file:py-2 file:font-semibold file:text-white"
              />
            </label>

            <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
              Portada por enlace externo
              <input
                name="featured_image_url"
                type="url"
                defaultValue={news?.featured_image_url ?? ""}
                placeholder="https://..."
                className="w-full rounded-2xl border border-[#d9e6f5] bg-white px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]"
              />
              <span className="block text-xs font-normal text-[#5d6675]">
                Se usa solo si no dejas una galeria cargada.
              </span>
            </label>
          </div>

          {clientError || state.error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
              {clientError ?? state.error}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3 text-sm text-[#5d6675]">
            <span>{totalImageCount} imagen(es) lista(s) para esta noticia.</span>
            <span>La portada es siempre la primera miniatura visible.</span>
          </div>

          {existingImages.map((image) => (
            <input key={image.id} type="hidden" name="existing_image_ids" value={image.id} />
          ))}

          {totalImageCount ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {existingImages.map((image, index) => (
                <article
                  key={image.id}
                  className="overflow-hidden rounded-2xl border border-[#d9e6f5] bg-white"
                >
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${image.image_url}')` }}
                    role="img"
                    aria-label={`Imagen existente ${index + 1}`}
                  />
                  <div className="space-y-2 p-4">
                    <p className="text-sm font-semibold text-[#0c2340]">
                      {index === 0 ? "Portada actual" : `Galeria ${index + 1}`}
                    </p>
                    <p className="truncate text-xs text-[#5d6675]">{image.image_url}</p>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(image.id)}
                      className="text-sm font-semibold text-rose-700 transition-colors hover:text-rose-500"
                    >
                      Quitar
                    </button>
                  </div>
                </article>
              ))}

              {newImagePreviews.map((preview, index) => (
                <article
                  key={preview.key}
                  className="overflow-hidden rounded-2xl border border-[#d9e6f5] bg-white"
                >
                  <div
                    className="aspect-[4/3] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${preview.url}')` }}
                    role="img"
                    aria-label={`Nueva imagen ${index + 1}`}
                  />
                  <div className="space-y-2 p-4">
                    <p className="text-sm font-semibold text-[#0c2340]">
                      {existingImages.length + index === 0 ? "Portada nueva" : `Nueva imagen ${existingImages.length + index + 1}`}
                    </p>
                    <p className="truncate text-xs text-[#5d6675]">{preview.name}</p>
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(preview.key)}
                      className="text-sm font-semibold text-rose-700 transition-colors hover:text-rose-500"
                    >
                      Quitar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#c7dbef] bg-white px-4 py-5 text-sm text-[#5d6675]">
              Aun no has agregado imagenes. Si publicas sin galeria, se usara solo la portada por enlace externo.
            </div>
          )}
        </section>

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
              : "Al publicar, la noticia quedara disponible tambien en la portada y en la seccion de noticias."}
          </p>
        </div>
      </form>
    </section>
  );
}
