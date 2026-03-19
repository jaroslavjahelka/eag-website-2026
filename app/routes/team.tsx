import { useState, useCallback } from "react";
import type { Route } from "./+types/team";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { useI18n } from "~/i18n";

/* ── Meta ──────────────────────────────────────────── */

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Team — EAG" },
    {
      name: "description",
      content:
        "Meet the EAG leadership team driving the digital transformation of the automotive market.",
    },
  ];
}

/* ── Team data ─────────────────────────────────────── */

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  bg: string;
}

const team: TeamMember[] = [
  {
    name: "Jakub Šulta",
    role: "CEO and Chairman of the Board",
    bio: "Jakub is the cofounder and Chairman of the Board of EAG group. In the last 14 years he has taken part in a series of successful online projects in the total market value of EUR 110 million.",
    photo: "/assets/team/jakub-sulta.png",
    bg: "/assets/team/jakub-sulta-bg.jpg",
  },
  {
    name: "Petr Kratochvíl",
    role: "CIO and Member of the Board",
    bio: "Petr is the Chief investment officer at EAG group. He has taken part in transactions worth more than EUR 4 billion.",
    photo: "/assets/team/petr-kratochvil.png",
    bg: "/assets/team/petr-kratochvil-bg.jpg",
  },
  {
    name: "Pavel Svoreň",
    role: "Member of the Board",
    bio: "Pavel is Member of the Board at EAG group. He is responsible for strategy and funding.",
    photo: "/assets/team/pavel-svoren.png",
    bg: "/assets/team/pavel-svoren-bg.png",
  },
  {
    name: "Ondřej Gálik",
    role: "CPO",
    bio: "Ondřej is the Chief of product at EAG group. He is in charge of platform development, strategy and product innovations.",
    photo: "/assets/team/ondrej-galik.png",
    bg: "/assets/team/ondrej-galik-bg.jpg",
  },
  {
    name: "Ondřej Kofroň",
    role: "CTO",
    bio: "Ondřej is the Chief technical officer at EAG group. He brings his experience with more than 70 projects into EAG.",
    photo: "/assets/team/ondrej-kofron.png",
    bg: "/assets/team/ondrej-kofron-bg.jpg",
  },
  {
    name: "Petr Dušek",
    role: "CMO",
    bio: "Petr is the Chief marketing officer at EAG group. He is responsible for the entire marketing strategy.",
    photo: "/assets/team/petr-dusek.png",
    bg: "/assets/team/petr-dusek-bg.jpg",
  },
  {
    name: "Zbyněk Müller",
    role: "CBO",
    bio: "Zbyněk is the Chief business officer at EAG group. He has more than 20 years of experience working in automotive environments.",
    photo: "/assets/team/zbynek-muller.jpg",
    bg: "/assets/team/zbynek-muller-bg.jpg",
  },
  {
    name: "Viktor Navrátil",
    role: "CSO, Omnetic",
    bio: "Viktor is CSO of Omnetic. At EAG group, he is dedicated to the development and management of Omnetic.",
    photo: "/assets/team/viktor-navratil.jpg",
    bg: "/assets/team/viktor-navratil-bg.jpg",
  },
  {
    name: "Martin Pajer",
    role: "CEO, Cebia",
    bio: "Martin is the founder and CEO of Cebia. He has built Cebia into a company that is now a major supplier of vehicle verification and security tools.",
    photo: "/assets/team/martin-pajer.png",
    bg: "/assets/team/martin-pajer-bg.png",
  },
  {
    name: "Nicolas Rorive",
    role: "CEO, Fastback srl.",
    bio: "Nicolas Rorive is Chief Executive Officer of Fastback. He brings a strong customer-centric and performance-driven approach.",
    photo: "/assets/team/nicolas-rorive.png",
    bg: "/assets/team/nicolas-rorive-bg.png",
  },
  {
    name: "Piotr Stański",
    role: "CEO, SoftVig",
    bio: "Piotr is CEO of SoftVig. An experienced manager who has been in the Automotive industry for almost 30 years.",
    photo: "/assets/team/piotr-stanski.png",
    bg: "/assets/team/piotr-stanski-bg.png",
  },
];

/* ── Arrow icon ───────────────────────────────────── */

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={direction === "up" ? "rotate-180" : ""}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Page ──────────────────────────────────────────── */

export default function TeamPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = team[activeIndex];
  const { t } = useI18n();

  const padIndex = (i: number) => String(i + 1).padStart(2, "0");

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? team.length - 1 : prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === team.length - 1 ? 0 : prev + 1));
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        {/* ── Dark hero header ── */}
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
                The people behind our vision
              </h1>
              <p className="text-a2 leading-relaxed text-[var(--section-text-muted)] lg:pt-3">
                Our leadership team brings together decades of experience in technology, automotive, and investment to drive the digital transformation of how vehicles are sold and managed across Europe.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Profile section
            White bg, B&W face positioned right,
            vertical thumbnail sidebar, name+bio left
            ════════════════════════════════════════════ */}
        <section
          data-theme="light"
          className="relative min-h-svh overflow-hidden bg-[var(--section-bg)]"
        >
          {/* B&W face — absolute, right-aligned, top-to-bottom */}
          <img
            key={active.bg}
            src={active.bg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 bottom-0 h-full w-full object-cover object-top transition-opacity duration-500 lg:w-[55%]"
          />
          {/* Overlay — stronger on mobile so text stays readable */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60 lg:from-white lg:via-white/80 lg:to-transparent" />

          {/* Content inside max-w container */}
          <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col px-6 lg:px-10">
            {/* ── Main content — name, role, bio ── */}
            <div className="flex flex-1 flex-col justify-center py-20 lg:py-28">
              <div className="max-w-2xl">
                <h2 className="mb-4 text-b1 text-[var(--section-text)] lg:text-c6">
                  {active.name}
                </h2>

                <p className="mb-4 text-a1 font-semibold text-[var(--section-text)]">
                  {active.role}
                </p>

                <p className="text-a2 leading-relaxed text-[var(--section-text-muted)]">
                  {active.bio}
                </p>
              </div>
            </div>

            {/* ── Horizontal thumbnail switcher ── */}
            <div className="flex items-end gap-2 overflow-x-auto pb-10">
              {team.map((member, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={member.name}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={member.name}
                    className={`flex-shrink-0 cursor-pointer overflow-hidden rounded-sm transition-all duration-300 ${
                      isActive
                        ? "h-20 w-20 shadow-[0_16px_32px_rgba(0,0,0,0.15)] lg:h-24 lg:w-24"
                        : "h-16 w-16 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 lg:h-20 lg:w-20"
                    }`}
                  >
                    <img
                      src={member.photo}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            Our colleagues — masonry grid (eag.group layout)
            ════════════════════════════════════════════ */}
        <section data-theme="light" className="bg-white py-20 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <h2 className="mb-12 text-b1 text-[var(--section-text)] lg:mb-16 lg:text-c5">
              {t("team.colleagues")}
            </h2>

            {/* Staggered 2-column masonry — right column starts higher */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {/* Right column — starts higher, offset up */}
              <div className="col-start-2 row-start-1 row-span-2 flex flex-col gap-4 lg:-mt-16 lg:gap-6">
                {/* team-3: top-right, large landscape */}
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-[100/96]">
                    <img
                      src="/assets/team/colleagues-3.jpg"
                      alt="Our colleagues"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {/* team-4: bottom-right, wide */}
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-[100/59]">
                    <img
                      src="/assets/team/colleagues-4.jpg"
                      alt="Our colleagues"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Left column — starts lower */}
              <div className="col-start-1 row-start-1 row-span-2 flex flex-col gap-4 lg:mt-16 lg:gap-6">
                {/* team-1: top-left, square-ish */}
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-square">
                    <img
                      src="/assets/team/colleagues-1.jpg"
                      alt="Our colleagues"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {/* team-2: bottom-left, tall portrait */}
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-[100/129]">
                    <img
                      src="/assets/team/colleagues-2.jpg"
                      alt="Our colleagues"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            CTA — Join us
            ════════════════════════════════════════════ */}
        <section data-theme="dark" className="bg-eag-gray-800 py-16 lg:py-20">
          <div className="mx-auto w-full max-w-7xl px-6 text-center lg:px-10">
            <h2 className="mb-4 text-b2 text-white lg:text-b1">
              {t("team.join")}
            </h2>
            <p className="text-a2 text-white/60">
              {t("team.joinCta")}{" "}
              <a
                href="mailto:info@eag.group"
                className="font-medium text-eag-teal underline decoration-eag-teal/30 underline-offset-2 hover:decoration-eag-teal"
              >
                info@eag.group
              </a>
            </p>
          </div>
        </section>
      </main>
      <ContactSection />
      <AppFooter />
    </>
  );
}
