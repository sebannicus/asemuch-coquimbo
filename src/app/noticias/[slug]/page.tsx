import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getNewsSlugs, getPublishedNewsBySlug } from "@/lib/content/news";

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedNewsBySlug(slug);
  return {
    title: article?.title ?? "Noticia",
    description: article?.excerpt,
  };
}

export default async function NoticiaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <PageHeader
        title={article.title}
        breadcrumbs={[{ label: "Noticias", href: "/noticias" }, { label: "Artículo" }]}
      />

      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-6 text-sm text-[#5d6675]">
              <span className="font-semibold text-[#0c71c3]">{article.date}</span>
              <span>·</span>
              <span>ASEMUCH Coquimbo</span>
            </div>

            {/* Image */}
            <div
              className="w-full rounded-2xl bg-cover bg-center mb-4"
              style={{ backgroundImage: `url('${article.imageUrl}')`, aspectRatio: "16/7" }}
              role="img"
              aria-label={article.title}
            />

            {article.images.length > 1 ? (
              <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {article.images.slice(1).map((image, index) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-2xl border border-[#e3e9f1] bg-cover bg-center"
                    style={{ backgroundImage: `url('${image.imageUrl}')`, aspectRatio: "4/3" }}
                    role="img"
                    aria-label={`${article.title} imagen ${index + 2}`}
                  />
                ))}
              </div>
            ) : null}

            {/* Content */}
            <div className="prose prose-sm max-w-none text-[#5d6675] space-y-4">
              {article.content.split("\n\n").map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-10 pt-6 border-t border-[#e3e9f1]">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 text-[#0c71c3] font-semibold hover:gap-3 transition-all text-sm"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 rotate-180">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
                </svg>
                Volver a Noticias
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
