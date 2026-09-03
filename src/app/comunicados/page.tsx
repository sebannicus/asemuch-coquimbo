import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getPublishedCommunications } from "@/lib/content/communications";

export const metadata: Metadata = {
  title: "Comunicados",
  description: "Comunicados oficiales de ASEMUCH Sede Región de Coquimbo.",
};

export default async function ComunicadosPage() {
  const communications = await getPublishedCommunications();

  return (
    <main>
      <PageHeader title="Comunicados" subtitle="Pronunciamientos y comunicados oficiales de ASEMUCH Sede Región de Coquimbo." breadcrumbs={[{ label: "Comunicados" }]} />
      <section className="bg-[#f5f9fc] py-16">
        <div className="container-site">
          <div className="mb-6 rounded-xl border border-[#e3e9f1] bg-white p-4 text-sm text-[#5d6675]">Aquí encontrarás los comunicados publicados por ASEMUCH Coquimbo.</div>
          {communications.length ? <div className="flex flex-col gap-3">
            {communications.map((communication) => <article key={communication.id} className="flex items-start gap-4 rounded-2xl border border-[#e3e9f1] bg-white p-5 transition-all hover:border-[#0c71c3]/40 hover:shadow-sm">
              <div className="w-1 shrink-0 self-stretch rounded-full bg-[#0c71c3]" />
              <div className="min-w-0 flex-1"><p className="mb-1 text-xs text-[#5d6675]">{communication.date}</p><h2 className="mb-1 text-lg font-bold leading-snug text-[#0c2340]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}><Link href={communication.href} className="transition-colors hover:text-[#0c71c3]">{communication.title}</Link></h2><p className="text-sm leading-relaxed text-[#5d6675]">{communication.excerpt}</p>{communication.attachmentUrl ? <a href={communication.attachmentUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-semibold text-[#0c71c3] hover:underline">Descargar {communication.attachmentName || "archivo adjunto"}</a> : null}</div>
              <Link href={communication.href} className="shrink-0 text-sm font-semibold text-[#0c71c3] hover:underline">Leer</Link>
            </article>)}
          </div> : <div className="rounded-2xl border border-dashed border-[#c7dbef] bg-white px-6 py-14 text-center text-sm text-[#5d6675]">Aún no hay comunicados publicados.</div>}
        </div>
      </section>
    </main>
  );
}
