import Link from "next/link";
import { NEWS_CARDS } from "./SiteData";

function NewsCard({
  date,
  title,
  excerpt,
  imageUrl,
  href,
}: {
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  href: string;
}) {
  return (
    <article
      className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: "0.8px solid #e3e9f1",
        boxShadow: "rgba(12, 35, 64, 0.06) 0px 2px 10px 0px",
      }}
    >
      {/* Thumbnail */}
      <Link href={href} className="block overflow-hidden">
        <div
          className="w-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            aspectRatio: "16/9",
          }}
          role="img"
          aria-label={title}
        />
      </Link>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-2">
        <span className="text-xs font-semibold text-[#0c71c3]">{date}</span>
        <h3
          className="text-[#0c2340] font-bold text-base leading-snug"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          <Link href={href} className="hover:text-[#0c71c3] transition-colors">
            {title}
          </Link>
        </h3>
        <p className="text-[#5d6675] text-sm leading-relaxed flex-1 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1 text-[#0c71c3] text-sm font-semibold hover:gap-2 transition-all"
        >
          Leer más
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function NewsSection() {
  return (
    <section
      className="py-16"
      style={{ backgroundColor: "#e7edf5" }}
    >
      <div className="container-site">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-2xl lg:text-3xl font-extrabold text-[#0c2340]"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Noticias y Comunicados
          </h2>
          <Link
            href="/noticias"
            className="text-sm font-semibold text-[#0c71c3] hover:text-[#2ea3f2] transition-colors flex items-center gap-1"
          >
            Ver todos
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS_CARDS.map((card) => (
            <NewsCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
