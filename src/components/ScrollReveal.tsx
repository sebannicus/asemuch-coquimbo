"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Retraso en ms antes de animar, útil para escalonar listas */
  delay?: number;
  /** Dirección desde la que entra el contenido */
  direction?: "up" | "left" | "right" | "none";
}

const OFFSET: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
  up: "translateY(28px)",
  left: "translateX(-28px)",
  right: "translateX(28px)",
  none: "translateY(0)",
};

export default function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0)" : OFFSET[direction],
        transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
