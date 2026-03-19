import { useState } from "react";
import { useSearchParams } from "react-router";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Route } from "./+types/media";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { useI18n } from "~/i18n";

/* ── Meta ──────────────────────────────────────────── */

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Media — EAG" },
    {
      name: "description",
      content: "News and press coverage about the EAG group.",
    },
  ];
}

/* ── Sub-navigation tabs ───────────────────────────── */

const tabKeys = ["news", "press", "downloads", "shareholders"] as const;
type TabKey = (typeof tabKeys)[number];

const tabI18nKeys: Record<TabKey, string> = {
  news: "media.tab.news",
  press: "media.tab.press",
  downloads: "media.tab.downloads",
  shareholders: "media.tab.shareholders",
};

/* ── News articles ─────────────────────────────────── */

interface Article {
  title: string;
  date: string;
  source: string;
  image: string;
  href: string;
}

const articles: Article[] = [
  {
    title:
      "Česká skupina EAG posiluje v Německu. Vlastník Carvaga tam za více než miliardu korun akvíruje hned dvě prestižní značky",
    date: "April 23, 2025",
    source: "euro.cz",
    image: "/assets/news/eag-germany.jpg",
    href: "https://www.euro.cz/aktuality/ceska-eag-posiluje-v-nemecku-vlastnik-carvaga-tam-za-vice-nez-miliardu-korun-akviruje-hned-dve-prestizni-znacky/",
  },
  {
    title:
      "„Wir halten immer die Augen offen\u201C: Interview s Petrem Kratochvílem",
    date: "April 23, 2025",
    source: "kfz-betrieb.vogel.de",
    image: "/assets/news/kratochvil-interview.jpg",
    href: "https://www.kfz-betrieb.vogel.de/wir-halten-immer-die-augen-offen-a-c83bcddc1c9cf058eb3e59b05aa723e2/",
  },
  {
    title:
      "Finišuje miliardová investice do nenápadné, ale úspěšné české firmy. Vydělává na softwaru pro prodejce aut",
    date: "August 18, 2023",
    source: "archiv.hn.cz",
    image: "/assets/news/svoren-kratochvil.jpg",
    href: "https://archiv.hn.cz/c1-67234670-finisuje-miliardova-investice-do-nenapadne-ale-uspesne-ceske-firmy-vydelava-na-softwaru-pro-prodejce-aut",
  },
  {
    title:
      "Carvago: L'intelligenza artificiale rivoluziona l'automotive",
    date: "April 21, 2023",
    source: "motori.virgilio.it",
    image: "/assets/news/carvago-ai.png",
    href: "https://motori.virgilio.it/notizie/intelligenza-artificiale-rivoluziona-automotive/191512/",
  },
  {
    title:
      "Stav aut v bazarech se nelepší, říká šéf miliardového českého e-shopu ojetin",
    date: "April 18, 2023",
    source: "idnes.cz",
    image: "/assets/news/sulta-idnes.jpg",
    href: "https://www.idnes.cz/auto/zpravodajstvi/carvago-jakub-sulta-ojetina-bazar-autobazar-online-eshop.A230401_232942_automoto_fdv",
  },
  {
    title:
      "Kdo koupí ojetinu teď, za rok ji prodá i dráž, říká šéf Carvaga. To minulý rok utržilo 1,5 miliardy",
    date: "March 1, 2023",
    source: "cc.cz",
    image: "/assets/news/sulta-cc.jpg",
    href: "https://cc.cz/kdo-koupi-ojetinu-ted-za-rok-ji-proda-i-draz-rika-sef-carvaga-to-minuly-rok-utrzilo-15-miliardy/",
  },
  {
    title: "Carvago: Auto usate? Agli italiani piacciono le tedesche.",
    date: "January 17, 2023",
    source: "repubblica.it",
    image: "/assets/news/carvago-repubblica.png",
    href: "https://www.repubblica.it/motori/sezioni/attualita/2023/01/17/news/auto_usate_agli_italiani_piacciono_le_tedesche-383903544/",
  },
  {
    title:
      "Česká skupina chce být evropskou jedničkou v digitalizaci prodeje aut. Za stamiliony kupuje další firmu",
    date: "October 3, 2022",
    source: "cc.cz",
    image: "/assets/news/svoren-cc.jpg",
    href: "https://cc.cz/ceska-skupina-chce-byt-evropskou-jednickou-v-digitalizaci-prodeje-aut-za-stamiliony-kupuje-dalsi-firmu/",
  },
  {
    title:
      "Po internetu už auto můžete nejen koupit, ale i prodat. Carvago funguje oběma směry",
    date: "September 21, 2022",
    source: "zpravy.aktualne.cz",
    image: "/assets/news/carvago-aktualne.jpg",
    href: "https://zpravy.aktualne.cz/ekonomika/auto/po-internetu-uz-auto-muzete-nejen-koupit-ale-i-prodat-carvag/r~0ac93be038fc11ed8d680cc47ab5f122/",
  },
  {
    title:
      "V Česku se rodí významný evropský hráč na poli prodejů ojetin",
    date: "August 23, 2022",
    source: "seznamzpravy.cz",
    image: "/assets/news/carvago-seznam.jpg",
    href: "https://www.seznamzpravy.cz/clanek/ekonomika-firmy-v-cesku-se-rodi-vyznamny-evropsky-hrac-na-poli-prodeju-ojetin-212217",
  },
  {
    title:
      "Carvago: Wendepunkt erreicht? Diese Zeichen sprechen für Erholung am Automarkt",
    date: "August 11, 2022",
    source: "focus.de",
    image: "/assets/news/carvago-focus.jpg",
    href: "https://www.focus.de/auto/news/kommt-die-entspannung-zurueck-hintergrund-dreht-sich-der-automarkt-langsam-wieder_id_134016916.html",
  },
  {
    title:
      "Český trh ojetých automobilů se během 2. lock-downu propadl o dalších 23 %",
    date: "December 8, 2020",
    source: "kurzy.cz",
    image: "/assets/news/carvago-kurzy.jpg",
    href: "https://www.kurzy.cz/zpravy/569737-cesky-trh-ojetych-automobilu-se-behem-2-lock-downu-propadl-o-dalsich-23--a-celkove-ztraci-48-mld/",
  },
  {
    title: "Český ojetinám vládnou škodovky. Octavií je nedostatek",
    date: "December 7, 2020",
    source: "idnes.cz",
    image: "/assets/news/octavia-idnes.png",
    href: "https://www.idnes.cz/auto/zpravodajstvi/skoda-octavia-ojetina-bazar.A201203_114534_automoto_fdv",
  },
  {
    title: "Mladé ojetiny jsou žádané, ale nedostatkové",
    date: "December 2, 2020",
    source: "idnes.cz",
    image: "/assets/news/mlade-ojetiny.jpg",
    href: "https://www.idnes.cz/auto/zpravodajstvi/skoda-plus-ojetina-carvago-aaa-bazar.A201201_583525_automoto_fdv",
  },
  {
    title:
      "Zkontrolovali jsme v TechYardu auto za 50 tisíc z nejmenovaného autobazaru. Jak to dopadlo?",
    date: "October 22, 2020",
    source: "idnes.cz",
    image: "/assets/news/techyard.png",
    href: "https://www.idnes.cz/auto/zpravodajstvi/fiat-stilo-ojetina-rez-koroze.A200831_124028_automoto_mom",
  },
  {
    title:
      "Kupovat ojetá auta on-line? Zboží jako každé jiné, říká Šulta a rozjíždí to ve velkém",
    date: "October 20, 2020",
    source: "zpravy.aktualne.cz",
    image: "/assets/news/sulta-aktualne.jpg",
    href: "https://zpravy.aktualne.cz/ekonomika/auto/kupovat-ojeta-auta-on-line-zbozi-jako-kazde-jine-rika-sulta/r~5b1d29d40e1611eb9c800cc47ab5f122/",
  },
  {
    title:
      "Retailu ve velkých městech se vyhýbáme, říká šéf skupiny Portiva Pavel Svoreň",
    date: "October 12, 2020",
    source: "e15.cz",
    image: "/assets/news/svoren-e15.jpg",
    href: "https://www.e15.cz/rozhovory/retailu-ve-velkych-mestech-se-vyhybame-rika-sef-skupiny-portiva-pavel-svoren-1373745",
  },
  {
    title:
      "Uvažujete o ojetém elektromobilu? Na portálu Carvago jich je téměř 4,5 tisíce",
    date: "October 6, 2020",
    source: "fdrive.cz",
    image: "/assets/news/carvago-fdrive.png",
    href: "https://fdrive.cz/clanky/uvazujete-o-ojetem-elektromobilu-na-portalu-carvago-jich-je-temer-45-tisice-5928",
  },
  {
    title:
      "Bez švindlů, zcela online a s doručením až před vrata. České Carvago chce změnit nákup ojetých vozů",
    date: "October 1, 2020",
    source: "czechcrunch.cz",
    image: "/assets/news/sulta-czechcrunch.jpg",
    href: "https://www.czechcrunch.cz/2020/10/bez-svindlu-zcela-online-a-s-dorucenim-az-pred-vrata-ceske-carvago-chce-zmenit-nakup-ojetych-vozu/",
  },
  {
    title:
      "Češi otevírají největší online tržiště ojetin v Evropě. Chtějí nabídnout až milion aut",
    date: "October 1, 2020",
    source: "forbes.cz",
    image: "/assets/news/carvago-forbes.png",
    href: "https://forbes.cz/cesi-oteviraji-nejvetsi-online-trziste-ojetin-v-evrope-chteji-nabidnout-az-milion-aut/",
  },
  {
    title:
      "Autotržiště Carvago je největší v Evropě. Umožňuje nákup ojetiny online s doručením auta až domů",
    date: "October 1, 2020",
    source: "autosalon.tv",
    image: "/assets/news/carvago-autosalon.jpg",
    href: "https://www.autosalon.tv/novinky/ojetiny/autotrziste-carvago-je-nejvetsi-v-evrope-umoznuje-nakup-ojetiny-online-s-dorucenim-auta-az-domu",
  },
];

const ARTICLES_PER_PAGE = 9;

/* ── Page ──────────────────────────────────────────── */

export default function MediaPage() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = tabKeys.includes(tabParam as TabKey) ? (tabParam as TabKey) : "news";
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  return (
    <>
      <AppHeader />
      <main>
        <HeroSection />
        <ContentSection activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
      <ContactSection />
      <AppFooter />
    </>
  );
}

/* ── Hero — clean header with intro + tabs ────────── */

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
        {/* Heading + description */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h1 className="text-b1 text-[var(--section-text)] lg:text-c6">
            {t("media.title1")} {t("media.title2")}
          </h1>
          <p className="text-a2 leading-relaxed text-[var(--section-text-muted)] lg:pt-3">
            {t("media.subtitle")}
          </p>
        </div>

      </div>
    </section>
  );
}

/* ── Content ──────────────────────────────────────── */

function ContentSection({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}) {
  const { t } = useI18n();
  return (
    <section data-theme="light" className="bg-[var(--section-bg)] py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* Pill tabs */}
        <div className="-mx-6 mb-10 flex gap-2 overflow-x-auto px-6 scrollbar-none lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
          {tabKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-5 py-2.5 text-a4 font-medium transition-all duration-300 ${
                key === activeTab
                  ? "bg-eag-black text-white"
                  : "bg-transparent text-[var(--section-text-subtle)] hover:bg-eag-black/5 hover:text-[var(--section-text)]"
              }`}
            >
              {t(tabI18nKeys[key])}
            </button>
          ))}
        </div>

        {activeTab === "news" && <NewsGrid />}
        {activeTab === "press" && <Placeholder text={t("media.placeholder.press")} />}
        {activeTab === "downloads" && <Placeholder text={t("media.placeholder.downloads")} />}
        {activeTab === "shareholders" && <Placeholder text={t("media.placeholder.shareholders")} />}
      </div>
    </section>
  );
}

/* ── News grid — uniform 3-col cards ─────────────── */

function NewsGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const pageArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  return (
    <div id="news-grid">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pageArticles.map((article) => (
          <ArticleCard key={article.href} article={article} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            document.getElementById("news-grid")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}

/* ── Article card ─────────────────────────────────── */

function ArticleCard({ article }: { article: Article }) {
  const { t } = useI18n();
  return (
    <a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-xl bg-gray-50 transition-all duration-300 hover:bg-gray-100"
    >
      <div className="aspect-[16/10] overflow-hidden rounded-t-xl">
        <img
          src={article.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-eag-teal/10 px-2.5 py-1 text-a6 font-medium uppercase tracking-wider text-eag-teal">
            {article.source}
          </span>
          <span className="text-a5 text-[var(--section-text-subtle)]">{article.date}</span>
        </div>
        <h3 className="mb-4 line-clamp-3 text-b6 text-eag-black">
          {article.title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1 text-a4 font-medium text-eag-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {t("media.readArticle")}
          <ArrowUpRight size={14} weight="bold" />
        </span>
      </div>
    </a>
  );
}

/* ── Pagination ──────────────────────────────────── */

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-center gap-1.5"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[var(--section-text-subtle)] transition-colors hover:bg-eag-black/5 hover:text-[var(--section-text)] disabled:cursor-not-allowed disabled:opacity-20"
        aria-label="Previous page"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-a4 font-medium transition-all duration-300 ${
            page === currentPage
              ? "bg-eag-black text-white"
              : "text-[var(--section-text-subtle)] hover:bg-eag-black/5 hover:text-[var(--section-text)]"
          }`}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[var(--section-text-subtle)] transition-colors hover:bg-eag-black/5 hover:text-[var(--section-text)] disabled:cursor-not-allowed disabled:opacity-20"
        aria-label="Next page"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}

/* ── Placeholder ──────────────────────────────────── */

function Placeholder({ text }: { text: string }) {
  return (
    <div className="flex min-h-[30vh] items-center justify-center">
      <p className="text-a2 text-[var(--section-text-subtle)]">{text}</p>
    </div>
  );
}
