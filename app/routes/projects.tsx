import { ArrowUpRight } from "@phosphor-icons/react";
import type { Route } from "./+types/projects";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { useI18n } from "~/i18n";
import { OptimizedImage } from "~/components/optimized-image";
import { generateMeta } from "~/utils/seo";
import { BreadcrumbSchema } from "~/components/structured-data";
import { useScrollReveal } from "~/hooks/use-scroll-reveal";

/* ── Meta ──────────────────────────────────────────── */

export function meta({}: Route.MetaArgs) {
  return generateMeta({
    title: "Projects — EAG",
    description: "Amazing projects and even better companies. Explore the EAG portfolio.",
    path: "/projects",
  });
}

/* ── Project data ──────────────────────────────────── */

interface Project {
  name: string;
  key: string;
  image: string;
  logo: string;
  href: string;
}

const projects: Project[] = [
  { name: "Carvago", key: "carvago", image: "/assets/projects/carvago.jpg", logo: "/assets/logos/carvago.svg", href: "https://carvago.com/" },
  { name: "Omnetic", key: "omnetic", image: "/assets/projects/omnetic.jpg", logo: "/assets/logos/omnetic.svg", href: "https://omnetic.com/en" },
  { name: "Cebia", key: "cebia", image: "/assets/projects/cebia.jpg", logo: "/assets/logos/cebia.svg", href: "https://en.cebia.com/" },
  { name: "Fastback", key: "fastback", image: "/assets/projects/fastback.jpg", logo: "/assets/logos/fastback.svg", href: "https://www.fastback.be/en/" },
  { name: "Softvig", key: "softvig", image: "/assets/projects/softvig.jpg", logo: "/assets/logos/softvig.svg", href: "https://softvig.pl/en" },
  { name: "Teas", key: "teas", image: "/assets/projects/teas.jpg", logo: "/assets/logos/teas.svg", href: "https://www.teas.cz/" },
  { name: "CarAudit", key: "caraudit", image: "/assets/projects/caraudit.jpg", logo: "/assets/logos/caraudit.svg", href: "https://carvago.com/cs/caraudit" },
  { name: "CarsData", key: "carsdata", image: "/assets/projects/carsdata.jpg", logo: "/assets/logos/carsdata.svg", href: "https://carsdata.com/" },
  { name: "JBR", key: "jbr", image: "/assets/projects/jbr.jpg", logo: "/assets/logos/jbr.svg", href: "https://www.jbr.pl/" },
  { name: "Instamotion", key: "instamotion", image: "/assets/projects/instamotion.jpg", logo: "/assets/logos/instamotion.svg", href: "https://www.instamotion.com/" },
  { name: "Autrado", key: "autrado", image: "/assets/projects/autrado.jpg", logo: "/assets/logos/autrado.svg", href: "https://www.autrado.de/" },
  { name: "CarObserver", key: "carobserver", image: "/assets/projects/carobserver.jpg", logo: "/assets/logos/carobserver.svg", href: "https://www.carobserver.de/" },
  { name: "Dotzilla", key: "dotzilla", image: "/assets/projects/dotzilla.jpg", logo: "/assets/logos/dotzilla.svg", href: "https://www.dotzilla.de/" },
  { name: "Automotive Systems", key: "automotive-systems", image: "/assets/projects/automotive-systems.jpg", logo: "/assets/logos/automotive-systems.png", href: "https://automotivesystems.be/en/index.html" },
];

/* ── Page ──────────────────────────────────────────── */

export default function ProjectsPage() {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef}>
      <BreadcrumbSchema items={[{ name: "Projects", path: "/projects" }]} />
      <AppHeader />
      <main>
        <HeroSection />
        <ProjectsGrid />
      </main>
      <ContactSection />
      <AppFooter />
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────── */

function HeroSection() {
  const { t } = useI18n();
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-[var(--section-bg)] pt-32 pb-20 lg:pt-40 lg:pb-24">
      <OptimizedImage
        src="/assets/techyard-light.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-black/70 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Heading + description — 2-col */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h1 data-reveal className="text-b1 text-[var(--section-text)] lg:text-c6">
            {t("projects.title1")} {t("projects.title2")}
          </h1>
          <p data-reveal className="text-a2 leading-relaxed text-[var(--section-text-muted)] lg:pt-3 reveal-delay-1">
            {t("projects.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Projects grid ────────────────────────────────── */

function ProjectsGrid() {
  return (
    <section data-theme="light" className="bg-white py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="space-y-16">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Project card ─────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const k = project.key;
  return (
    <a
      id={project.name.toLowerCase().replace(/\s+/g, "")}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
      className="group block scroll-mt-24 overflow-hidden rounded-2xl bg-gray-50 transition-colors duration-300 hover:bg-gray-100"
    >
      <div className="grid lg:grid-cols-2 lg:min-h-[500px]">
        {/* Image */}
        <div className="aspect-video max-h-[500px] overflow-hidden lg:aspect-auto lg:h-full">
          <OptimizedImage
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <img
            src={project.logo}
            alt={project.name}
            className="mb-6 h-8 w-auto object-contain object-left"
          />

          <p className="mb-2 text-a4 font-medium uppercase tracking-wider text-eag-teal">
            {t(`project.${k}.tagline`)}
          </p>

          <p className="mb-8 text-a2 text-gray-500">
            {t(`project.${k}.desc`)}
          </p>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-6">
            <div>
              <p className="text-b3 text-eag-black lg:text-b2">
                {t(`project.${k}.stat1.value`)}
              </p>
              <p className="mt-1 text-a5 text-gray-500">{t(`project.${k}.stat1.label`)}</p>
            </div>
            <div>
              <p className="text-b3 text-eag-black lg:text-b2">
                {t(`project.${k}.stat2.value`)}
              </p>
              <p className="mt-1 text-a5 text-gray-500">{t(`project.${k}.stat2.label`)}</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-a4 font-medium text-eag-teal">
            {t("projects.visitWebsite")}
            <ArrowUpRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </a>
  );
}
