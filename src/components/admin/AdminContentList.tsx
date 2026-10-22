import Link from "next/link";
import type { ContentStatus } from "@/types/admin";
import { ConfirmDeleteButton } from "./ConfirmDeleteButton";
import { StatusBadge } from "./StatusBadge";

export interface AdminContentListItem {
  id: string;
  title: string;
  description?: string | null;
  status: ContentStatus;
  meta?: React.ReactNode;
  editHref: string;
  publicHref?: string | null;
  publicLabel?: string;
}

export function AdminContentList({
  items,
  deleteAction,
  emptyText,
  newHref,
  newLabel,
}: {
  items: AdminContentListItem[];
  deleteAction: (formData: FormData) => Promise<void>;
  emptyText: string;
  newHref: string;
  newLabel: string;
}) {
  if (!items.length) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-[#b9cde3] bg-white px-6 py-12 text-center">
        <p className="text-xl text-[#3d4756]">{emptyText}</p>
        <Link
          href={newHref}
          className="mt-6 inline-flex min-h-14 items-center rounded-2xl bg-[#0c71c3] px-6 text-lg font-bold text-white hover:bg-[#095a9c]"
        >
          {newLabel}
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="rounded-3xl border-2 border-[#e1ebf6] bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-xl font-extrabold text-[#0c2340] sm:text-2xl">{item.title}</h3>
            <StatusBadge status={item.status} />
          </div>
          {item.description ? <p className="mt-2 line-clamp-2 text-lg text-[#3d4756]">{item.description}</p> : null}
          {item.meta ? <div className="mt-2 text-base text-[#3d4756]">{item.meta}</div> : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={item.editHref}
              className="inline-flex min-h-12 items-center rounded-lg bg-[#0c71c3] px-5 text-lg font-bold text-white hover:bg-[#095a9c]"
            >
              ✏️ Editar
            </Link>
            {item.publicHref && item.status === "published" ? (
              <a
                href={item.publicHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center rounded-lg border-2 border-[#b9cde3] px-5 text-lg font-bold text-[#0c2340] hover:border-[#0c71c3] hover:text-[#0c71c3]"
              >
                👁️ {item.publicLabel ?? "Ver en el sitio"}
              </a>
            ) : null}
            <form action={deleteAction}>
              <input type="hidden" name="id" value={item.id} />
              <ConfirmDeleteButton itemLabel={item.title} />
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
