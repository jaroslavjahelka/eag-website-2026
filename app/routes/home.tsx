import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";

import type { Route } from "./+types/home";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { OptimizedImage } from "~/components/optimized-image";
import { Suspense, lazy } from "react";

const HeroSection = lazy(() =>
  import("~/components/globe-hero/hero-section").then((m) => ({ default: m.HeroSection })),
);
import { useI18n } from "~/i18n";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";
import { generateMeta } from "~/utils/seo";
import { OrganizationSchema, WebSiteSchema } from "~/components/structured-data";

/* ── Meta ──────────────────────────────────────────── */

export function meta({}: Route.MetaArgs) {
  return generateMeta({
    title: "EAG — Digital Transformation of the Automotive Market",
    description:
      "We are an international investment group focused on the digital transformation of the automotive market.",
    path: "/",
  });
}

/* ── Data ──────────────────────────────────────────── */

const companies = [
  { name: "Carvago", key: "company.carvago", logo: "/assets/logos/carvago.svg", slug: "carvago" },
  { name: "Omnetic", key: "company.omnetic", logo: "/assets/logos/omnetic.svg", slug: "omnetic" },
  { name: "Cebia", key: "company.cebia", logo: "/assets/logos/cebia.svg", slug: "cebia" },
  { name: "Fastback", key: "company.fastback", logo: "/assets/logos/fastback.svg", slug: "fastback" },
  { name: "Softvig", key: "company.softvig", logo: "/assets/logos/softvig.svg", slug: "softvig" },
  { name: "Teas", key: "company.teas", logo: "/assets/logos/teas.svg", slug: "teas" },
  { name: "Carsdata", key: "company.carsdata", logo: "/assets/logos/carsdata.svg", slug: "carsdata" },
  { name: "Caraudit", key: "company.caraudit", logo: "/assets/logos/caraudit.svg", slug: "caraudit" },
  { name: "Jbr", key: "company.jbr", logo: "/assets/logos/jbr.svg", slug: "jbr" },
  { name: "Instamotion", key: "company.instamotion", logo: "/assets/logos/instamotion.svg", slug: "instamotion" },
  { name: "Autrado", key: "company.autrado", logo: "/assets/logos/autrado.svg", slug: "autrado" },
  { name: "Carobserver", key: "company.carobserver", logo: "/assets/logos/carobserver.svg", slug: "carobserver" },
  { name: "Dotzilla", key: "company.dotzilla", logo: "/assets/logos/dotzilla.svg", slug: "dotzilla" },
  { name: "Automotive Systems", key: "company.automotive-systems", logo: "/assets/logos/automotive-systems.png", slug: "automotivesystems" },
];

const stats = [
  { value: "14", labelKey: "home.stats.portfolio" },
  { value: "12+", labelKey: "home.stats.markets" },
  { value: "5,700+", labelKey: "home.stats.clients" },
  { value: "30M+", labelKey: "home.stats.vehicles" },
];

const latestNews = [
  {
    title: "\u010Cesk\u00E1 skupina EAG posiluje v N\u011Bmecku",
    date: "April 23, 2025",
    source: "euro.cz",
    image: "/assets/news/eag-germany.jpg",
  },
  {
    title: "\u201EWir halten immer die Augen offen\u201C: Interview s Petrem Kratochv\u00EDlem",
    date: "April 23, 2025",
    source: "kfz-betrieb.vogel.de",
    image: "/assets/news/kratochvil-interview.jpg",
  },
  {
    title: "Fini\u0161uje miliardov\u00E1 investice do nen\u00E1padn\u00E9, ale \u00FAsp\u011B\u0161n\u00E9 \u010Desk\u00E9 firmy",
    date: "August 18, 2023",
    source: "archiv.hn.cz",
    image: "/assets/news/svoren-kratochvil.jpg",
  },
];

/* ── Page ──────────────────────────────────────────── */

export default function HomePage() {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef} className="flex min-h-svh flex-col">
      <OrganizationSchema />
      <WebSiteSchema />
      <AppHeader />
      <main className="flex-1">
        <Suspense fallback={null}>
          <HeroSection />
        </Suspense>
        <LogoMarquee />
        <MissionSection />
<StrategySection />
        <InvestmentsSection />
        <NewsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <AppFooter />
    </div>
  );
}

/* ── Logo marquee ─────────────────────────────────── */

const logos = [
  { name: "carvago", cls: "!h-8 lg:!h-9" },
  { name: "omnetic", cls: "!h-8 lg:!h-9" },
  { name: "cebia", cls: "!h-8 lg:!h-9" },
  { name: "fastback", cls: "!h-8 lg:!h-9" },
  { name: "softvig", cls: "!h-8 lg:!h-9" },
  { name: "teas", cls: "!h-8 lg:!h-9" },
  { name: "carsdata", cls: "!h-8 lg:!h-9" },
  { name: "caraudit", cls: "!h-8 lg:!h-9" },
  { name: "jbr", cls: "!h-4 lg:!h-5" },
  { name: "instamotion", cls: "!h-4 lg:!h-5" },
  { name: "autrado", cls: "!h-4 lg:!h-5" },
  { name: "carobserver", cls: "!h-8 lg:!h-9" },
  { name: "dotzilla", cls: "" },
];

function LogoMarquee() {
  return (
    <section
      data-theme="dark"
      className="relative -mt-[100px] h-[100px] overflow-hidden bg-black/40 backdrop-blur-3xl"
    >
      {/* Solid blur edges — aligned to grid, then fade into marquee */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex" style={{ width: "max(1.5rem, calc((100vw - 80rem) / 2 + 2.5rem + 4rem))" }}>
        <div className="flex-1 backdrop-blur-3xl bg-black/60" />
        <div className="w-16 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex" style={{ width: "max(1.5rem, calc((100vw - 80rem) / 2 + 2.5rem + 4rem))" }}>
        <div className="w-16 bg-gradient-to-l from-black/60 to-transparent" />
        <div className="flex-1 backdrop-blur-3xl bg-black/60" />
      </div>

      <div className="flex h-full items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="animate-marquee flex shrink-0 items-center"
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {logos.map((logo) => (
              <img
                key={`${logo.name}-${copy}`}
                src={`/assets/logos-inverse/${logo.name}-inverse.svg`}
                alt={copy === 0 ? logo.name : ""}
                className={`mx-4 h-7 w-auto max-w-[120px] shrink-0 object-contain opacity-40 lg:mx-7 lg:h-8 ${logo.cls}`}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Stats ─────────────────────────────────────────── */

function StatsSection() {
  const { t } = useI18n();
  return (
    <section data-theme="dark" className="bg-eag-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.labelKey}
            data-reveal
            className={`flex flex-col items-center gap-2 px-6 py-28 lg:py-40 ${
              i < stats.length - 1 ? "border-r border-white/10" : ""
            } ${i < 2 ? "reveal-delay-1" : "reveal-delay-2"}`}
          >
            <span className="text-b1 text-eag-teal lg:text-c6">{stat.value}</span>
            <span className="text-a4 text-white/50">{t(stat.labelKey)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Mission ───────────────────────────────────────── */

function MissionSection() {
  const { t } = useI18n();
  return (
    <section id="mission" data-theme="light" className="bg-[var(--section-bg)] pt-28 pb-14 lg:pt-40 lg:pb-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Text */}
          <div>
            <p data-reveal className="mb-4 text-a4 font-medium uppercase tracking-widest text-eag-teal">
              {t("home.mission.title")}
            </p>
            <h2 data-reveal className="mb-8 text-b2 text-[var(--section-text)] lg:text-b1 reveal-delay-1">
              {t("home.mission.lead")}
            </h2>
            <p data-reveal className="text-a2 leading-relaxed text-[var(--section-text-muted)] reveal-delay-2">
              {t("home.mission.body")}
            </p>
          </div>

          {/* Image */}
          <div data-reveal className="overflow-hidden rounded-2xl reveal-delay-2">
            <OptimizedImage
              src="/assets/projects/carvago.jpg"
              alt=""
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Strategy ──────────────────────────────────────── */

function StrategySection() {
  const { t } = useI18n();
  return (
    <section id="strategy" data-theme="light" className="cv-auto bg-[var(--section-bg)] pt-14 pb-28 lg:pt-20 lg:pb-40">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div data-reveal className="order-2 overflow-hidden rounded-2xl lg:order-1">
            <OptimizedImage
              src="/assets/projects/cebia.jpg"
              alt=""
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p data-reveal className="mb-4 text-a4 font-medium uppercase tracking-widest text-eag-teal">
              {t("home.strategy.label")}
            </p>
            <h2 data-reveal className="mb-8 text-b2 text-[var(--section-text)] lg:text-b1 reveal-delay-1">
              {t("home.strategy.title")}
            </h2>
            <p data-reveal className="text-a2 leading-relaxed text-[var(--section-text-muted)] reveal-delay-2">
              {t("home.strategy.body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Investments ───────────────────────────────────── */

function InvestmentsSection() {
  const { t } = useI18n();
  return (
    <section id="investments" data-theme="light" className="cv-auto bg-gray-50 py-28 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <p data-reveal className="mb-4 text-a4 font-medium uppercase tracking-widest text-eag-teal">
            {t("home.investments.label")}
          </p>
          <h2 data-reveal className="mb-6 text-b2 text-[var(--section-text)] lg:text-b1 reveal-delay-1">
            {t("home.investments.title")}
          </h2>
          <p data-reveal className="text-a2 leading-relaxed text-[var(--section-text-muted)] reveal-delay-2">
            {t("home.investments.body")}
          </p>
        </div>

        {/* Company cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companies.map((company, i) => (
            <Link
              key={company.name}
              to={`/projects#${company.slug}`}
              data-reveal
              className={`group flex flex-col items-start gap-4 rounded-xl bg-white p-6 no-underline transition-all duration-300 hover:shadow-lg hover:shadow-black/5 ${
                i < 4 ? "reveal-delay-1" : i < 8 ? "reveal-delay-2" : "reveal-delay-3"
              }`}
            >
              <img src={company.logo} alt={company.name} className="h-7 w-auto object-contain" />
              <p className="text-a4 text-[var(--section-text-subtle)]">{t(company.key)}</p>
            </Link>
          ))}
        </div>

        <div data-reveal className="mt-14 reveal-delay-4">
          <Link
            to="/projects"
            className="group/link inline-flex items-center gap-2 rounded-full bg-eag-black px-7 py-3.5 text-a4 font-medium text-white no-underline transition-all duration-300 hover:bg-eag-gray-800"
          >
            {t("home.investments.allProjects")}
            <ArrowRight size={15} weight="bold" className="transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Latest News ──────────────────────────────────── */

function NewsSection() {
  const { t } = useI18n();
  return (
    <section data-theme="light" className="cv-auto bg-[var(--section-bg)] py-28 lg:py-40">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p data-reveal className="mb-4 text-a4 font-medium uppercase tracking-widest text-eag-teal">
              {t("media.tab.news")}
            </p>
            <h2 data-reveal className="text-b2 text-[var(--section-text)] lg:text-b1 reveal-delay-1">
              {t("home.news.title")}
            </h2>
          </div>
          <Link
            data-reveal
            to="/media"
            className="group/link hidden items-center gap-2 rounded-full border border-[var(--section-border)] px-5 py-2.5 text-a4 font-medium text-[var(--section-text)] no-underline transition-all duration-300 hover:border-eag-black hover:bg-eag-black hover:text-white sm:inline-flex reveal-delay-1"
          >
            {t("home.news.viewAll")}
            <ArrowRight size={14} weight="bold" className="transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((article) => (
            <Link
              key={article.title}
              to="/media"
              data-reveal
              className="group flex flex-col overflow-hidden rounded-2xl bg-gray-50 transition-all duration-300 hover:bg-gray-100 reveal-delay-1"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <OptimizedImage src={article.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-eag-teal/10 px-2.5 py-1 text-a6 font-medium uppercase tracking-wider text-eag-teal">
                    {article.source}
                  </span>
                  <span className="text-a5 text-[var(--section-text-subtle)]">{article.date}</span>
                </div>
                <h3 className="line-clamp-2 text-b5 text-[var(--section-text)]">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Team ──────────────────────────────────────────── */

function TeamSection() {
  const { t } = useI18n();
  return (
    <section
      id="team"
      data-theme="dark"
      className="cv-auto relative overflow-hidden bg-[var(--section-bg)] py-28 lg:py-40"
    >
      <OptimizedImage src="/assets/team-dark.jpg" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-black/70 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p data-reveal className="mb-4 text-a4 font-medium uppercase tracking-widest text-eag-teal">
            {t("home.team.label")}
          </p>
          <h2 data-reveal className="mb-8 text-b2 text-[var(--section-text)] lg:text-b1 reveal-delay-1">
            {t("home.team.title")}
          </h2>
          <p data-reveal className="mb-10 text-a2 leading-relaxed text-[var(--section-text-muted)] reveal-delay-2">
            {t("home.team.body")}
          </p>
          <div data-reveal className="reveal-delay-3">
            <Link
              to="/team"
              className="group/link inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-a4 font-medium text-eag-black no-underline transition-all duration-300 hover:bg-eag-teal hover:text-white"
            >
              {t("home.team.link")}
              <ArrowRight size={15} weight="bold" className="transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ───────────────────────────────────────── */
