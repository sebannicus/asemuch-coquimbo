"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { compressImages, setInputFiles } from "@/lib/compress-image";
import { newsImageConfig, validateNewsImageFiles } from "@/lib/news-images";
import type { NewsFormState, NewsImageRecord, NewsRecord } from "@/types/admin";
import { PublishButtons } from "./PublishButtons";
import { AdminPageHeader, FormError, FormStep, adminFileInputClassName, adminInputClassName } from "./ui";

interface NewsFormProps {
  action: (state: NewsFormState, formData: FormData) => Promise<NewsFormState>;
  news?: Partial<NewsRecord> | null;
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

export function NewsForm({ action, news, isFallback = false }: NewsFormProps) {
  const isEditing = Boolean(news?.id);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);
  const [state, formAction] = useActionState(action, INITIAL_FORM_STATE);
  const [existingImages, setExistingImages] = useState<NewsImageRecord[]>(news?.news_images ?? []);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<NewImagePreview[]>([]);
  const [clientError, setClientError] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

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
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const incomingFiles = Array.from(input.files ?? []);
    if (!incomingFiles.length) {
      return;
    }

    setIsOptimizing(true);
    const nextFiles = await compressImages(dedupeFiles(incomingFiles));
    setInputFiles(input, nextFiles);
    setIsOptimizing(false);

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
      input.value = "";
      replaceSelectedFiles([]);
      return;
    }

    setClientError(null);
    replaceSelectedFiles(nextFiles);
  }

  function removeExistingImage(imageId: string) {
    setClientError(null);
    setExistingImages((current) => current.filter((image) => image.id !== imageId));
  }

  function removeNewFile(key: string) {
    setClientError(null);
    const nextFiles = selectedFiles.filter((file) => getFileKey(file) !== key);
    if (inputRef.current) {
      setInputFiles(inputRef.current, nextFiles);
    }
    replaceSelectedFiles(nextFiles);
  }

  const gallery = [
    ...existingImages.map((image) => ({ key: image.id, url: image.image_url, onRemove: () => removeExistingImage(image.id) })),
    ...newImagePreviews.map((preview) => ({ key: preview.key, url: preview.url, onRemove: () => removeNewFile(preview.key) })),
  ];

  return (
    <section className="space-y-6">
      <AdminPageHeader
        backHref="/admin/noticias"
        backLabel="← Volver a mis noticias"
        title={isEditing ? "Editar noticia" : "Escribir una noticia"}
        description="Completa los pasos de arriba hacia abajo. Al final elige si la publicas o la guardas para después."
      />

      {isFallback ? (
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-5 py-4 text-lg text-amber-900">
          Esta noticia es solo de ejemplo: el panel todavía no está conectado a la base de datos.
        </div>
      ) : null}

      <form action={formAction} className="space-y-5" encType="multipart/form-data">
        {isEditing ? <input type="hidden" name="id" value={news?.id} /> : null}
        {isEditing ? <input type="hidden" name="slug" value={news?.slug ?? ""} /> : null}
        {existingImages.map((image) => (
          <input key={image.id} type="hidden" name="existing_image_ids" value={image.id} />
        ))}

        <FormStep number={1} title="Título de la noticia" hint="Una frase corta que diga de qué se trata.">
          <input name="title" required minLength={3} defaultValue={news?.title ?? ""} className={adminInputClassName} aria-label="Título de la noticia" />
        </FormStep>

        <FormStep
          number={2}
          title="Fotos"
          optional
          hint={`Puedes elegir hasta ${newsImageConfig.limit} fotos. La primera será la portada. Se achican solas para que suban rápido.`}
        >
          <label className="block">
            <span className="sr-only">Elegir fotos</span>
            <input
              ref={inputRef}
              name="news_images"
              type="file"
              accept={newsImageConfig.allowedTypes.join(",")}
              multiple
              onChange={handleFileChange}
              className={adminFileInputClassName}
            />
          </label>

          {isOptimizing ? <p className="mt-3 text-lg font-semibold text-[#0c71c3]">Preparando las fotos, espera un momento...</p> : null}
          {clientError ? <div className="mt-4"><FormError message={clientError} /></div> : null}

          {gallery.length ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {gallery.map((image, index) => (
                <article key={image.key} className="overflow-hidden rounded-2xl border-2 border-[#e1ebf6] bg-white">
                  <div
                    className="aspect-4/3 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${image.url}')` }}
                    role="img"
                    aria-label={`Foto ${index + 1}`}
                  />
                  <div className="flex items-center justify-between gap-3 p-4">
                    <p className="text-lg font-bold text-[#0c2340]">{index === 0 ? "⭐ Portada" : `Foto ${index + 1}`}</p>
                    <button
                      type="button"
                      onClick={image.onRemove}
                      className="min-h-12 rounded-lg border-2 border-rose-200 px-4 text-base font-bold text-rose-700 hover:bg-rose-50"
                    >
                      Quitar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-base text-[#3d4756]">Todavía no hay fotos. Si publicas sin fotos se usará una imagen genérica.</p>
          )}
        </FormStep>

        <FormStep number={3} title="Texto de la noticia" hint="Para separar párrafos, deja una línea en blanco entre ellos (presiona Enter dos veces).">
          <textarea
            name="content"
            required
            minLength={20}
            rows={12}
            defaultValue={news?.content ?? ""}
            className={`${adminInputClassName} leading-relaxed`}
            aria-label="Texto de la noticia"
          />
        </FormStep>

        <FormStep
          number={4}
          title="Resumen corto"
          optional
          hint="Una o dos frases que se ven en la portada. Si lo dejas vacío, usamos el comienzo del texto."
        >
          <textarea name="excerpt" rows={2} defaultValue={news?.excerpt ?? ""} className={adminInputClassName} aria-label="Resumen corto" />
        </FormStep>

        <FormError message={state.error} />

        <PublishButtons
          currentStatus={news?.status}
          disabled={isOptimizing}
          busyLabel={isOptimizing ? "Espera a que terminen de prepararse las fotos." : undefined}
        />
      </form>
    </section>
  );
}
