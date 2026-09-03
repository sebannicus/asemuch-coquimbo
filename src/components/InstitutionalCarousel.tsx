"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/reunion-asemuch-funcionarios.webp", alt: "Actividad de ASEMUCH Coquimbo con funcionarios municipales" },
  { src: "/images/junto-a-asemuch-nacional-y-hero.webp", alt: "Dirigentes de ASEMUCH Coquimbo en actividad gremial" },
  { src: "/images/rosa-renney-cristian-tapia-asemuch-coquimbo.webp", alt: "Directiva de ASEMUCH Coquimbo" },
];

export function InstitutionalCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000); return () => window.clearInterval(timer); }, []);
  const slide = slides[active];
  return <div className="relative min-h-96 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg"><Image key={slide.src} src={slide.src} alt={slide.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority /><div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">{slides.map((item, index) => <button key={item.src} aria-label={`Ver imagen ${index + 1}`} onClick={() => setActive(index)} className={`h-2.5 w-2.5 rounded-full ${index === active ? "bg-white" : "bg-white/50"}`} />)}</div></div>;
}
