import type { Route } from "./+types/team";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { useI18n } from "~/i18n";
import { OptimizedImage } from "~/components/optimized-image";
import { generateMeta } from "~/utils/seo";
import { BreadcrumbSchema } from "~/components/structured-data";
import { ObfuscatedEmail } from "~/components/obfuscated-email";

/* ── Meta ──────────────────────────────────────────── */

export function meta({}: Route.MetaArgs) {
  return generateMeta({
    title: "Our Team — EAG",
    description: "Meet the EAG leadership team driving the digital transformation of the automotive market.",
    path: "/team",
  });
}

/* ── Team data ─────────────────────────────────────── */

interface TeamMember {
  name: string;
  roleKey: string;
  photo: string;
}

const team: TeamMember[] = [
  {
    name: "Jakub Šulta",
    roleKey: "team.role.sulta",
    photo: "/assets/team/jakub-sulta.jpg",
  },
  {
    name: "Petr Kratochvíl",
    roleKey: "team.role.kratochvil",
    photo: "/assets/team/petr-kratochvil.jpg",
  },
  {
    name: "Pavel Svoreň",
    roleKey: "team.role.svoren",
    photo: "/assets/team/pavel-svoren.jpg",
  },
  {
    name: "Ondřej Gálik",
    roleKey: "team.role.galik",
    photo: "/assets/team/ondrej-galik.jpg",
  },
  {
    name: "Ondřej Kofroň",
    roleKey: "team.role.kofron",
    photo: "/assets/team/ondrej-kofron.jpg",
  },
  {
    name: "Petr Dušek",
    roleKey: "team.role.dusek",
    photo: "/assets/team/petr-dusek.jpg",
  },
  {
    name: "Zbyněk Müller",
    roleKey: "team.role.muller",
    photo: "/assets/team/zbynek-muller.jpg",
  },
  {
    name: "Viktor Navrátil",
    roleKey: "team.role.navratil",
    photo: "/assets/team/viktor-navratil.jpg",
  },
  {
    name: "Martin Pajer",
    roleKey: "team.role.pajer",
    photo: "/assets/team/martin-pajer.jpg",
  },
  {
    name: "Nicolas Rorive",
    roleKey: "team.role.rorive",
    photo: "/assets/team/nicolas-rorive.jpg",
  },
  {
    name: "Piotr Stański",
    roleKey: "team.role.stanski",
    photo: "/assets/team/piotr-stanski.png",
  },
];

/* ── Page ──────────────────────────────────────────── */

export default function TeamPage() {
  const { t } = useI18n();

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Our Team", path: "/team" }]} />
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
                {t("team.hero.title")}
              </h1>
              <p className="text-a2 leading-relaxed text-[var(--section-text-muted)] lg:pt-3">
                {t("team.hero.subtitle")}
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
                    {t(member.roleKey)}
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
              <ObfuscatedEmail
                user="info"
                domain="eag.group"
                className="font-medium text-eag-teal underline decoration-eag-teal/30 underline-offset-2 hover:decoration-eag-teal"
              />
            </p>
          </div>
        </section>
      </main>
      <ContactSection />
      <AppFooter />
    </>
  );
}
