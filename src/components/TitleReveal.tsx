"use client";

import { useEffect } from "react";

/**
 * Anima los elementos marcados con data-title-reveal cuando entran en pantalla:
 * el letter-spacing se cierra gradualmente hasta el tracking propio del título.
 * Se monta una sola vez en el layout y observa toda la página.
 */
export default function TitleReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("title-reveal");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );

    const observed = new WeakSet<Element>();
    const scan = () => {
      for (const el of document.querySelectorAll("[data-title-reveal]")) {
        if (observed.has(el) || el.classList.contains("title-reveal")) continue;
        observed.add(el);
        observer.observe(el);
      }
    };

    scan();
    // Los títulos que llegan con contenido cargado en cliente también se animan
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);

  return null;
}
