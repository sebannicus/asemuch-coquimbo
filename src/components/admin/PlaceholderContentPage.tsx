import Link from "next/link";
import { EmptyState } from "./EmptyState";

interface PlaceholderContentPageProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  emptyTitle: string;
  emptyDescription: string;
}

export function PlaceholderContentPage({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  emptyTitle,
  emptyDescription,
}: PlaceholderContentPageProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-[#d9e6f5] bg-white p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">{eyebrow}</p>
          <h2
            className="mt-2 text-3xl font-extrabold text-[#0c2340]"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#5d6675]">{description}</p>
        </div>

        <Link
          href={ctaHref}
          className="inline-flex rounded-xl bg-[#0c71c3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2ea3f2]"
        >
          {ctaLabel}
        </Link>
      </div>

      <EmptyState title={emptyTitle} description={emptyDescription} />
    </section>
  );
}
