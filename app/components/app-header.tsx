import { useState, useEffect } from "react";
import { Link } from "react-router";
import { List, X } from "@phosphor-icons/react";
import { Button as AriaButton } from "react-aria-components";
import { useI18n } from "~/i18n";
import { EagLogo } from "~/components/eag-logo";

/**
 * Watches all `[data-theme]` sections and returns "dark" or "light"
 * depending on which section currently sits behind the fixed header.
 */
function useHeaderTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    function update() {
      const probeY = 60;
      const sections = document.querySelectorAll<HTMLElement>("[data-theme]");

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= probeY) {
          const t = sections[i].getAttribute("data-theme");
          if (t === "dark" || t === "light") {
            setTheme(t);
          }
          break;
        }
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return theme;
}

export function AppHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useHeaderTheme();
  const isDark = theme === "dark";
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.story"), href: "/story" },
    { label: t("nav.team"), href: "/team" },
    { label: t("nav.media"), href: "/media" },
    { label: t("nav.projects"), href: "/projects" },
    { label: t("nav.shareholders"), href: "/media?tab=shareholders" },
  ];

  return (
    <header
      data-nav-theme={theme}
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
        scrolled
          ? isDark ? "bg-eag-black" : "bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center px-6 py-5 lg:px-10"
      >
        {/* Logo — left */}
        <Link
          to="/"
          className={`inline-flex items-center self-center no-underline transition-colors duration-300 ${
            isDark ? "text-eag-white" : "text-eag-gray-900"
          }`}
        >
          <EagLogo className="h-6 w-auto" />
          <span className="sr-only">EAG</span>
        </Link>

        {/* Desktop nav — centered */}
        <div className="hidden items-center justify-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-link relative pb-1 text-a4 no-underline transition-colors duration-300 ${
                isDark
                  ? "text-eag-gray-300 hover:text-eag-white"
                  : "text-eag-gray-600 hover:text-eag-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side — language + CTA */}
        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-2 text-a4">
            <button
              type="button"
              onClick={() => setLang("cs")}
              className={`cursor-pointer bg-transparent border-none no-underline transition-colors duration-300 ${
                lang === "cs"
                  ? isDark
                    ? "font-medium text-eag-white"
                    : "font-medium text-eag-gray-900"
                  : isDark
                    ? "text-eag-gray-500 hover:text-eag-white"
                    : "text-eag-gray-400 hover:text-eag-gray-900"
              }`}
            >
              CZ
            </button>
            <span
              className={`transition-colors duration-300 ${
                isDark ? "text-eag-gray-600" : "text-eag-gray-300"
              }`}
            >
              /
            </span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`cursor-pointer bg-transparent border-none no-underline transition-colors duration-300 ${
                lang === "en"
                  ? isDark
                    ? "font-medium text-eag-white"
                    : "font-medium text-eag-gray-900"
                  : isDark
                    ? "text-eag-gray-500 hover:text-eag-white"
                    : "text-eag-gray-400 hover:text-eag-gray-900"
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer rounded-full border-none bg-eag-teal px-6 py-2.5 text-a4 font-medium text-eag-white no-underline transition-colors hover:bg-eag-teal-dark"
          >
            {t("nav.contact")}
          </button>
        </div>

        {/* Mobile menu button */}
        <AriaButton
          onPress={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={`cursor-pointer justify-self-end transition-colors duration-300 lg:hidden ${
            isDark ? "text-eag-white" : "text-eag-gray-900"
          }`}
        >
          {mobileOpen ? <X size={28} /> : <List size={28} />}
        </AriaButton>
      </nav>

      {/* Mobile nav — fullscreen glassmorphism overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex h-dvh flex-col overflow-hidden lg:hidden">
          {/* Dark glass background */}
          <div className="absolute inset-0 bg-eag-black/90 backdrop-blur-md" style={{ WebkitBackdropFilter: "blur(12px)" }} />
          {/* Close button area — aligned with hamburger */}
          <div className="relative flex items-center justify-between px-6 py-5">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center text-white no-underline"
            >
              <EagLogo className="h-6 w-auto" />
              <span className="sr-only">EAG</span>
            </Link>
            <AriaButton
              onPress={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="cursor-pointer text-white"
            >
              <X size={28} />
            </AriaButton>
          </div>

          {/* Nav links — centered vertically */}
          <div className="relative flex flex-1 flex-col justify-center gap-6 px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-b2 text-white/70 no-underline transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Bottom section — lang switch + CTA */}
          <div className="relative flex items-center justify-between px-6 pb-10" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom, 2.5rem))" }}>
            <div className="flex items-center gap-3 text-a3">
              <button
                type="button"
                onClick={() => setLang("cs")}
                className={`cursor-pointer bg-transparent border-none no-underline transition-colors hover:text-white ${
                  lang === "cs" ? "font-medium text-white" : "text-white/40"
                }`}
              >
                CZ
              </button>
              <span className="text-white/20">/</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`cursor-pointer bg-transparent border-none no-underline transition-colors hover:text-white ${
                  lang === "en" ? "font-medium text-white" : "text-white/40"
                }`}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cursor-pointer rounded-full border-none bg-eag-teal px-6 py-3 text-a3 font-medium text-white no-underline transition-colors hover:bg-eag-teal-dark"
            >
              {t("nav.contact")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
