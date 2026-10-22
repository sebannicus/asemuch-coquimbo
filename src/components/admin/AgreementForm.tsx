"use client";

import { useActionState, useState } from "react";
import { agreementAssetConfig } from "@/lib/agreement-assets";
import { compressImage, setInputFiles } from "@/lib/compress-image";
import type { AgreementRecord, ContentFormState } from "@/types/admin";
import { PublishButtons } from "./PublishButtons";
import { AdminPageHeader, FormError, FormStep, adminFileInputClassName, adminInputClassName } from "./ui";

const INITIAL_FORM_STATE: ContentFormState = { error: null };

interface AgreementFormProps {
  action: (state: ContentFormState, formData: FormData) => Promise<ContentFormState>;
  agreement?: AgreementRecord | null;
}

export function AgreementForm({ action, agreement }: AgreementFormProps) {
  const isEditing = Boolean(agreement?.id);
  const [state, formAction] = useActionState(action, INITIAL_FORM_STATE);
  const [isOptimizing, setIsOptimizing] = useState(false);

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    setIsOptimizing(true);
    setInputFiles(input, [await compressImage(file)]);
    setIsOptimizing(false);
  }

  return (
    <section className="space-y-6">
      <AdminPageHeader
        backHref="/admin/convenios"
        backLabel="← Volver a mis convenios"
        title={isEditing ? "Editar convenio" : "Agregar un convenio"}
        description="Beneficios para los afiliados. Al publicarlo aparece en la página Convenios del sitio."
      />

      <form action={formAction} className="space-y-5" encType="multipart/form-data">
        {isEditing ? <input type="hidden" name="id" value={agreement?.id} /> : null}
        {isEditing ? <input type="hidden" name="slug" value={agreement?.slug ?? ""} /> : null}

        <FormStep number={1} title="Nombre de la empresa o convenio" hint="Por ejemplo: “Clínica Dental Jade”.">
          <input name="title" required minLength={3} defaultValue={agreement?.title ?? ""} className={adminInputClassName} aria-label="Nombre del convenio" />
        </FormStep>

        <FormStep number={2} title="¿Cuál es el beneficio?" hint="En una o dos frases. Por ejemplo: “15% de descuento en tratamientos para afiliados y su familia”.">
          <textarea name="summary" required minLength={10} rows={2} defaultValue={agreement?.summary ?? ""} className={adminInputClassName} aria-label="Beneficio" />
        </FormStep>

        <FormStep number={3} title="Más información" optional hint="Condiciones, dirección, teléfono y cómo acceder al beneficio.">
          <textarea name="details" rows={6} defaultValue={agreement?.details ?? ""} className={`${adminInputClassName} leading-relaxed`} aria-label="Más información" />
        </FormStep>

        <FormStep number={4} title="Imagen o logo" optional hint="Se ajusta sola al elegirla.">
          {agreement?.image_url ? (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-[#e1ebf6] bg-[#f5f9fc] p-4">
              <div
                className="h-20 w-32 rounded-lg bg-white bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${agreement.image_url}')` }}
                role="img"
                aria-label="Imagen actual del convenio"
              />
              <label className="flex min-h-12 cursor-pointer items-center gap-3 text-lg text-[#3d4756]">
                <input type="checkbox" name="remove_image" className="h-6 w-6" /> Quitar esta imagen
              </label>
            </div>
          ) : null}
          <label className="block">
            <span className="sr-only">Elegir imagen</span>
            <input name="image" type="file" accept={agreementAssetConfig.imageAccept} onChange={handleImageChange} className={adminFileInputClassName} />
          </label>
          {isOptimizing ? <p className="mt-3 text-lg font-semibold text-[#0c71c3]">Preparando la imagen, espera un momento...</p> : null}
        </FormStep>

        <FormStep
          number={5}
          title="Fechas y código"
          optional
          hint="Si pones una fecha de término, el convenio se quita solo del sitio cuando vence."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-lg font-semibold text-[#0c2340]">
              <span className="block">Vigente desde</span>
              <input name="valid_from" type="date" defaultValue={agreement?.valid_from ?? ""} className={adminInputClassName} />
            </label>
            <label className="space-y-2 text-lg font-semibold text-[#0c2340]">
              <span className="block">Vigente hasta</span>
              <input name="valid_until" type="date" defaultValue={agreement?.valid_until ?? ""} className={adminInputClassName} />
            </label>
            <label className="space-y-2 text-lg font-semibold text-[#0c2340]">
              <span className="block">Código de descuento</span>
              <input name="promo_code" defaultValue={agreement?.promo_code ?? ""} className={adminInputClassName} />
            </label>
          </div>
        </FormStep>

        <FormError message={state.error} />

        <PublishButtons
          currentStatus={agreement?.status}
          disabled={isOptimizing}
          busyLabel={isOptimizing ? "Espera a que termine de prepararse la imagen." : undefined}
        />
      </form>
    </section>
  );
}
