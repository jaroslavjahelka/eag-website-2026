import { ArrowUpRight } from "@phosphor-icons/react";
import type { Route } from "./+types/projects";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { useI18n } from "~/i18n";

/* ── Meta ──────────────────────────────────────────── */

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects — EAG" },
    {
      name: "description",
      content:
        "Amazing projects and even better companies. Explore the EAG portfolio.",
    },
  ];
}

/* ── Project data ──────────────────────────────────── */

interface Project {
  name: string;
  tagline: string;
  description: string;
  image: string;
  logo: string;
  stats: { label: string; value: string }[];
  href: string;
}

const projects: Project[] = [
  {
    name: "Carvago",
    tagline: "European used car online marketplace",
    description:
      "800K+ vehicles with integrated services including inspections, logistics, financing, insurance, and servicing across Europe.",
    image: "/assets/projects/carvago.jpg",
    logo: "/assets/logos/carvago.svg",
    stats: [
      { label: "European markets", value: "9" },
      { label: "Professional partners", value: "30K" },
    ],
    href: "https://carvago.com/",
  },
  {
    name: "Omnetic",
    tagline: "Dealership management system",
    description:
      "Leading DMS provider for authorized dealerships and automotive third parties in the CEE region.",
    image: "/assets/projects/omnetic.jpg",
    logo: "/assets/logos/omnetic.svg",
    stats: [
      { label: "Clients", value: "5,700" },
      { label: "Countries", value: "12" },
    ],
    href: "https://omnetic.com/en",
  },
  {
    name: "Cebia",
    tagline: "Vehicle verification and security",
    description:
      "Vehicle verification and security services in Czechia, Slovakia, and Romania.",
    image: "/assets/projects/cebia.jpg",
    logo: "/assets/logos/cebia.svg",
    stats: [
      { label: "Verified cars", value: "30M+" },
      { label: "Data source countries", value: "32+" },
    ],
    href: "https://en.cebia.com/",
  },
  {
    name: "Fastback",
    tagline: "Online B2B trading platform",
    description:
      "Online B2B trading platform for used vehicle stock management and trade-ins.",
    image: "/assets/projects/fastback.jpg",
    logo: "/assets/logos/fastback.svg",
    stats: [
      { label: "Cars sold in 2022", value: "75,000+" },
      { label: "Dealerships", value: "2,300+" },
    ],
    href: "https://www.fastback.be/en/",
  },
  {
    name: "Softvig",
    tagline: "Systems for importers and dealers",
    description:
      "IT solutions for importers and dealerships in Poland since 2000.",
    image: "/assets/projects/softvig.jpg",
    logo: "/assets/logos/softvig.svg",
    stats: [
      { label: "Dealerships", value: "800+" },
      { label: "Top 10 dealers in Poland", value: "8" },
    ],
    href: "https://softvig.pl/en",
  },
  {
    name: "Teas",
    tagline: "Dealership management system",
    description:
      "Largest DMS provider in the Czech Republic and Slovakia for dealerships and service centers.",
    image: "/assets/projects/teas.jpg",
    logo: "/assets/logos/teas.svg",
    stats: [
      { label: "CZK yearly revenue", value: "120B" },
      { label: "Vehicles sold yearly", value: "250K" },
    ],
    href: "https://www.teas.cz/",
  },
  {
    name: "CarAudit",
    tagline: "Automatized and detailed car inspection",
    description:
      "Mobile app for digitalized vehicle inspection and fleet management.",
    image: "/assets/projects/caraudit.jpg",
    logo: "/assets/logos/caraudit.svg",
    stats: [
      { label: "Vehicles checked monthly", value: "10K" },
      { label: "Car manufacturers", value: "13" },
    ],
    href: "https://carvago.com/cs/caraudit",
  },
  {
    name: "CarsData",
    tagline: "Market and dealership analytics tool",
    description:
      "Market and dealership analytics tool covering 16 European nations.",
    image: "/assets/projects/carsdata.jpg",
    logo: "/assets/logos/carsdata.svg",
    stats: [
      { label: "Ads analyzed daily", value: "6.5M" },
      { label: "Data sources", value: "135" },
    ],
    href: "https://carsdata.com/",
  },
  {
    name: "JBR",
    tagline: "IT systems for the automotive industry",
    description:
      "Polish IT system developer optimizing workflow for automotive manufacturers.",
    image: "/assets/projects/jbr.jpg",
    logo: "/assets/logos/jbr.svg",
    stats: [
      { label: "Years of experience", value: "30+" },
      { label: "Customer service", value: "24/7" },
    ],
    href: "https://www.jbr.pl/",
  },
  {
    name: "Instamotion",
    tagline: "Online car dealer",
    description:
      "Largest online dealer of used and nearly-new cars in the German market.",
    image: "/assets/projects/instamotion.jpg",
    logo: "/assets/logos/instamotion.svg",
    stats: [
      { label: "Partners in Germany", value: "400+" },
      { label: "Offers", value: "30,000+" },
    ],
    href: "https://www.instamotion.com/",
  },
  {
    name: "Autrado",
    tagline: "Dealer Management Systems",
    description:
      "DMS software for dealerships with vehicle management and lead tools.",
    image: "/assets/projects/autrado.jpg",
    logo: "/assets/logos/autrado.svg",
    stats: [
      { label: "Partners in Europe", value: "320+" },
      { label: "Years of experience", value: "20+" },
    ],
    href: "https://www.autrado.de/",
  },
  {
    name: "CarObserver",
    tagline: "Professional Margin Optimization",
    description:
      "Margin optimization for manufacturers and dealerships via pricing analytics.",
    image: "/assets/projects/carobserver.jpg",
    logo: "/assets/logos/carobserver.svg",
    stats: [
      { label: "Vehicle analyses", value: "50M" },
      { label: "Dealership clients", value: "500+" },
    ],
    href: "https://www.carobserver.de/",
  },
  {
    name: "Dotzilla",
    tagline: "Digital Marketing Solutions",
    description:
      "Digital marketing solutions including SEO and DMS middleware since 2002.",
    image: "/assets/projects/dotzilla.jpg",
    logo: "/assets/logos/dotzilla.svg",
    stats: [
      { label: "Dealerships served", value: "1,000+" },
      { label: "Years of experience", value: "20+" },
    ],
    href: "https://www.dotzilla.de/",
  },
];

/* ── Page ──────────────────────────────────────────── */

export default function ProjectsPage() {
  return (
    <>
      <AppHeader />
      <main>
        <HeroSection />
        <ProjectsGrid />
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
        src="/assets/techyard-light.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black via-black/70 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Heading + description — 2-col */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h1 className="text-b1 text-[var(--section-text)] lg:text-c6">
            {t("projects.title1")} {t("projects.title2")}
          </h1>
          <p className="text-a2 leading-relaxed text-[var(--section-text-muted)] lg:pt-3">
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
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl bg-gray-50 transition-colors duration-300 hover:bg-gray-100"
    >
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="aspect-video overflow-hidden lg:aspect-auto lg:h-full">
          <img
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
            {project.tagline}
          </p>

          <p className="mb-8 text-a2 text-gray-500">
            {project.description}
          </p>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-6">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-b3 text-eag-black lg:text-b2">
                  {stat.value}
                </p>
                <p className="mt-1 text-a5 text-gray-400">{stat.label}</p>
              </div>
            ))}
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
