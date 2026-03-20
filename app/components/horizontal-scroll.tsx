import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";
import { tv } from "tailwind-variants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const styles = tv({
  slots: {
    wrapper: "h-full w-full",
    content: ["flex h-full w-full flex-nowrap", "flex-col md:flex-row"],
  },
});

const { wrapper, content } = styles();

interface HorizontalScrollProps {
  className?: string;
  children: ReactNode;
  /** Called every scroll frame with progress 0–1. Use refs only — no setState. */
  onProgress?: (progress: number) => void;
  /** Called once with the main GSAP tween for use as containerAnimation. */
  onTween?: (tween: gsap.core.Tween) => void;
}

export function HorizontalScroll(props: HorizontalScrollProps) {
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const scrollContent = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapperEl = scrollWrapper.current;
      const contentEl = scrollContent.current;
      if (!wrapperEl || !contentEl) return;

      const getDistance = () => Math.max(0, contentEl.scrollWidth - wrapperEl.clientWidth);

      const tween = gsap.to(contentEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top top",
          end: () => `+=${Math.max(1, getDistance())}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => props.onProgress?.(self.progress),
        },
      });

      props.onTween?.(tween);

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(wrapperEl);
      ro.observe(contentEl);

      return () => {
        ro.disconnect();
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: scrollWrapper },
  );

  return (
    <section ref={scrollWrapper} className={wrapper({ className: props.className })}>
      <div ref={scrollContent} className={content()}>
        {props.children}
      </div>
    </section>
  );
}
