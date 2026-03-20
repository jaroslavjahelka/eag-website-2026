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

    /* Timeline entries */
    "timeline.2025.dotzilla.title": "Acquisition of Dotzilla",
    "timeline.2025.dotzilla.desc": "The EAG group successfully acquired Dotzilla.",
    "timeline.2025.carobserver.title": "Acquisition of CarObserver",
    "timeline.2025.carobserver.desc": "The EAG group successfully acquired CarObserver.",
    "timeline.2024.autrado.title": "Acquisition of Autrado",
    "timeline.2024.autrado.desc": "The EAG group successfully acquired Autrado.",
    "timeline.2024.instamotion.title": "Acquisition of Instamotion",
    "timeline.2024.instamotion.desc": "The EAG group successfully acquired Instamotion.",
    "timeline.2024.jbr.title": "Acquisition of JBR",
    "timeline.2024.jbr.desc": "The EAG group successfully acquired JBR.",
    "timeline.2022.softvig.title": "Acquisition of SoftVig",
    "timeline.2022.softvig.desc": "The EAG SE successfully acquired SoftVig.",
    "timeline.2022.fastback.title": "Acquisition of Fastback srl.",
    "timeline.2022.fastback.desc": "The EAG SE successfully acquired online B2B trading platform Fastback srl.",
    "timeline.2021.cebia.title": "Acquisition of Cebia",
    "timeline.2021.cebia.desc": "The EAG group successfully acquired company Cebia, spol. s r.o.",
    "timeline.2020.carvago.title": "The beginning of Carvago B2C",
    "timeline.2020.carvago.desc": "The launch of Carvago.com for end consumers. 900 000 vehicles on offer from 30 000 partners.",
    "timeline.2020.caraudit.title": "Investment into CarAudit",
    "timeline.2020.caraudit.desc": "The CarAudit mobile app is created with the aim of completely digitalizing vehicle purchasing and management.",
    "timeline.2019.carsdata.title": "Beta of CarsData",
    "timeline.2019.carsdata.desc": "Partners receive the advanced analytics tool CarsData for testing.",
    "timeline.2019.carvago.title": "The start of Carvago B2B",
    "timeline.2019.carvago.desc": "The launch of Carvago.com, the first European Marketplace for online B2B vehicle sales.",
    "timeline.2019.autosoft.title": "Acquisition of AutoSoft",
    "timeline.2019.autosoft.desc": "The EAG group successfully acquired company AUTOSOFT Company s.r.o.",
    "timeline.2019.teas.title": "Acquisition of TEAS",
    "timeline.2019.teas.desc": "The EAG group successfully acquired the company TEAS spol. s r.o.",
    "timeline.2019.portiva.title": "Portiva enters",
    "timeline.2019.portiva.desc": "The company Portiva becomes the primary shareholder of EAG.",
    "timeline.2018.eag.title": "The founding of the EAG holding",
    "timeline.2018.eag.desc": "The EAG holding is founded with the goal of creating a complex ecosystem of services for the automotive segment.",
    "timeline.2012.teas.title": "The most used DMS",
    "timeline.2012.teas.desc": "TEAS has reached more than 1000 installations in the Czech Republic and Slovakia and is the most used system in the automotive sector. Its solution is used by 32 car manufacturers and the 4 largest servicing networks.",
    "timeline.2010.teas.title": "TEAS replaces the competing DMS",
    "timeline.2010.teas.desc": "TEAS partners up with Ford, Kia, Toyota, Fiat, Alfa Romeo, Subaru, Škoda, Volkswagen, Nissan and other car manufacturers.",
    "timeline.2006.elit.title": "Elit implements TEAS",
    "timeline.2006.elit.desc": "TEAS is chosen as the main system for the ELIT network of car repair shops.",
    "timeline.2005.autosoft.title": "Autosoft celebrates its 500th client",
    "timeline.2005.autosoft.desc": "Autosoft has more than 500 installations in the Czech Republic and becomes the most used software for used car dealerships.",
    "timeline.2004.caris.title": "New Caris system",
    "timeline.2004.caris.desc": "TEAS launches Caris — a unique DMS which integrates the functionality of all existing systems into one solution.",
    "timeline.2002.mercedes.title": "Partnership with Mercedes-Benz",
    "timeline.2002.mercedes.desc": "TEAS begins to cooperate with Daimler AG in developing a DMS for Mercedes, Chrysler and Jeep.",
    "timeline.2001.hyundai.title": "Partnership with Hyundai",
    "timeline.2001.hyundai.desc": "TEAS is certified by Hyundai and becomes the dealership system for the Czech Republic.",
    "timeline.2000.renault.title": "Partnership with Renault",
    "timeline.2000.renault.desc": "TEAS is certified by Renault and delivers its system to more than 25 dealerships.",
    "timeline.1998.bosch.title": "Vehicle inspection system",
    "timeline.1998.bosch.desc": "The first system for the management of vehicle inspection and emissions testing centers is created together with Bosch.",
    "timeline.1997.mazda.title": "First official certification",
    "timeline.1997.mazda.desc": "TEAS becomes the first certified system for Mazda dealerships and importers and a certified system of Citroën.",
    "timeline.1993.teas.title": "Founding of TEAS",
    "timeline.1993.teas.desc": "TEAS launches its first complex solution for new car dealerships in the Czech Republic.",
    "timeline.1991.autosoft.title": "Founding of AutoSoft",
    "timeline.1991.autosoft.desc": "AutoSoft becomes the first software tool for dealership management in the Czech Republic.",

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

    /* Timeline entries */
    "timeline.2025.dotzilla.title": "Akvizice Dotzilla",
    "timeline.2025.dotzilla.desc": "Skupina EAG úspěšně akvírovala společnost Dotzilla.",
    "timeline.2025.carobserver.title": "Akvizice CarObserver",
    "timeline.2025.carobserver.desc": "Skupina EAG úspěšně akvírovala společnost CarObserver.",
    "timeline.2024.autrado.title": "Akvizice Autrado",
    "timeline.2024.autrado.desc": "Skupina EAG úspěšně akvírovala společnost Autrado.",
    "timeline.2024.instamotion.title": "Akvizice Instamotion",
    "timeline.2024.instamotion.desc": "Skupina EAG úspěšně akvírovala společnost Instamotion.",
    "timeline.2024.jbr.title": "Akvizice JBR",
    "timeline.2024.jbr.desc": "Skupina EAG úspěšně akvírovala společnost JBR.",
    "timeline.2022.softvig.title": "Akvizice SoftVig",
    "timeline.2022.softvig.desc": "Společnost EAG SE úspěšně akvírovala SoftVig.",
    "timeline.2022.fastback.title": "Akvizice Fastback srl.",
    "timeline.2022.fastback.desc": "Společnost EAG SE úspěšně akvírovala online B2B obchodní platformu Fastback srl.",
    "timeline.2021.cebia.title": "Akvizice Cebia",
    "timeline.2021.cebia.desc": "Skupina EAG úspěšně akvírovala společnost Cebia, spol. s r.o.",
    "timeline.2020.carvago.title": "Začátek Carvago B2C",
    "timeline.2020.carvago.desc": "Spuštění Carvago.com pro koncové spotřebitele. 900 000 vozidel v nabídce od 30 000 partnerů.",
    "timeline.2020.caraudit.title": "Investice do CarAudit",
    "timeline.2020.caraudit.desc": "Vzniká mobilní aplikace CarAudit s cílem kompletně digitalizovat nákup a správu vozidel.",
    "timeline.2019.carsdata.title": "Beta verze CarsData",
    "timeline.2019.carsdata.desc": "Partneři získávají pokročilý analytický nástroj CarsData k testování.",
    "timeline.2019.carvago.title": "Start Carvago B2B",
    "timeline.2019.carvago.desc": "Spuštění Carvago.com, prvního evropského marketplace pro online B2B prodej vozidel.",
    "timeline.2019.autosoft.title": "Akvizice AutoSoft",
    "timeline.2019.autosoft.desc": "Skupina EAG úspěšně akvírovala společnost AUTOSOFT Company s.r.o.",
    "timeline.2019.teas.title": "Akvizice TEAS",
    "timeline.2019.teas.desc": "Skupina EAG úspěšně akvírovala společnost TEAS spol. s r.o.",
    "timeline.2019.portiva.title": "Vstup Portivy",
    "timeline.2019.portiva.desc": "Společnost Portiva se stává hlavním akcionářem EAG.",
    "timeline.2018.eag.title": "Založení holdingu EAG",
    "timeline.2018.eag.desc": "Holding EAG je založen s cílem vytvořit komplexní ekosystém služeb pro automobilový segment.",
    "timeline.2012.teas.title": "Nejpoužívanější DMS",
    "timeline.2012.teas.desc": "TEAS dosáhl více než 1000 instalací v České republice a na Slovensku a je nejpoužívanějším systémem v automobilovém sektoru. Jeho řešení využívá 32 výrobců automobilů a 4 největší servisní sítě.",
    "timeline.2010.teas.title": "TEAS nahrazuje konkurenční DMS",
    "timeline.2010.teas.desc": "TEAS navazuje spolupráci s Ford, Kia, Toyota, Fiat, Alfa Romeo, Subaru, Škoda, Volkswagen, Nissan a dalšími výrobci automobilů.",
    "timeline.2006.elit.title": "Elit implementuje TEAS",
    "timeline.2006.elit.desc": "TEAS je zvolen jako hlavní systém pro síť autoservisů ELIT.",
    "timeline.2005.autosoft.title": "Autosoft slaví 500. klienta",
    "timeline.2005.autosoft.desc": "Autosoft má více než 500 instalací v České republice a stává se nejpoužívanějším softwarem pro bazary ojetých vozidel.",
    "timeline.2004.caris.title": "Nový systém Caris",
    "timeline.2004.caris.desc": "TEAS spouští Caris — unikátní DMS, který integruje funkcionalitu všech stávajících systémů do jednoho řešení.",
    "timeline.2002.mercedes.title": "Partnerství s Mercedes-Benz",
    "timeline.2002.mercedes.desc": "TEAS začíná spolupracovat s Daimler AG na vývoji DMS pro Mercedes, Chrysler a Jeep.",
    "timeline.2001.hyundai.title": "Partnerství s Hyundai",
    "timeline.2001.hyundai.desc": "TEAS je certifikován společností Hyundai a stává se dealerským systémem pro Českou republiku.",
    "timeline.2000.renault.title": "Partnerství s Renault",
    "timeline.2000.renault.desc": "TEAS je certifikován společností Renault a dodává svůj systém do více než 25 dealerství.",
    "timeline.1998.bosch.title": "Systém kontroly vozidel",
    "timeline.1998.bosch.desc": "Společně s firmou Bosch vzniká první systém pro správu stanic technické kontroly a měření emisí.",
    "timeline.1997.mazda.title": "První oficiální certifikace",
    "timeline.1997.mazda.desc": "TEAS se stává prvním certifikovaným systémem pro dealerství a importéry Mazda a certifikovaným systémem Citroën.",
    "timeline.1993.teas.title": "Založení TEAS",
    "timeline.1993.teas.desc": "TEAS spouští své první komplexní řešení pro dealerství nových vozidel v České republice.",
    "timeline.1991.autosoft.title": "Založení AutoSoft",
    "timeline.1991.autosoft.desc": "AutoSoft se stává prvním softwarovým nástrojem pro správu dealerství v České republice.",

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
