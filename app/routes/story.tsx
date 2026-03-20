import { Suspense, lazy } from "react";
import type { Route } from "./+types/story";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { useI18n } from "~/i18n";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";

const HorizontalScroll = lazy(() =>
  import("~/components/horizontal-scroll").then((m) => ({ default: m.HorizontalScroll })),
);

/* ── Meta ──────────────────────────────────────────── */

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Story \u2014 EAG" },
    {
      name: "description",
      content:
        "Our roots and our vision. The history of EAG group from 1991 to today.",
    },
  ];
}

/* ── Timeline data ─────────────────────────────────── */

interface TimelineEntry {
  year: number;
  titleKey: string;
  descKey: string;
  logo: string;
  image: string;
}

const timeline: TimelineEntry[] = [
  {
    year: 2025,
    titleKey: "timeline.2025.dotzilla.title",
    descKey: "timeline.2025.dotzilla.desc",
    logo: "/assets/logos-color/dotzilla-color.svg",
    image: "/assets/news/eag-germany.jpg",
  },
  {
    year: 2025,
    titleKey: "timeline.2025.carobserver.title",
    descKey: "timeline.2025.carobserver.desc",
    logo: "/assets/logos-color/carobserver-color.svg",
    image: "/assets/news/svoren-kratochvil.jpg",
  },
  {
    year: 2024,
    titleKey: "timeline.2024.autrado.title",
    descKey: "timeline.2024.autrado.desc",
    logo: "/assets/logos-color/autrado-color.svg",
    image: "/assets/news/kratochvil-interview.jpg",
  },
  {
    year: 2024,
    titleKey: "timeline.2024.instamotion.title",
    descKey: "timeline.2024.instamotion.desc",
    logo: "/assets/logos-color/instamotion-color.svg",
    image: "/assets/towedcars-light.jpg",
  },
  {
    year: 2024,
    titleKey: "timeline.2024.jbr.title",
    descKey: "timeline.2024.jbr.desc",
    logo: "/assets/logos-color/jbr-color.svg",
    image: "/assets/techyard-light.jpg",
  },
  {
    year: 2022,
    titleKey: "timeline.2022.softvig.title",
    descKey: "timeline.2022.softvig.desc",
    logo: "/assets/logos-color/softvig-color.svg",
    image: "/assets/news/svoren-kratochvil.jpg",
  },
  {
    year: 2022,
    titleKey: "timeline.2022.fastback.title",
    descKey: "timeline.2022.fastback.desc",
    logo: "/assets/logos-color/fastback-color.svg",
    image: "/assets/news/eag-germany.jpg",
  },
  {
    year: 2021,
    titleKey: "timeline.2021.cebia.title",
    descKey: "timeline.2021.cebia.desc",
    logo: "/assets/logos-color/cebia-color.svg",
    image: "/assets/towedcars-light.jpg",
  },
  {
    year: 2020,
    titleKey: "timeline.2020.carvago.title",
    descKey: "timeline.2020.carvago.desc",
    logo: "/assets/logos-color/carvago-color.svg",
    image: "/assets/news/kratochvil-interview.jpg",
  },
  {
    year: 2020,
    titleKey: "timeline.2020.caraudit.title",
    descKey: "timeline.2020.caraudit.desc",
    logo: "/assets/logos-color/caraudit-color.svg",
    image: "/assets/techyard-light.jpg",
  },
  {
    year: 2019,
    titleKey: "timeline.2019.carsdata.title",
    descKey: "timeline.2019.carsdata.desc",
    logo: "/assets/logos-color/carsdata-color.svg",
    image: "/assets/news/svoren-kratochvil.jpg",
  },
  {
    year: 2019,
    titleKey: "timeline.2019.carvago.title",
    descKey: "timeline.2019.carvago.desc",
    logo: "/assets/logos-color/carvago-color.svg",
    image: "/assets/news/eag-germany.jpg",
  },
  {
    year: 2019,
    titleKey: "timeline.2019.autosoft.title",
    descKey: "timeline.2019.autosoft.desc",
    logo: "/assets/logos-color/autosoft-color.svg",
    image: "/assets/towedcars-light.jpg",
  },
  {
    year: 2019,
    titleKey: "timeline.2019.teas.title",
    descKey: "timeline.2019.teas.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/techyard-light.jpg",
  },
  {
    year: 2019,
    titleKey: "timeline.2019.portiva.title",
    descKey: "timeline.2019.portiva.desc",
    logo: "/assets/logos-color/eag-color.svg",
    image: "/assets/news/kratochvil-interview.jpg",
  },
  {
    year: 2018,
    titleKey: "timeline.2018.eag.title",
    descKey: "timeline.2018.eag.desc",
    logo: "/assets/logos-color/eag-color.svg",
    image: "/assets/techyard-light.jpg",
  },
  {
    year: 2012,
    titleKey: "timeline.2012.teas.title",
    descKey: "timeline.2012.teas.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/news/svoren-kratochvil.jpg",
  },
  {
    year: 2010,
    titleKey: "timeline.2010.teas.title",
    descKey: "timeline.2010.teas.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/news/eag-germany.jpg",
  },
  {
    year: 2006,
    titleKey: "timeline.2006.elit.title",
    descKey: "timeline.2006.elit.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/towedcars-light.jpg",
  },
  {
    year: 2005,
    titleKey: "timeline.2005.autosoft.title",
    descKey: "timeline.2005.autosoft.desc",
    logo: "/assets/logos-color/autosoft-color.svg",
    image: "/assets/techyard-light.jpg",
  },
  {
    year: 2004,
    titleKey: "timeline.2004.caris.title",
    descKey: "timeline.2004.caris.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/news/kratochvil-interview.jpg",
  },
  {
    year: 2002,
    titleKey: "timeline.2002.mercedes.title",
    descKey: "timeline.2002.mercedes.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/news/svoren-kratochvil.jpg",
  },
  {
    year: 2001,
    titleKey: "timeline.2001.hyundai.title",
    descKey: "timeline.2001.hyundai.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/news/eag-germany.jpg",
  },
  {
    year: 2000,
    titleKey: "timeline.2000.renault.title",
    descKey: "timeline.2000.renault.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/towedcars-light.jpg",
  },
  {
    year: 1998,
    titleKey: "timeline.1998.bosch.title",
    descKey: "timeline.1998.bosch.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/techyard-light.jpg",
  },
  {
    year: 1997,
    titleKey: "timeline.1997.mazda.title",
    descKey: "timeline.1997.mazda.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/news/kratochvil-interview.jpg",
  },
  {
    year: 1993,
    titleKey: "timeline.1993.teas.title",
    descKey: "timeline.1993.teas.desc",
    logo: "/assets/logos-color/teas-color.svg",
    image: "/assets/news/svoren-kratochvil.jpg",
  },
  {
    year: 1991,
    titleKey: "timeline.1991.autosoft.title",
    descKey: "timeline.1991.autosoft.desc",
    logo: "/assets/logos-color/autosoft-color.svg",
    image: "/assets/news/eag-germany.jpg",
  },
];

/* ── Enrich with alternating position ────────────── */

interface EnrichedEntry extends TimelineEntry {
  position: "top" | "bottom";
  isFirstOfYear: boolean;
  id: string;
}

function enrichTimeline(entries: TimelineEntry[]): EnrichedEntry[] {
  let lastYear = -1;
  let toggle = false;
  return entries.map((entry) => {
    const isFirstOfYear = entry.year !== lastYear;
    if (isFirstOfYear) toggle = !toggle;
    lastYear = entry.year;
    return { ...entry, position: toggle ? "top" : "bottom", isFirstOfYear, id: `${entry.year}-${entry.titleKey}` };
  });
}

const enrichedTimeline = enrichTimeline(timeline);

/* ── Page ──────────────────────────────────────────── */

export default function StoryPage() {
  return (
    <>
      <AppHeader />
      <main>
        <HeroSection />
        <TimelineSection />
      </main>
      <ContactSection />
      <AppFooter />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────── */

function HeroSection() {
  const { t } = useI18n();
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-[var(--section-bg)] pt-32 pb-20 lg:pt-40 lg:pb-24">
      <img
        src="/assets/towedcars-light.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-black/70 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h1 className="text-b1 text-[var(--section-text)] lg:text-c6">
            {t("story.title1")} {t("story.title2")}
          </h1>
          <p className="text-a2 leading-relaxed text-[var(--section-text-muted)] lg:pt-3">
            {t("story.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Timeline (horizontal scroll) ────────────────── */

function TimelineSection() {
  const { t } = useI18n();
  const revealRef = useScrollReveal();

  return (
    <section data-theme="light" className="bg-white">
      {/* Section heading */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-20 lg:px-10 lg:pt-32">
        <span className="text-a3 font-medium uppercase tracking-wider text-eag-teal">
          {t("story.journey")}
        </span>
        <h2 className="mt-4 max-w-3xl text-b3 text-eag-black md:text-b1 lg:mt-6 lg:text-c6">
          {t("story.journeySubtitle")}
        </h2>
      </div>

      {/* Mobile — full-width cards */}
      <div ref={revealRef} className="space-y-4 px-6 pt-8 pb-20 md:hidden">
        {enrichedTimeline.map((entry) => (
          <div key={entry.id} data-reveal>
            {entry.isFirstOfYear && (
              <span className="mb-2 mt-4 block text-b3 font-bold tabular-nums text-gray-200">
                {entry.year}
              </span>
            )}
            <div className="overflow-hidden rounded-xl bg-gray-50">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={entry.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <img src={entry.logo} alt="" className="h-5 w-auto object-contain" />
                  <span className="ml-auto text-a5 font-medium tabular-nums text-gray-300">{entry.year}</span>
                </div>
                <h3 className="mb-1 text-b6 text-eag-black">{t(entry.titleKey)}</h3>
                <p className="text-a4 leading-relaxed text-gray-500">{t(entry.descKey)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop — horizontal scroll timeline */}
      <div className="hidden md:block">
        <Suspense fallback={null}>
          <HorizontalScroll className="h-svh">
            {/* Left spacer — aligned to site grid */}
            <div className="h-full shrink-0" style={{ width: "max(1.5rem, calc((100vw - 80rem) / 2 + 2.5rem))" }} />

            {enrichedTimeline.map((entry) => {
              const isTop = entry.position === "top";

              return (
                <div
                  key={entry.id}
                  className="relative flex h-full w-[480px] shrink-0 flex-col items-stretch justify-center px-[60px]"
                >
                  {/* Year label — in the empty half, opposite the card */}
                  {entry.isFirstOfYear && (
                    <span
                      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 select-none text-c4 font-bold tabular-nums text-gray-100 lg:text-c3 ${
                        isTop
                          ? "bottom-[35%]"
                          : "top-[35%]"
                      }`}
                    >
                      {entry.year}
                    </span>
                  )}

                  {/* Card */}
                  <div
                    className="flex flex-col"
                    style={{
                      transform: isTop ? "translateY(calc(-50% - 4px))" : "translateY(calc(50% + 4px))",
                    }}
                  >
                    <div className="overflow-hidden rounded-xl bg-gray-50 transition-colors duration-300 hover:bg-gray-100">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={entry.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4 lg:p-5">
                        <div className="mb-2 flex items-center gap-2">
                          <img
                            src={entry.logo}
                            alt=""
                            className="h-5 w-auto object-contain"
                          />
                          <span className="ml-auto text-a5 font-medium tabular-nums text-gray-300">{entry.year}</span>
                        </div>
                        <h3 className="mb-1 text-b6 text-eag-black">
                          {t(entry.titleKey)}
                        </h3>
                        <p className="line-clamp-2 text-a4 leading-relaxed text-gray-500">
                          {t(entry.descKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Right spacer — aligned to site grid */}
            <div className="h-full shrink-0" style={{ width: "max(1.5rem, calc((100vw - 80rem) / 2 + 2.5rem))" }} />
          </HorizontalScroll>
        </Suspense>
      </div>

      {/* Bottom spacing */}
      <div className="h-20 lg:h-32" />
    </section>
  );
}
