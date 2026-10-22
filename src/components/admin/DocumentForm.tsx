"use client";

import { useActionState } from "react";
import { documentFileConfig } from "@/lib/document-files";
import type { ContentFormState, DocumentRecord } from "@/types/admin";
import { PublishButtons } from "./PublishButtons";
import { AdminPageHeader, FormError, FormStep, adminFileInputClassName, adminInputClassName } from "./ui";

const INITIAL_FORM_STATE: ContentFormState = { error: null };

const DOCUMENT_TYPES = ["Acta", "Circular", "Reglamento", "Estatuto", "Resolución", "Informe", "Otro"];

interface DocumentFormProps {
  action: (state: ContentFormState, formData: FormData) => Promise<ContentFormState>;
  document?: DocumentRecord | null;
}

export function DocumentForm({ action, document }: DocumentFormProps) {
  const isEditing = Boolean(document?.id);
  const [state, formAction] = useActionState(action, INITIAL_FORM_STATE);
  const currentType = document?.document_type ?? "";
  const typeOptions = currentType && !DOCUMENT_TYPES.includes(currentType) ? [currentType, ...DOCUMENT_TYPES] : DOCUMENT_TYPES;

  return (
    <section className="space-y-6">
      <AdminPageHeader
        backHref="/admin/documentos"
        backLabel="← Volver a mis documentos"
        title={isEditing ? "Editar documento" : "Subir un documento"}
        description="Actas, circulares, reglamentos u otros documentos en PDF. Al publicarlo aparece en la página Documentos del sitio."
      />

      <form action={formAction} className="space-y-5" encType="multipart/form-data">
        {isEditing ? <input type="hidden" name="id" value={document?.id} /> : null}
        {isEditing ? <input type="hidden" name="slug" value={document?.slug ?? ""} /> : null}

        <FormStep
          number={1}
          title="Archivo PDF"
          hint={isEditing ? "Elige un PDF nuevo solo si quieres reemplazar el actual. Máximo 4 MB." : "Elige el PDF desde tu computador. Máximo 4 MB."}
        >
          {document?.file_url ? (
            <a
              href={document.file_url}
              target="_blank"
              rel="noreferrer"
              className="mb-4 block rounded-2xl border-2 border-[#e1ebf6] bg-[#f5f9fc] px-5 py-4 text-lg font-bold text-[#0c71c3] hover:underline"
            >
              📄 {document.file_name || "Ver PDF actual"}
            </a>
          ) : null}
          <label className="block">
            <span className="sr-only">Elegir PDF</span>
            <input name="file" type="file" accept={documentFileConfig.accept} required={!document?.file_url} className={adminFileInputClassName} />
          </label>
        </FormStep>

        <FormStep number={2} title="Nombre del documento" hint="Por ejemplo: “Acta asamblea ordinaria marzo 2026”.">
          <input name="title" required minLength={3} defaultValue={document?.title ?? ""} className={adminInputClassName} aria-label="Nombre del documento" />
        </FormStep>

        <FormStep number={3} title="Tipo de documento">
          <select name="document_type" required defaultValue={currentType || "Acta"} className={adminInputClassName} aria-label="Tipo de documento">
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormStep>

        <FormStep number={4} title="Descripción breve" optional hint="Una frase sobre el contenido del documento.">
          <textarea name="summary" rows={2} defaultValue={document?.summary ?? ""} className={adminInputClassName} aria-label="Descripción breve" />
        </FormStep>

        <FormError message={state.error} />

        <PublishButtons currentStatus={document?.status} />
      </form>
    </section>
  );
}
