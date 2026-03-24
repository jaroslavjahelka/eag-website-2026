import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Route } from "./+types/media";
import { AppHeader } from "~/components/app-header";
import { AppFooter } from "~/components/app-footer";
import { ContactSection } from "~/components/contact-section";
import { useI18n } from "~/i18n";
import { OptimizedImage } from "~/components/optimized-image";

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

/* ── WordPress GraphQL loader ────────────────────── */

interface Article {
  title: string;
  date: string;
  source: string;
  image: string;
  href: string;
}

interface WPPostNode {
  databaseId: number;
  title: string;
  date: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  info: { link: string } | null;
}

const GRAPHQL_QUERY = `{
  posts(first: 100, where: { categoryId: 10 }) {
    nodes {
      databaseId
      title
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      info {
        link
      }
    }
  }
}`;

function extractSource(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname;
  } catch {
    return "";
  }
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function mapPost(node: WPPostNode): Article | null {
  const link = node.info?.link;
  if (!link) return null;

  return {
    title: node.title,
    date: formatDate(node.date),
    source: extractSource(link),
    image: node.featuredImage?.node?.sourceUrl ?? "/assets/towedcars-light.jpg",
    href: link,
  };
}

async function fetchArticles() {
  try {
    const res = await fetch("https://api.eag.group/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GRAPHQL_QUERY }),
    });

    if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`);

    const json = await res.json();
    const nodes: WPPostNode[] = json?.data?.posts?.nodes ?? [];
    const articles = nodes.map(mapPost).filter((a): a is Article => a !== null);

    return { articles };
  } catch (error) {
    console.error("Failed to fetch articles from WordPress:", error);
    return { articles: [] };
  }
}

export async function loader() {
  return fetchArticles();
}

const ARTICLES_PER_PAGE = 9;

/* ── Page ──────────────────────────────────────────── */

export default function MediaPage({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tabFromUrl = tabKeys.includes(tabParam as TabKey) ? (tabParam as TabKey) : "news";
  const [activeTab, setActiveTab] = useState<TabKey>(tabFromUrl);

  // Sync tab state when URL search params change (e.g. nav click)
  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  return (
    <>
      <AppHeader />
      <main>
        <HeroSection />
        <ContentSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          articles={loaderData?.articles ?? []}
        />
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
      <OptimizedImage
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
  articles,
}: {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  articles: Article[];
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

        {activeTab === "news" && <NewsGrid articles={articles} />}
        {activeTab === "press" && <Placeholder text={t("media.placeholder.press")} />}
        {activeTab === "downloads" && <DownloadsSection />}
        {activeTab === "shareholders" && <ShareholdersSection />}
      </div>
    </section>
  );
}

/* ── News grid — uniform 3-col cards ─────────────── */

function NewsGrid({ articles }: { articles: Article[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const pageArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  if (articles.length === 0) {
    return <Placeholder text="No articles available." />;
  }

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
        <OptimizedImage
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

/* ── Downloads section ────────────────────────────── */

function DownloadsSection() {
  const { t } = useI18n();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <a
        href="https://api.eag.group/wp-content/uploads/2025/02/Policies_EAG.zip"
        className="group flex items-center gap-4 rounded-xl bg-gray-50 p-5 transition-colors duration-300 hover:bg-gray-100"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-eag-teal/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-eag-teal">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-b6 text-eag-black">{t("media.downloads.policies")}</h3>
          <p className="mt-0.5 text-a5 text-gray-500">ZIP · 1.4 MB</p>
        </div>
        <ArrowUpRight
          size={18}
          weight="bold"
          className="shrink-0 text-eag-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </a>
    </div>
  );
}

/* ── Shareholders section ────────────────────────── */

function ShareholdersSection() {
  const { t } = useI18n();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <a
        href="https://drive.google.com/drive/folders/1n0CVJZM5_oZfdJ2Jf7S9Co_cog1HOovf?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-xl bg-gray-50 p-5 transition-colors duration-300 hover:bg-gray-100"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-eag-teal/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-eag-teal">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-b6 text-eag-black">{t("media.shareholders.documents")}</h3>
          <p className="mt-0.5 text-a5 text-gray-500">Google Drive</p>
        </div>
        <ArrowUpRight
          size={18}
          weight="bold"
          className="shrink-0 text-eag-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </a>
    </div>
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
