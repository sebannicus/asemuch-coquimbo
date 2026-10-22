import Link from "next/link";

// Componentes base del panel. Pensados para personas mayores: letra grande,
// alto contraste, objetivos de clic amplios y una sola idea por bloque.

export const adminInputClassName =
  "w-full rounded-lg border-2 border-[#b9cde3] bg-white px-4 py-3.5 text-lg text-[#0c2340] outline-none transition placeholder:text-[#6b7686] focus:border-[#0c71c3] focus:ring-4 focus:ring-[#0c71c3]/20";

export const adminFileInputClassName =
  "block w-full cursor-pointer rounded-lg border-2 border-dashed border-[#8eb9df] bg-white px-4 py-4 text-base text-[#0c2340] file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#0c71c3] file:px-5 file:py-3 file:text-base file:font-bold file:text-white hover:border-[#0c71c3]";

export const adminPrimaryButtonClassName =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[#0c71c3] px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-[#095a9c] focus:outline-none focus:ring-4 focus:ring-[#0c71c3]/30 disabled:cursor-not-allowed disabled:opacity-60";

export const adminSecondaryButtonClassName =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border-2 border-[#0c71c3] bg-white px-6 py-3 text-lg font-bold text-[#0c71c3] transition-colors hover:bg-[#eef5fc] focus:outline-none focus:ring-4 focus:ring-[#0c71c3]/30 disabled:cursor-not-allowed disabled:opacity-60";

export function AdminPageHeader({
  title,
  description,
  backHref,
  backLabel = "← Volver",
  action,
}: {
  title: string;
  description?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      {backHref ? (
        <Link href={backHref} className="inline-flex min-h-12 items-center text-lg font-bold text-[#0c71c3] hover:underline">
          {backLabel}
        </Link>
      ) : null}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0c2340] sm:text-4xl" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
            {title}
          </h2>
          {description ? <p className="mt-2 max-w-3xl text-lg leading-relaxed text-[#3d4756]">{description}</p> : null}
        </div>
        {action}
      </div>
    </div>
  );
}

export function FormStep({
  number,
  title,
  hint,
  optional = false,
  children,
}: {
  number: number;
  title: string;
  hint?: React.ReactNode;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-3xl border-2 border-[#e1ebf6] bg-white p-5 sm:p-6">
      <legend className="sr-only">{title}</legend>
      <div className="mb-4 flex items-start gap-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0c71c3] text-lg font-extrabold text-white"
          aria-hidden="true"
        >
          {number}
        </span>
        <div>
          <p className="text-xl font-extrabold text-[#0c2340]">
            {title}
            {optional ? <span className="ml-2 text-base font-semibold text-[#6b7686]">(opcional)</span> : null}
          </p>
          {hint ? <p className="mt-1 text-base leading-relaxed text-[#3d4756]">{hint}</p> : null}
        </div>
      </div>
      {children}
    </fieldset>
  );
}

export function FormError({ message }: { message: string | null | undefined }) {
  if (!message) {
    return null;
  }

  return (
    <div role="alert" className="rounded-2xl border-2 border-rose-300 bg-rose-50 px-5 py-4 text-lg font-semibold text-rose-900">
      ⚠️ {message}
    </div>
  );
}
