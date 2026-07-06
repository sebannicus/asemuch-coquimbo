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

      {/* Slides — Dos columnas: texto izquierda, logo derecha */}
      <div className="relative z-10 container-site flex flex-col lg:flex-row items-center justify-between min-h-[520px] py-16 gap-8">
        {/* Text content — Columna izquierda */}
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

        {/* Logo — Columna derecha — PROTAGONISTA */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Logo principal */}
          <div className="relative w-64 h-64 lg:w-96 lg:h-96 flex items-center justify-center drop-shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="ASEMUCH Coquimbo"
              className="w-full h-full object-contain"
              style={{ opacity: 0.95 }}
            />
          </div>

          {/* Badge 80 años — sobre el logo */}
          <div
            className="absolute bottom-8 right-0 lg:bottom-12 lg:right-4 z-20 flex flex-col items-center gap-0.5 px-3 py-2 lg:px-4 lg:py-3 rounded-xl"
            style={{
              background: "rgba(12,35,64,0.75)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            aria-hidden="true"
          >
            <span
              className="text-2xl lg:text-4xl font-extrabold text-white leading-none"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              80
            </span>
            <span className="text-[9px] lg:text-[10px] font-bold text-[#2ea3f2] uppercase tracking-widest leading-none">
              AÑOS
            </span>
            <span className="text-[8px] lg:text-[9px] text-white/60 uppercase tracking-wider leading-snug text-center mt-0.5">
              ASEMUCH<br />CHILE
            </span>
          </div>
        </div>
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
