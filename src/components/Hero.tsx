"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { HERO_SLIDES } from "./SiteData";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const total = HERO_SLIDES.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      id="asHero"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(120deg, #0a1f3c 0%, #0c2340 45%, #10498a 100%)",
        minHeight: "520px",
      }}
    >
      {/* Decorative dots */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Slides */}
      <div className="relative z-10 container-site flex flex-col lg:flex-row items-center min-h-[520px] py-16 gap-8">
        {/* Text content */}
        <div className="flex-1 text-white max-w-2xl">
          <p
            className="text-[#2ea3f2] text-sm font-semibold uppercase tracking-widest mb-3 transition-all duration-500"
            key={`sub-${current}`}
          >
            {slide.subheading}
          </p>
          <h1
            className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 transition-all duration-500"
            key={`h-${current}`}
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            {slide.heading}
          </h1>
          <p
            className="text-white/80 text-base lg:text-lg leading-relaxed mb-8 max-w-lg transition-all duration-500"
            key={`desc-${current}`}
          >
            {slide.description}
          </p>
          {slide.href && slide.cta && (
            <Link
              href={slide.href}
              className="inline-block bg-[#0c71c3] hover:bg-[#2ea3f2] text-white font-semibold px-7 py-3 rounded-lg transition-colors duration-200 text-sm"
            >
              {slide.cta} →
            </Link>
          )}
        </div>

        {/* Caja variant: card visual */}
        {slide.type === "caja" && (
          <div className="hidden lg:block flex-shrink-0 w-80">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white">
              <div className="w-12 h-12 bg-[#0c71c3] rounded-xl flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                Seminario Nacional
              </h3>
              <p className="text-white/70 text-sm">
                Modernización, Probidad y Defensa Funcionaria
              </p>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2 text-[#2ea3f2] text-sm font-medium">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Frutillar, Chile
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2.5 bg-[#0c71c3]"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + total) % total)}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Siguiente slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
}
