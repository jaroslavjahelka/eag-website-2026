import { Suspense, lazy, useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { useI18n } from "~/i18n";
import { useReducedMotion } from "~/hooks/use-reduced-motion";

const GlobeCanvas = lazy(() => import("./globe-canvas"));

export function HeroSection() {
  const { t } = useI18n();
  const reducedMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const handleGlobeError = useCallback(() => setWebglFailed(true), []);

  // GSAP text reveal
  useEffect(() => {
    const container = contentRef.current;
    const globeWrap = globeRef.current;
    if (!container) return;

    const lines = container.querySelectorAll<HTMLElement>("[data-hero-line]");
    const sub = container.querySelector<HTMLElement>("[data-hero-sub]");
    const cta = container.querySelector<HTMLElement>("[data-hero-cta]");
    const targets = [...lines, sub, cta].filter(Boolean) as HTMLElement[];

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      if (globeWrap) gsap.set(globeWrap, { opacity: 1 });
      return;
    }

    // Set initial hidden state
    gsap.set(targets, { opacity: 0, y: 40 });
    if (globeWrap) gsap.set(globeWrap, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.1 });

    // Globe fade in
    if (globeWrap) {
      tl.to(globeWrap, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0);
    }

    // Headline lines stagger
    lines.forEach((line, i) => {
      tl.to(line, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3 + i * 0.2);
    });

    // Supporting copy
    if (sub) {
      tl.to(sub, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.9);
    }

    // CTA
    if (cta) {
      tl.to(cta, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.1);
    }

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      data-theme="dark"
      className="relative flex min-h-svh flex-col overflow-hidden bg-[var(--section-bg)]"
    >
      {/* Globe canvas — absolute, full bleed */}
      {!webglFailed && (
        <div ref={globeRef} className="absolute inset-0">
          <Suspense fallback={null}>
            <GlobeCanvas
              className="h-full w-full"
              reducedMotion={reducedMotion}
              onError={handleGlobeError}
            />
          </Suspense>
        </div>
      )}

      {/* Static fallback when WebGL fails */}
      {webglFailed && (
        <picture>
          <source srcSet="/assets/hero-bg.webp" type="image/webp" />
          <img
            src="/assets/hero-bg.jpg"
            alt="EAG group headquarters"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          />
        </picture>
      )}

      {/* Gradient overlays for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent lg:from-black lg:via-black/40" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-6 lg:px-10"
      >
        <div className="max-w-4xl pb-[140px] pt-32 lg:pb-[220px] lg:pt-40">
          <h1 data-hero-line className="text-b2 text-white lg:text-c6">
            {t("home.hero.text1")} {t("home.hero.text2")}
          </h1>

          <p
            data-hero-sub
            className="mt-6 max-w-lg text-a2 leading-relaxed text-[var(--section-text-muted)]"
          >
            {t("home.hero.subtitle")}
          </p>

          <div data-hero-cta className="mt-10">
            <Link
              to="/projects"
              className="group/link inline-flex items-center gap-2 rounded-full bg-eag-teal px-7 py-3.5 text-a4 font-medium text-white no-underline transition-colors duration-300 hover:bg-eag-teal-dark"
            >
              {t("home.hero.cta")}
              <ArrowRight
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover/link:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
