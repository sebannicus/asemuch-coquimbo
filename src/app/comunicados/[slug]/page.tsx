import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getCommunicationSlugs, getPublishedCommunicationBySlug } from "@/lib/content/communications";

export async function generateStaticParams() {
  return (await getCommunicationSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const communication = await getPublishedCommunicationBySlug(slug);
  return {
    title: communication?.title ?? "Comunicado",
    description: communication?.excerpt,
  };
}

export default async function ComunicadoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const communication = await getPublishedCommunicationBySlug(slug);

  if (!communication) {
    notFound();
  }

  return (
    <main>
      <PageHeader
        title={communication.title}
        breadcrumbs={[{ label: "Comunicados", href: "/comunicados" }, { label: "Comunicado" }]}
      />
      <section className="bg-white py-16">
        <div className="container-site">
          <article className="mx-auto max-w-3xl">
            <p className="mb-6 text-sm font-semibold text-[#0c71c3]">{communication.date} · ASEMUCH Coquimbo</p>
            {communication.content ? (
              <div className="space-y-4 text-base leading-relaxed text-[#5d6675]">
                {communication.content.split("\n\n").map((paragraph, index) => (
                  <p key={`${index}-${paragraph}`}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="text-base leading-relaxed text-[#5d6675]">Este comunicado fue publicado como archivo adjunto.</p>
            )}
            {communication.attachmentUrl ? (
              <a
                href={communication.attachmentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-xl bg-[#0c71c3] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2ea3f2]"
              >
                Descargar {communication.attachmentName || "archivo adjunto"}
              </a>
            ) : null}
            <div className="mt-10 border-t border-[#e3e9f1] pt-6">
              <Link href="/comunicados" className="text-sm font-semibold text-[#0c71c3] hover:underline">
                Volver a Comunicados
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
