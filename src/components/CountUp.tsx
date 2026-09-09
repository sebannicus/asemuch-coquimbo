"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  /** Texto antes del número, por ejemplo "+" */
  prefix?: string;
  /** Duración de la cuenta en ms */
  duration?: number;
  className?: string;
}

export default function CountUp({ value, prefix = "", duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo: arranca rápido y frena al llegar al número final
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplay(value);
          } else {
            frame = requestAnimationFrame(step);
          }
        }
      },
      // Umbral bajo: si la tarjeta queda a medias en pantalla igual arranca,
      // en vez de quedarse congelada en 0.
      { threshold: 0.15 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("es-CL")}
    </span>
  );
}
