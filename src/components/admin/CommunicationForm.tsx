"use client";

import Link from "next/link";
import { useActionState } from "react";
import { communicationFileConfig } from "@/lib/communication-files";
import type { CommunicationFormState, CommunicationRecord } from "@/types/admin";
import { SubmitButton } from "./SubmitButton";

const INITIAL_FORM_STATE: CommunicationFormState = { error: null };

interface CommunicationFormProps {
  action: (state: CommunicationFormState, formData: FormData) => Promise<CommunicationFormState>;
  communication?: CommunicationRecord | null;
  title: string;
  description: string;
}

export function CommunicationForm({ action, communication, title, description }: CommunicationFormProps) {
  const isEditing = Boolean(communication?.id);
  const [state, formAction] = useActionState(action, INITIAL_FORM_STATE);

  return (
    <section className="space-y-6 rounded-3xl border border-[#d9e6f5] bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">Comunicados</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#0c2340]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#5d6675]">{description}</p>
        </div>
        <Link href="/admin/comunicados" className="inline-flex rounded-xl border border-[#d9e6f5] px-4 py-2 text-sm font-semibold text-[#0c2340] transition-colors hover:border-[#0c71c3] hover:text-[#0c71c3]">
          Volver al listado
        </Link>
      </div>

      <form action={formAction} className="space-y-5" encType="multipart/form-data">
        {isEditing ? <input type="hidden" name="id" value={communication?.id} /> : null}

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
            Título
            <input name="title" required minLength={3} defaultValue={communication?.title ?? ""} className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]" />
          </label>
          <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
            Enlace
            <input name="slug" defaultValue={communication?.slug ?? ""} placeholder="se-autogenera-si-lo-dejas-vacio" className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]" />
          </label>
        </div>

        <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
          Resumen
          <textarea name="excerpt" required minLength={10} rows={3} defaultValue={communication?.excerpt ?? ""} className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]" />
        </label>

        <label className="space-y-2 text-sm font-semibold text-[#0c2340]">
          Texto del comunicado
          <textarea name="content" rows={14} defaultValue={communication?.content ?? ""} placeholder="Redacta aquí el comunicado. Si solo adjuntarás un archivo, este campo puede quedar vacío." className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]" />
        </label>

        <section className="space-y-3 rounded-3xl border border-[#d9e6f5] bg-[#f5f9fc] p-5">
          <div>
            <h3 className="text-lg font-extrabold text-[#0c2340]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>Archivo adjunto</h3>
            <p className="mt-1 text-sm text-[#5d6675]">Opcional: PDF, Word o Excel de hasta 10 MB.</p>
          </div>
          {communication?.attachment_url ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#d9e6f5] bg-white px-4 py-3 text-sm">
              <a href={communication.attachment_url} target="_blank" rel="noreferrer" className="font-semibold text-[#0c71c3] hover:underline">{communication.attachment_name || "Ver archivo actual"}</a>
              <label className="flex items-center gap-2 text-[#5d6675]"><input type="checkbox" name="remove_attachment" /> Quitar archivo</label>
            </div>
          ) : null}
          <input name="attachment" type="file" accept={communicationFileConfig.accept} className="w-full rounded-2xl border border-dashed border-[#8eb9df] bg-white px-4 py-3 text-sm text-[#0c2340] file:mr-3 file:rounded-xl file:border-0 file:bg-[#0c71c3] file:px-3 file:py-2 file:font-semibold file:text-white" />
        </section>

        {state.error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">{state.error}</p> : null}

        <div className="grid gap-5 md:grid-cols-[1fr_220px]">
          <p className="self-center text-sm text-[#5d6675]">Puedes publicar con texto, archivo adjunto o ambos. El comunicado aparecerá separado de las noticias regionales.</p>
          <label className="space-y-2 text-sm font-semibold text-[#0c2340]">Estado
            <select name="status" defaultValue={communication?.status ?? "draft"} className="w-full rounded-2xl border border-[#d9e6f5] px-4 py-3 text-sm font-normal text-[#0c2340] outline-none transition-colors focus:border-[#0c71c3]"><option value="draft">Borrador</option><option value="published">Publicado</option></select>
          </label>
        </div>

        <SubmitButton label={isEditing ? "Guardar comunicado" : "Crear comunicado"} pendingLabel="Guardando comunicado..." />
      </form>
    </section>
  );
}
