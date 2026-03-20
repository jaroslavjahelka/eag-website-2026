import { createContext, useContext, useState, useCallback } from "react";

export type Lang = "en" | "cs";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = useCallback(
    (key: string) => {
      const dict = translations[lang];
      return dict?.[key] ?? translations.en[key] ?? key;
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

/* ── Translations ─────────────────────────────────── */

const translations: Record<Lang, Record<string, string>> = {
  en: {
    /* Nav */
    "nav.home": "Home",
    "nav.story": "Our story",
    "nav.team": "Our team",
    "nav.media": "Media",
    "nav.projects": "Projects",
    "nav.shareholders": "For shareholders",
    "nav.contact": "Contact us",

    /* Footer */
    "footer.address": "EAG, Platnéřská 88/9, 110 00 Praha, Czech Republic",
    "footer.legal":
      "EAG SE, CRN: 29126169 located at Platnéřská 88/9, Prague with a registered address at Plynární 1617/10, Prague registered in the Commercial Register administered by the Municipal Court in Prague, File H 886",
    "footer.rights": "EAG SE. All rights reserved.",

    /* Home — Hero */
    "home.hero.text1": "We are an international investment group focused on",
    "home.hero.text2":
      "the digital transformation of the automotive market.",
    "home.hero.subtitle":
      "Building the connected automotive ecosystem across Europe.",
    "home.hero.cta": "Explore our projects",

    /* Home — Mission */
    "home.mission.title": "Our mission",
    "home.mission.lead":
      "We want to be the leader in digital technology in the automotive segment. We want to lead the disruption of the way vehicles are sold and managed.",
    "home.mission.body":
      "We build and invest in growth companies from the automotive segment from across Europe. We look for established companies which are leaders of their fields. We are interested in projects with a strong technological background or which are on the verge of disrupting the market.",

    /* Home — Strategy */
    "home.strategy.label": "Our Strategy",
    "home.strategy.title":
      "Our primary goal is to monetize the vehicle in its whole life cycle. We bring effectiveness and create entirely new income streams.",
    "home.strategy.body":
      "We use advanced data analytics to bring a new point of view of vehicle sales and management. We know that we are on the verge of a massive change and the winner will be the one who is able to establish new technologies and sales channels.",

    /* Home — Investments */
    "home.investments.label": "Our Investments",
    "home.investments.title":
      "Investments help accelerate our growth. We acquire the projects which already exist and build those which do not from scratch.",
    "home.investments.body":
      "We invest in technological companies which help optimize processes and sales channels in the automotive segment. We look for synergistic effects across our portfolio and the ability to use each project's potential to it's fullest. We focus primarily on outbound channels.",
    "home.investments.allProjects": "All projects",

    /* Home — Team */
    "home.team.label": "Our Team",
    "home.team.title": "We connect visions and experience",
    "home.team.body":
      "Each company in our portfolio has a strong team lead by experienced managers. We are still looking for and meeting new colleagues — people with enthusiasm, passion, experience and domain knowledge.",
    "home.team.link": "Our people",

    /* Home — Contact */
    "home.contact.title1": "Are we on the same wavelength?",
    "home.contact.title2": "Get in touch.",
    "home.contact.name": "Full name",
    "home.contact.email": "Email",
    "home.contact.message": "Message",
    "home.contact.send": "Send message",

    /* Home — Section Nav */
    "section.home": "Home",
    "section.mission": "Mission",
    "section.strategy": "Strategy",
    "section.investments": "Investments",
    "section.team": "Team",
    "section.contact": "Contact",

    /* Story page */
    "story.label": "Our story",
    "story.title1": "Our roots and",
    "story.title2": "our vision",
    "story.subtitle":
      "The EAG group was founded with the main goal of consolidating and monetizing the outbound channel in the automotive segment in Europe.",
    "story.journey": "Our journey",
    "story.journeySubtitle":
      "From a small Czech software company to an international automotive technology group.",

    /* Team page */
    "team.label": "Our team",
    "team.colleagues": "Our colleagues",
    "team.join": "Become a member of our team!",
    "team.joinCta": "Contact us via e-mail at",

    /* Media page */
    "media.label": "Media",
    "media.title1": "Our roots and",
    "media.title2": "our vision",
    "media.subtitle":
      "The EAG group was founded with the main goal of consolidating and monetizing the outbound channel in the automotive segment in Europe.",
    "media.tab.news": "News",
    "media.tab.press": "Press Releases",
    "media.tab.downloads": "Downloads",
    "media.tab.shareholders": "For Shareholders",
    "media.readArticle": "Read article",
    "media.placeholder.press": "Press releases coming soon.",
    "media.placeholder.downloads": "Downloads coming soon.",
    "media.placeholder.shareholders": "Shareholder information coming soon.",

    /* Projects page */
    "projects.label": "Projects",
    "projects.title1": "Amazing projects and even",
    "projects.title2": "better companies",
    "projects.subtitle":
      "We only invest in leading companies in the automotive industry which focus on bringing new technologies into the industry to optimize their processes and sales. Our main goal is to utilize the potential of data analysis and introduce a brand new approach to the entire industry.",
    "projects.visitWebsite": "Visit website",

    /* Company descriptions */
    "company.carvago": "European used car online marketplace",
    "company.omnetic": "Dealership management system",
    "company.cebia": "Vehicle verification and security",
    "company.fastback": "Online B2B trading platform",
    "company.softvig": "Systems for importers and dealers",
    "company.teas": "Dealership management system",
    "company.carsdata": "Market and dealership analytics tool",
    "company.caraudit": "Automatized and detailed car inspection",
    "company.jbr": "Manufacturer of IT systems for the automotive industry",
    "company.instamotion": "Online car dealer",
    "company.autrado": "Dealer Management Systems",
    "company.carobserver": "Professional Margin Optimization",
    "company.dotzilla": "Digital Marketing Solutions",
  },

  cs: {
    /* Nav */
    "nav.home": "Domů",
    "nav.story": "Náš příběh",
    "nav.team": "Náš tým",
    "nav.media": "Média",
    "nav.projects": "Projekty",
    "nav.shareholders": "Pro akcionáře",
    "nav.contact": "Kontaktujte nás",

    /* Footer */
    "footer.address": "EAG, Platnéřská 88/9, 110 00 Praha, Česká republika",
    "footer.legal":
      "EAG SE, IČO: 29126169 se sídlem Platnéřská 88/9, Praha, korespondenční adresa Plynární 1617/10, Praha, zapsaná v obchodním rejstříku vedeném Městským soudem v Praze, spis H 886",
    "footer.rights": "EAG SE. Všechna práva vyhrazena.",

    /* Home — Hero */
    "home.hero.text1":
      "Jsme mezinárodní investiční skupina zaměřená na",
    "home.hero.text2":
      "digitální transformaci automobilového trhu.",
    "home.hero.subtitle":
      "Budujeme propojený automobilový ekosystém napříč Evropou.",
    "home.hero.cta": "Prozkoumejte naše projekty",

    /* Home — Mission */
    "home.mission.title": "Naše mise",
    "home.mission.lead":
      "Chceme být lídrem v digitálních technologiích v automobilovém segmentu. Chceme vést disrupci způsobu, jakým se vozidla prodávají a spravují.",
    "home.mission.body":
      "Budujeme a investujeme do růstových společností z automobilového segmentu z celé Evropy. Hledáme zavedené společnosti, které jsou lídry ve svých oborech. Zajímají nás projekty se silným technologickým zázemím nebo ty, které jsou na prahu disrupce trhu.",

    /* Home — Strategy */
    "home.strategy.label": "Naše strategie",
    "home.strategy.title":
      "Naším hlavním cílem je monetizovat vozidlo v celém jeho životním cyklu. Přinášíme efektivitu a vytváříme zcela nové příjmové kanály.",
    "home.strategy.body":
      "Používáme pokročilou datovou analytiku, abychom přinesli nový pohled na prodej a správu vozidel. Víme, že jsme na prahu masivní změny a vítězem bude ten, kdo dokáže zavést nové technologie a prodejní kanály.",

    /* Home — Investments */
    "home.investments.label": "Naše investice",
    "home.investments.title":
      "Investice pomáhají urychlit náš růst. Akvírujeme projekty, které již existují, a budujeme ty, které zatím neexistují.",
    "home.investments.body":
      "Investujeme do technologických společností, které pomáhají optimalizovat procesy a prodejní kanály v automobilovém segmentu. Hledáme synergické efekty v rámci našeho portfolia a schopnost využít potenciál každého projektu na maximum. Zaměřujeme se především na odchozí kanály.",
    "home.investments.allProjects": "Všechny projekty",

    /* Home — Team */
    "home.team.label": "Náš tým",
    "home.team.title": "Spojujeme vize a zkušenosti",
    "home.team.body":
      "Každá společnost v našem portfoliu má silný tým vedený zkušenými manažery. Stále hledáme a potkáváme nové kolegy — lidi s nadšením, vášní, zkušenostmi a znalostí oboru.",
    "home.team.link": "Naši lidé",

    /* Home — Contact */
    "home.contact.title1": "Jsme na stejné vlně?",
    "home.contact.title2": "Ozvěte se nám.",
    "home.contact.name": "Celé jméno",
    "home.contact.email": "E-mail",
    "home.contact.message": "Zpráva",
    "home.contact.send": "Odeslat zprávu",

    /* Home — Section Nav */
    "section.home": "Domů",
    "section.mission": "Mise",
    "section.strategy": "Strategie",
    "section.investments": "Investice",
    "section.team": "Tým",
    "section.contact": "Kontakt",

    /* Story page */
    "story.label": "Náš příběh",
    "story.title1": "Naše kořeny a",
    "story.title2": "naše vize",
    "story.subtitle":
      "Skupina EAG byla založena s hlavním cílem konsolidovat a monetizovat odchozí kanál v automobilovém segmentu v Evropě.",
    "story.journey": "Naše cesta",
    "story.journeySubtitle":
      "Od malé české softwarové společnosti k mezinárodní automobilové technologické skupině.",

    /* Team page */
    "team.label": "Náš tým",
    "team.colleagues": "Naši kolegové",
    "team.join": "Staňte se členem našeho týmu!",
    "team.joinCta": "Kontaktujte nás e-mailem na",

    /* Media page */
    "media.label": "Média",
    "media.title1": "Naše kořeny a",
    "media.title2": "naše vize",
    "media.subtitle":
      "Skupina EAG byla založena s hlavním cílem konsolidovat a monetizovat odchozí kanál v automobilovém segmentu v Evropě.",
    "media.tab.news": "Novinky",
    "media.tab.press": "Tiskové zprávy",
    "media.tab.downloads": "Ke stažení",
    "media.tab.shareholders": "Pro akcionáře",
    "media.readArticle": "Číst článek",
    "media.placeholder.press": "Tiskové zprávy budou brzy k dispozici.",
    "media.placeholder.downloads": "Soubory ke stažení budou brzy k dispozici.",
    "media.placeholder.shareholders": "Informace pro akcionáře budou brzy k dispozici.",

    /* Projects page */
    "projects.label": "Projekty",
    "projects.title1": "Úžasné projekty a ještě",
    "projects.title2": "lepší společnosti",
    "projects.subtitle":
      "Investujeme pouze do předních společností v automobilovém průmyslu, které se zaměřují na zavádění nových technologií do odvětví za účelem optimalizace procesů a prodeje. Naším hlavním cílem je využít potenciál analýzy dat a přinést zcela nový přístup do celého odvětví.",
    "projects.visitWebsite": "Navštívit web",

    /* Company descriptions */
    "company.carvago": "Evropský online marketplace ojetých vozidel",
    "company.omnetic": "Systém řízení autorizovaných dealerství",
    "company.cebia": "Ověřování a zabezpečení vozidel",
    "company.fastback": "Online B2B obchodní platforma",
    "company.softvig": "Systémy pro importéry a dealery",
    "company.teas": "Systém řízení dealerství",
    "company.carsdata": "Analytický nástroj pro trh a dealerství",
    "company.caraudit": "Automatizovaná a detailní inspekce vozidel",
    "company.jbr": "Výrobce IT systémů pro automobilový průmysl",
    "company.instamotion": "Online prodejce vozidel",
    "company.autrado": "Systémy řízení dealerství",
    "company.carobserver": "Profesionální optimalizace marží",
    "company.dotzilla": "Řešení digitálního marketingu",
  },
};
