"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getNextSlideIndex, heroSlides } from "@/lib/hero-slides";

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => getNextSlideIndex(currentIndex, heroSlides.length));
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  function showPreviousSlide() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? heroSlides.length - 1 : currentIndex - 1,
    );
  }

  function showNextSlide() {
    setActiveIndex((currentIndex) => getNextSlideIndex(currentIndex, heroSlides.length));
  }

  return (
    <div className="absolute inset-0" aria-roledescription="carrusel" aria-label="Fotografías de actividades ASEMUCH Coquimbo">
      {heroSlides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={index === activeIndex ? slide.alt : ""}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 motion-reduce:transition-none ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(3,20,45,0.9),rgba(8,42,78,0.66)_55%,rgba(3,20,45,0.78))]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#061b37]/80 to-transparent" />

      <div className="absolute bottom-5 right-4 z-10 flex items-center gap-2 sm:bottom-7 sm:right-7">
        <button
          type="button"
          onClick={showPreviousSlide}
          aria-label="Fotografía anterior"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-slate-950/30 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="flex gap-1.5" aria-label={`Fotografía ${activeIndex + 1} de ${heroSlides.length}`}>
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Mostrar fotografía ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={showNextSlide}
          aria-label="Siguiente fotografía"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-slate-950/30 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
