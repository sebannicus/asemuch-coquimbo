"use client";

import { useActionState } from "react";
import { communicationFileConfig } from "@/lib/communication-files";
import type { CommunicationFormState, CommunicationRecord } from "@/types/admin";
import { PublishButtons } from "./PublishButtons";
import { AdminPageHeader, FormError, FormStep, adminFileInputClassName, adminInputClassName } from "./ui";

const INITIAL_FORM_STATE: CommunicationFormState = { error: null };

interface CommunicationFormProps {
  action: (state: CommunicationFormState, formData: FormData) => Promise<CommunicationFormState>;
  communication?: CommunicationRecord | null;
}

export function CommunicationForm({ action, communication }: CommunicationFormProps) {
  const isEditing = Boolean(communication?.id);
  const [state, formAction] = useActionState(action, INITIAL_FORM_STATE);

  return (
    <section className="space-y-6">
      <AdminPageHeader
        backHref="/admin/comunicados"
        backLabel="← Volver a mis comunicados"
        title={isEditing ? "Editar comunicado" : "Escribir un comunicado"}
        description="Puedes escribir el comunicado, adjuntar un archivo (por ejemplo un PDF firmado) o hacer ambas cosas."
      />

      <form action={formAction} className="space-y-5" encType="multipart/form-data">
        {isEditing ? <input type="hidden" name="id" value={communication?.id} /> : null}
        {isEditing ? <input type="hidden" name="slug" value={communication?.slug ?? ""} /> : null}

        <FormStep number={1} title="Título del comunicado">
          <input name="title" required minLength={3} defaultValue={communication?.title ?? ""} className={adminInputClassName} aria-label="Título del comunicado" />
        </FormStep>

        <FormStep
          number={2}
          title="Texto del comunicado"
          optional
          hint="Si solo vas a adjuntar un archivo, puedes dejarlo vacío. Para separar párrafos, deja una línea en blanco."
        >
          <textarea
            name="content"
            rows={12}
            defaultValue={communication?.content ?? ""}
            className={`${adminInputClassName} leading-relaxed`}
            aria-label="Texto del comunicado"
          />
        </FormStep>

        <FormStep number={3} title="Archivo adjunto" optional hint="PDF, Word o Excel de hasta 4 MB.">
          {communication?.attachment_url ? (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-[#e1ebf6] bg-[#f5f9fc] px-5 py-4">
              <a href={communication.attachment_url} target="_blank" rel="noreferrer" className="text-lg font-bold text-[#0c71c3] hover:underline">
                📎 {communication.attachment_name || "Ver archivo actual"}
              </a>
              <label className="flex min-h-12 cursor-pointer items-center gap-3 text-lg text-[#3d4756]">
                <input type="checkbox" name="remove_attachment" className="h-6 w-6" /> Quitar este archivo
              </label>
            </div>
          ) : null}
          <label className="block">
            <span className="sr-only">Elegir archivo</span>
            <input name="attachment" type="file" accept={communicationFileConfig.accept} className={adminFileInputClassName} />
          </label>
          {communication?.attachment_url ? <p className="mt-2 text-base text-[#3d4756]">Si eliges otro archivo, reemplazará al actual.</p> : null}
        </FormStep>

        <FormStep
          number={4}
          title="Resumen corto"
          optional
          hint="Una frase que se ve en el listado de comunicados. Si lo dejas vacío, usamos el comienzo del texto."
        >
          <textarea name="excerpt" rows={2} defaultValue={communication?.excerpt ?? ""} className={adminInputClassName} aria-label="Resumen corto" />
        </FormStep>

        <FormError message={state.error} />

        <PublishButtons currentStatus={communication?.status} />
      </form>
    </section>
  );
}
