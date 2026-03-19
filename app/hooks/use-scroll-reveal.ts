import { useEffect, useRef } from "react";

/**
 * Observes children with `data-reveal` and adds `reveal-visible` class
 * when they scroll into view.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    const items = el.querySelectorAll("[data-reveal]");
    for (const item of items) {
      item.classList.add("reveal-base");
      observer.observe(item);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
