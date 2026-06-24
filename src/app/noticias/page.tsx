import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { NEWS_CARDS } from "@/components/SiteData";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Últimas noticias y comunicados de ASEMUCH Sede Región de Coquimbo.",
};

export default function NoticiasPage() {
  return (
    <main>
      <PageHeader
        title="Noticias Regionales"
        subtitle="Últimas novedades, comunicados y actividades de ASEMUCH en la Región de Coquimbo."
        breadcrumbs={[{ label: "Noticias" }]}
      />

      <section className="py-16" style={{ backgroundColor: "#f5f9fc" }}>
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS_CARDS.map((card) => (
              <article
                key={card.id}
                className="bg-white rounded-2xl overflow-hidden flex flex-col"
                style={{ border: "0.8px solid #e3e9f1", boxShadow: "rgba(12,35,64,0.06) 0px 2px 10px 0px" }}
              >
                <Link href={`/noticias/${card.href.split("/").pop()}`} className="block overflow-hidden">
                  <div
                    className="w-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
                    style={{ backgroundImage: `url('${card.imageUrl}')`, aspectRatio: "16/9" }}
                    role="img"
                    aria-label={card.title}
                  />
                </Link>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <span className="text-xs font-semibold text-[#0c71c3]">{card.date}</span>
                  <h2
                    className="text-[#0c2340] font-bold text-base leading-snug"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    <Link href={`/noticias/${card.href.split("/").pop()}`} className="hover:text-[#0c71c3] transition-colors">
                      {card.title}
                    </Link>
                  </h2>
                  <p className="text-[#5d6675] text-sm leading-relaxed flex-1 line-clamp-3">{card.excerpt}</p>
                  <Link
                    href={`/noticias/${card.href.split("/").pop()}`}
                    className="mt-auto inline-flex items-center gap-1 text-[#0c71c3] text-sm font-semibold hover:gap-2 transition-all"
                  >
                    Leer más
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
