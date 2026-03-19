import type { Route } from "./+types/story";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { useI18n } from "~/i18n";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";

/* ── Meta ──────────────────────────────────────────── */

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Story — EAG" },
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
  title: string;
  description: string;
  logo: string;
}

const timeline: TimelineEntry[] = [
  {
    year: 2025,
    title: "Acquisition of Dotzilla",
    description: "The EAG group successfully acquired Dotzilla.",
    logo: "/assets/logos-color/dotzilla-color.svg",
  },
  {
    year: 2025,
    title: "Acquisition of CarObserver",
    description: "The EAG group successfully acquired CarObserver.",
    logo: "/assets/logos-color/carobserver-color.svg",
  },
  {
    year: 2024,
    title: "Acquisition of Autrado",
    description: "The EAG group successfully acquired Autrado.",
    logo: "/assets/logos-color/autrado-color.svg",
  },
  {
    year: 2024,
    title: "Acquisition of Instamotion",
    description: "The EAG group successfully acquired Instamotion.",
    logo: "/assets/logos-color/instamotion-color.svg",
  },
  {
    year: 2024,
    title: "Acquisition of JBR",
    description: "The EAG group successfully acquired JBR.",
    logo: "/assets/logos-color/jbr-color.svg",
  },
  {
    year: 2022,
    title: "Acquisition of SoftVig",
    description: "The EAG SE successfully acquired SoftVig.",
    logo: "/assets/logos-color/softvig-color.svg",
  },
  {
    year: 2022,
    title: "Acquisition of Fastback srl.",
    description:
      "The EAG SE successfully acquired online B2B trading platform Fastback srl.",
    logo: "/assets/logos-color/fastback-color.svg",
  },
  {
    year: 2021,
    title: "Acquisition of Cebia",
    description:
      "The EAG group successfully acquired company Cebia, spol. s r.o.",
    logo: "/assets/logos-color/cebia-color.svg",
  },
  {
    year: 2020,
    title: "The beginning of Carvago B2C",
    description:
      "The launch of Carvago.com for end consumers. 900 000 vehicles on offer from 30 000 partners.",
    logo: "/assets/logos-color/carvago-color.svg",
  },
  {
    year: 2020,
    title: "Investment into CarAudit",
    description:
      "The CarAudit mobile app is created with the aim of completely digitalizing vehicle purchasing and management.",
    logo: "/assets/logos-color/caraudit-color.svg",
  },
  {
    year: 2019,
    title: "Beta of CarsData",
    description:
      "Partners receive the advanced analytics tool CarsData for testing.",
    logo: "/assets/logos-color/carsdata-color.svg",
  },
  {
    year: 2019,
    title: "The start of Carvago B2B",
    description:
      "The launch of Carvago.com, the first European Marketplace for online B2B vehicle sales.",
    logo: "/assets/logos-color/carvago-color.svg",
  },
  {
    year: 2019,
    title: "Acquisition of AutoSoft",
    description:
      "The EAG group successfully acquired company AUTOSOFT Company s.r.o.",
    logo: "/assets/logos-color/autosoft-color.svg",
  },
  {
    year: 2019,
    title: "Acquisition of TEAS",
    description:
      "The EAG group successfully acquired the company TEAS spol. s r.o.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 2019,
    title: "Portiva enters",
    description:
      "The company Portiva becomes the primary shareholder of EAG.",
    logo: "/assets/logos-color/eag-color.svg",
  },
  {
    year: 2018,
    title: "The founding of the EAG holding",
    description:
      "The EAG holding is founded with the goal of creating a complex ecosystem of services for the automotive segment.",
    logo: "/assets/logos-color/eag-color.svg",
  },
  {
    year: 2012,
    title: "The most used DMS",
    description:
      "TEAS has reached more than 1000 installations in the Czech Republic and Slovakia and is the most used system in the automotive sector. Its solution is used by 32 car manufacturers and the 4 largest servicing networks.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 2010,
    title: "TEAS replaces the competing DMS",
    description:
      "TEAS partners up with Ford, Kia, Toyota, Fiat, Alfa Romeo, Subaru, Škoda, Volkswagen, Nissan and other car manufacturers.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 2006,
    title: "Elit implements TEAS",
    description:
      "TEAS is chosen as the main system for the ELIT network of car repair shops.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 2005,
    title: "Autosoft celebrates its 500th client",
    description:
      "Autosoft has more than 500 installations in the Czech Republic and becomes the most used software for used car dealerships.",
    logo: "/assets/logos-color/autosoft-color.svg",
  },
  {
    year: 2004,
    title: "New Caris system",
    description:
      "TEAS launches Caris — a unique DMS which integrates the functionality of all existing systems into one solution.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 2002,
    title: "Partnership with Mercedes-Benz",
    description:
      "TEAS begins to cooperate with Daimler AG in developing a DMS for Mercedes, Chrysler and Jeep.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 2001,
    title: "Partnership with Hyundai",
    description:
      "TEAS is certified by Hyundai and becomes the dealership system for the Czech Republic.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 2000,
    title: "Partnership with Renault",
    description:
      "TEAS is certified by Renault and delivers its system to more than 25 dealerships.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 1998,
    title: "Vehicle inspection system",
    description:
      "The first system for the management of vehicle inspection and emissions testing centers is created together with Bosch.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 1997,
    title: "First official certification",
    description:
      "TEAS becomes the first certified system for Mazda dealerships and importers and a certified system of Citroën.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 1993,
    title: "Founding of TEAS",
    description:
      "TEAS launches its first complex solution for new car dealerships in the Czech Republic.",
    logo: "/assets/logos-color/teas-color.svg",
  },
  {
    year: 1991,
    title: "Founding of AutoSoft",
    description:
      "AutoSoft becomes the first software tool for dealership management in the Czech Republic.",
    logo: "/assets/logos-color/autosoft-color.svg",
  },
];


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
        {/* Heading + description — 2-col like media */}
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

/* ── Timeline ─────────────────────────────────────── */

function TimelineSection() {
  const { t } = useI18n();
  const revealRef = useScrollReveal();

  return (
    <section data-theme="light" className="bg-white py-20 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Section heading */}
        <h2 className="mb-16 text-center text-b3 text-eag-black lg:mb-24 lg:text-b1">
          {t("story.journey")}
        </h2>

        {/* Timeline */}
        <div ref={revealRef} className="relative">
          {/* Central line — mobile */}
          <div className="absolute left-4 top-0 block h-full w-px bg-gray-200 lg:hidden" />
          {/* Central line — desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gray-200 lg:block" />

          <div className="space-y-16 lg:space-y-0">
            {timeline.map((entry, i) => (
              <TimelineCard
                key={`${entry.year}-${entry.title}`}
                entry={entry}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Timeline card ────────────────────────────────── */

function TimelineCard({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  /* Shared card inner content */
  const cardContent = (
    <>
      <img
        src={entry.logo}
        alt=""
        className="mb-4 h-7 w-auto object-contain lg:h-8"
      />
      <h3 className="mb-2 text-b5 text-eag-black lg:text-b4">{entry.title}</h3>
      <p className="text-a4 text-gray-500">{entry.description}</p>
    </>
  );

  return (
    <>
      {/* ── Mobile layout ── */}
      <div data-reveal className="relative pl-12 lg:hidden">
        {/* Dot */}
        <div className="absolute left-4 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-eag-teal bg-white" />

        {/* Year */}
        <span className="mb-3 block text-b3 font-bold text-eag-teal">
          {entry.year}
        </span>

        {/* Card */}
        <div className="rounded-lg border-t-[3px] border-eag-teal bg-white p-5 shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
          {cardContent}
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div
        data-reveal
        className="relative hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12 lg:py-8"
      >
        {/* Dot on center line */}
        <div className="absolute left-1/2 top-[3.25rem] z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-eag-teal bg-white transition-shadow hover:shadow-[0_0_0_4px_rgba(45,150,140,0.2)]" />

        {isLeft ? (
          <>
            {/* Left column — year + card */}
            <div className="flex flex-col items-end">
              {/* Large year */}
              <span className="mb-2 text-c3 font-bold leading-none text-eag-black/10">
                {entry.year}
              </span>
              {/* Card with right-pointing arrow — border on timeline side */}
              <div className="relative w-full max-w-md rounded-lg border-r-[3px] border-eag-teal bg-white p-8 shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
                {/* Arrow pointer — teal */}
                <div className="absolute top-6 -right-[9px] h-0 w-0 border-y-[8px] border-l-[9px] border-y-transparent border-l-eag-teal" />
                {cardContent}
              </div>
            </div>

            {/* Center spacer */}
            <div className="w-px" />

            {/* Right column — empty */}
            <div />
          </>
        ) : (
          <>
            {/* Left column — empty */}
            <div />

            {/* Center spacer */}
            <div className="w-px" />

            {/* Right column — year + card */}
            <div className="flex flex-col items-start">
              {/* Large year */}
              <span className="mb-2 text-c3 font-bold leading-none text-eag-black/10">
                {entry.year}
              </span>
              {/* Card with left-pointing arrow — border on timeline side */}
              <div className="relative w-full max-w-md rounded-lg border-l-[3px] border-eag-teal bg-white p-8 shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
                {/* Arrow pointer — teal */}
                <div className="absolute top-6 -left-[12px] h-0 w-0 border-y-[8px] border-r-[9px] border-y-transparent border-r-eag-teal" />
                {cardContent}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
