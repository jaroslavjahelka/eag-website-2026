import type { Route } from "./+types/team";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { useI18n } from "~/i18n";
import { OptimizedImage } from "~/components/optimized-image";

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
  photo: string;
}

const team: TeamMember[] = [
  {
    name: "Jakub Šulta",
    role: "CEO and Chairman of the Board",
    photo: "/assets/team/jakub-sulta.png",
  },
  {
    name: "Petr Kratochvíl",
    role: "CIO and Member of the Board",
    photo: "/assets/team/petr-kratochvil.png",
  },
  {
    name: "Pavel Svoreň",
    role: "Member of the Board",
    photo: "/assets/team/pavel-svoren.png",
  },
  {
    name: "Ondřej Gálik",
    role: "CPO",
    photo: "/assets/team/ondrej-galik.png",
  },
  {
    name: "Ondřej Kofroň",
    role: "CTO",
    photo: "/assets/team/ondrej-kofron.png",
  },
  {
    name: "Petr Dušek",
    role: "CMO",
    photo: "/assets/team/petr-dusek.png",
  },
  {
    name: "Zbyněk Müller",
    role: "CBO",
    photo: "/assets/team/zbynek-muller.jpg",
  },
  {
    name: "Viktor Navrátil",
    role: "CSO, Omnetic",
    photo: "/assets/team/viktor-navratil.jpg",
  },
  {
    name: "Martin Pajer",
    role: "CEO, Cebia",
    photo: "/assets/team/martin-pajer.png",
  },
  {
    name: "Nicolas Rorive",
    role: "CEO, Fastback srl.",
    photo: "/assets/team/nicolas-rorive.png",
  },
  {
    name: "Piotr Stański",
    role: "CEO, SoftVig",
    photo: "/assets/team/piotr-stanski.png",
  },
];

/* ── Page ──────────────────────────────────────────── */

export default function TeamPage() {
  const { t } = useI18n();

  return (
    <>
      <AppHeader />
      <main>
        {/* ── Dark hero header ── */}
        <section data-theme="dark" className="relative overflow-hidden bg-[var(--section-bg)] pt-32 pb-20 lg:pt-40 lg:pb-24">
          <OptimizedImage
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

        {/* ── Team grid ── */}
        <section data-theme="light" className="bg-white py-16 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {team.map((member) => (
                <div key={member.name} className="group text-center">
                  {/* Photo */}
                  <div className="mx-auto mb-4 aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-lg bg-gray-100">
                    <OptimizedImage
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                  {/* Info */}
                  <h3 className="text-a3 font-medium text-eag-black">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-a5 text-gray-400">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our colleagues — masonry grid ── */}
        <section data-theme="light" className="bg-white pb-20 lg:pb-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <h2 className="mb-12 text-b1 text-[var(--section-text)] lg:mb-16 lg:text-c5">
              {t("team.colleagues")}
            </h2>

            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {/* Right column — starts higher */}
              <div className="col-start-2 row-start-1 row-span-2 flex flex-col gap-4 lg:-mt-16 lg:gap-6">
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-[100/96]">
                    <OptimizedImage
                      src="/assets/team/colleagues-3.jpg"
                      alt="Our colleagues"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-[100/59]">
                    <OptimizedImage
                      src="/assets/team/colleagues-4.jpg"
                      alt="Our colleagues"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Left column — starts lower */}
              <div className="col-start-1 row-start-1 row-span-2 flex flex-col gap-4 lg:mt-16 lg:gap-6">
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-square">
                    <OptimizedImage
                      src="/assets/team/colleagues-1.jpg"
                      alt="Our colleagues"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-[100/129]">
                    <OptimizedImage
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

        {/* ── CTA — Join us ── */}
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
