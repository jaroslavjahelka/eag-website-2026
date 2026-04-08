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
      "Leading digital transformation of the automotive market across Europe.",
    "home.mission.body":
      "We build and invest in growth companies that are leaders of their fields — with strong technology foundations and the ambition to cover the entire vehicle lifecycle, from selection and financing through purchase, insurance, and servicing to resale.",

    /* Home — Strategy */
    "home.strategy.label": "Our Strategy",
    "home.strategy.title":
      "Monetizing the vehicle across its entire life cycle — from first sale to final service.",
    "home.strategy.body":
      "We use advanced data analytics and new sales channels to reshape how vehicles are sold and managed. The market is changing — and we're building the technology to lead it.",

    /* Home — Investments */
    "home.investments.label": "Our Investments",
    "home.investments.title":
      "We acquire market leaders and build what doesn't exist yet.",
    "home.investments.body":
      "Our portfolio companies optimize processes and sales channels across the automotive segment. We look for synergy across the group and maximize each project's potential.",
    "home.investments.allProjects": "All projects",

    /* Home — Team */
    "home.team.label": "Our Team",
    "home.team.title": "We connect visions and experience",
    "home.team.body":
      "Each company in our portfolio has a strong team lead by experienced managers. We are still looking for and meeting new colleagues — people with enthusiasm, passion, experience and domain knowledge.",
    "home.team.link": "Our people",

    /* Home — Contact */
    "home.contact.title1": "Build automotive infrastructure with us.",
    "home.contact.title2": "Get in touch.",
    "home.contact.name": "Full name",
    "home.contact.name.placeholder": "John Doe",
    "home.contact.email": "Email",
    "home.contact.email.placeholder": "john@example.com",
    "home.contact.message": "Message",
    "home.contact.message.placeholder": "Tell us about your project or idea…",
    "home.contact.send": "Send message",
    "home.contact.sending": "Sending…",
    "home.contact.success.title": "Thank you, your message has been sent successfully",
    "home.contact.success.body": "We'll get back to you as soon as possible.",
    "home.contact.error.general": "Please fix the errors below and try again.",
    "home.contact.error.name": "Please enter your full name.",
    "home.contact.error.email.empty": "Please enter your email.",
    "home.contact.error.email.format": "Wrong email format",
    "home.contact.error.message": "Your message should be at least 10 characters.",
    "home.contact.error.server": "Something went wrong. Please try again later.",

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
    "timeline.2026.automotive-systems.title": "Acquisition of Automotive Systems",
    "timeline.2026.automotive-systems.desc": "The EAG group successfully acquired Automotive Systems.",
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
    "team.join": "Shape the future",
    "team.joinSub": "of automotive with us",
    "team.joinBody": "We're always looking for talented people who want to make an impact. If that sounds like you, let's talk.",
    "team.joinCta": "Get in touch",

    /* Media page */
    "media.label": "Media",
    "media.title1": "News and",
    "media.title2": "press coverage",
    "media.subtitle":
      "Stay up to date with the latest news, press releases, and media coverage from across the EAG group.",
    "media.tab.news": "News",
    "media.tab.press": "Press Releases",
    "media.tab.downloads": "Downloads",
    "media.tab.shareholders": "For Shareholders",
    "media.readArticle": "Read article",
    "media.placeholder.press": "Press releases coming soon.",
    "media.downloads.policies": "EAG Policies",
    "media.shareholders.documents": "Documents for shareholders",

    /* Projects page */
    "projects.label": "Projects",
    "projects.title1": "Amazing projects and even",
    "projects.title2": "better companies",
    "projects.subtitle":
      "We only invest in leading companies in the automotive industry which focus on bringing new technologies into the industry to optimize their processes and sales. Our main goal is to utilize the potential of data analysis and introduce a brand new approach to the entire industry.",
    "projects.visitWebsite": "Visit website",

    /* Home — Stats */
    "home.stats.portfolio": "Portfolio companies",
    "home.stats.markets": "European markets",
    "home.stats.clients": "Clients across platforms",
    "home.stats.vehicles": "Vehicles verified",

    /* Home — News */
    "home.news.title": "Latest from EAG",
    "home.news.viewAll": "View all",

    /* Home — Europe Map */
    "home.map.line1": "12+ European markets.",
    "home.map.line2": "One connected platform.",

    /* Team page — Hero */
    "team.hero.title": "The people behind our vision",
    "team.hero.subtitle": "Our leadership team brings together decades of experience in technology, automotive, and investment to drive the digital transformation of how vehicles are sold and managed across Europe.",

    /* Team roles */
    "team.role.sulta": "CEO and Chairman of the Board",
    "team.role.kratochvil": "CIO and Member of the Board",
    "team.role.svoren": "Member of the Board",
    "team.role.galik": "CPO",
    "team.role.kofron": "CTO",
    "team.role.dusek": "CMO",
    "team.role.muller": "CBO",
    "team.role.navratil": "CSO, Omnetic",
    "team.role.pajer": "CEO, Cebia",
    "team.role.rorive": "CEO, Fastback srl.",
    "team.role.stanski": "CEO, SoftVig",

    /* Project details */
    "project.carvago.tagline": "European used car online marketplace",
    "project.carvago.desc": "800K+ vehicles with integrated services including inspections, logistics, financing, insurance, and servicing across Europe.",
    "project.carvago.stat1.label": "European markets",
    "project.carvago.stat1.value": "9",
    "project.carvago.stat2.label": "Professional partners",
    "project.carvago.stat2.value": "30K",

    "project.omnetic.tagline": "Dealership management system",
    "project.omnetic.desc": "Leading DMS provider for authorized dealerships and automotive third parties in the CEE region.",
    "project.omnetic.stat1.label": "Clients",
    "project.omnetic.stat1.value": "5,700",
    "project.omnetic.stat2.label": "Countries",
    "project.omnetic.stat2.value": "12",

    "project.cebia.tagline": "Vehicle verification and security",
    "project.cebia.desc": "Vehicle verification and security services in Czechia, Slovakia, and Romania.",
    "project.cebia.stat1.label": "Verified cars",
    "project.cebia.stat1.value": "30M+",
    "project.cebia.stat2.label": "Data source countries",
    "project.cebia.stat2.value": "32+",

    "project.fastback.tagline": "Online B2B trading platform",
    "project.fastback.desc": "Online B2B trading platform for used vehicle stock management and trade-ins.",
    "project.fastback.stat1.label": "Cars sold in 2022",
    "project.fastback.stat1.value": "75,000+",
    "project.fastback.stat2.label": "Dealerships",
    "project.fastback.stat2.value": "2,300+",

    "project.softvig.tagline": "Systems for importers and dealers",
    "project.softvig.desc": "IT solutions for importers and dealerships in Poland since 2000.",
    "project.softvig.stat1.label": "Dealerships",
    "project.softvig.stat1.value": "800+",
    "project.softvig.stat2.label": "Top 10 dealers in Poland",
    "project.softvig.stat2.value": "8",

    "project.teas.tagline": "Dealership management system",
    "project.teas.desc": "Largest DMS provider in the Czech Republic and Slovakia for dealerships and service centers.",
    "project.teas.stat1.label": "CZK yearly revenue",
    "project.teas.stat1.value": "120B",
    "project.teas.stat2.label": "Vehicles sold yearly",
    "project.teas.stat2.value": "250K",

    "project.caraudit.tagline": "Automatized and detailed car inspection",
    "project.caraudit.desc": "Mobile app for digitalized vehicle inspection and fleet management.",
    "project.caraudit.stat1.label": "Vehicles checked monthly",
    "project.caraudit.stat1.value": "10K",
    "project.caraudit.stat2.label": "Car manufacturers",
    "project.caraudit.stat2.value": "13",

    "project.carsdata.tagline": "Market and dealership analytics tool",
    "project.carsdata.desc": "Market and dealership analytics tool covering 16 European nations.",
    "project.carsdata.stat1.label": "Ads analyzed daily",
    "project.carsdata.stat1.value": "6.5M",
    "project.carsdata.stat2.label": "Data sources",
    "project.carsdata.stat2.value": "135",

    "project.jbr.tagline": "IT systems for the automotive industry",
    "project.jbr.desc": "Polish IT system developer optimizing workflow for automotive manufacturers.",
    "project.jbr.stat1.label": "Years of experience",
    "project.jbr.stat1.value": "30+",
    "project.jbr.stat2.label": "Customer service",
    "project.jbr.stat2.value": "24/7",

    "project.instamotion.tagline": "Online car dealer",
    "project.instamotion.desc": "Largest online dealer of used and nearly-new cars in the German market.",
    "project.instamotion.stat1.label": "Partners in Germany",
    "project.instamotion.stat1.value": "400+",
    "project.instamotion.stat2.label": "Offers",
    "project.instamotion.stat2.value": "30,000+",

    "project.autrado.tagline": "Dealer Management Systems",
    "project.autrado.desc": "DMS software for dealerships with vehicle management and lead tools.",
    "project.autrado.stat1.label": "Partners in Europe",
    "project.autrado.stat1.value": "320+",
    "project.autrado.stat2.label": "Years of experience",
    "project.autrado.stat2.value": "20+",

    "project.carobserver.tagline": "Professional Margin Optimization",
    "project.carobserver.desc": "Margin optimization for manufacturers and dealerships via pricing analytics.",
    "project.carobserver.stat1.label": "Vehicle analyses",
    "project.carobserver.stat1.value": "50M",
    "project.carobserver.stat2.label": "Dealership clients",
    "project.carobserver.stat2.value": "500+",

    "project.dotzilla.tagline": "Digital Marketing Solutions",
    "project.dotzilla.desc": "Digital marketing solutions including SEO and DMS middleware since 2002.",
    "project.dotzilla.stat1.label": "Dealerships served",
    "project.dotzilla.stat1.value": "1,000+",
    "project.dotzilla.stat2.label": "Years of experience",
    "project.dotzilla.stat2.value": "20+",

    "project.automotive-systems.tagline": "Dealer Management System",
    "project.automotive-systems.desc": "IT solutions and dealer management system for car dealerships across Belgium, Luxembourg and Switzerland.",
    "project.automotive-systems.stat1.label": "Active sites",
    "project.automotive-systems.stat1.value": "300+",
    "project.automotive-systems.stat2.label": "Users",
    "project.automotive-systems.stat2.value": "2,300+",

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
    "company.automotive-systems": "Dealer Management System",
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
      "Vedeme digitální transformaci automobilového trhu napříč Evropou.",
    "home.mission.body":
      "Budujeme a investujeme do růstových společností, které jsou lídry svých oborů — se silným technologickým zázemím a ambicí pokrýt celý životní cyklus vozidla od výběru a financování přes nákup, pojištění a servis až po další prodej.",

    /* Home — Strategy */
    "home.strategy.label": "Naše strategie",
    "home.strategy.title":
      "Monetizujeme vozidlo napříč celým životním cyklem — od prvního prodeje po poslední servis.",
    "home.strategy.body":
      "Využíváme pokročilou datovou analytiku a nové prodejní kanály k proměně způsobu, jakým se vozidla prodávají a spravují. Trh se mění — a my stavíme technologie, které ho povedou.",

    /* Home — Investments */
    "home.investments.label": "Naše investice",
    "home.investments.title":
      "Akvírujeme lídry trhu a budujeme to, co zatím neexistuje.",
    "home.investments.body":
      "Naše portfoliové společnosti optimalizují procesy a prodejní kanály v automobilovém segmentu. Hledáme synergii napříč skupinou a maximalizujeme potenciál každého projektu.",
    "home.investments.allProjects": "Všechny projekty",

    /* Home — Team */
    "home.team.label": "Náš tým",
    "home.team.title": "Spojujeme vize a zkušenosti",
    "home.team.body":
      "Každá společnost v našem portfoliu má silný tým vedený zkušenými manažery. Stále hledáme a potkáváme nové kolegy — lidi s nadšením, vášní, zkušenostmi a znalostí oboru.",
    "home.team.link": "Naši lidé",

    /* Home — Contact */
    "home.contact.title1": "Budujte automotive infrastrukturu s námi.",
    "home.contact.title2": "Ozvěte se.",
    "home.contact.name": "Celé jméno",
    "home.contact.name.placeholder": "Jan Novák",
    "home.contact.email": "E-mail",
    "home.contact.email.placeholder": "jan@priklad.cz",
    "home.contact.message": "Zpráva",
    "home.contact.message.placeholder": "Řekněte nám o vašem projektu nebo nápadu…",
    "home.contact.send": "Odeslat zprávu",
    "home.contact.sending": "Odesílám…",
    "home.contact.success.title": "Děkujeme, vaše zpráva byla úspěšně odeslána",
    "home.contact.success.body": "Ozveme se vám co nejdříve.",
    "home.contact.error.general": "Opravte prosím chyby níže a zkuste to znovu.",
    "home.contact.error.name": "Zadejte prosím celé jméno.",
    "home.contact.error.email.empty": "Zadejte prosím váš email.",
    "home.contact.error.email.format": "Špatný formát emailu",
    "home.contact.error.message": "Zpráva musí mít alespoň 10 znaků.",
    "home.contact.error.server": "Něco se pokazilo. Zkuste to prosím později.",

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
    "timeline.2026.automotive-systems.title": "Akvizice Automotive Systems",
    "timeline.2026.automotive-systems.desc": "Skupina EAG úspěšně akvírovala společnost Automotive Systems.",
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
    "team.join": "Utvářejte budoucnost",
    "team.joinSub": "automotive s námi",
    "team.joinBody": "Hledáme talentované lidi, kteří chtějí měnit věci k lepšímu. Pokud je to o vás, ozvěte se.",
    "team.joinCta": "Napište nám",

    /* Media page */
    "media.label": "Média",
    "media.title1": "Novinky a",
    "media.title2": "mediální pokrytí",
    "media.subtitle":
      "Sledujte nejnovější zprávy, tiskové zprávy a mediální pokrytí z celé skupiny EAG.",
    "media.tab.news": "Novinky",
    "media.tab.press": "Tiskové zprávy",
    "media.tab.downloads": "Ke stažení",
    "media.tab.shareholders": "Pro akcionáře",
    "media.readArticle": "Číst článek",
    "media.placeholder.press": "Tiskové zprávy budou brzy k dispozici.",
    "media.downloads.policies": "Politiky EAG",
    "media.shareholders.documents": "Dokumenty pro akcionáře",

    /* Projects page */
    "projects.label": "Projekty",
    "projects.title1": "Úžasné projekty a ještě",
    "projects.title2": "lepší společnosti",
    "projects.subtitle":
      "Investujeme pouze do předních společností v automobilovém průmyslu, které se zaměřují na zavádění nových technologií do odvětví za účelem optimalizace procesů a prodeje. Naším hlavním cílem je využít potenciál analýzy dat a přinést zcela nový přístup do celého odvětví.",
    "projects.visitWebsite": "Navštívit web",

    /* Home — Stats */
    "home.stats.portfolio": "Portfoliové společnosti",
    "home.stats.markets": "Evropské trhy",
    "home.stats.clients": "Klienti napříč platformami",
    "home.stats.vehicles": "Ověřených vozidel",

    /* Home — News */
    "home.news.title": "Novinky z EAG",
    "home.news.viewAll": "Zobrazit vše",

    /* Home — Europe Map */
    "home.map.line1": "12+ evropských trhů.",
    "home.map.line2": "Jedna propojená platforma.",

    /* Team page — Hero */
    "team.hero.title": "Lidé za naší vizí",
    "team.hero.subtitle": "Náš vedoucí tým spojuje desetiletí zkušeností v technologiích, automobilovém průmyslu a investicích, aby vedl digitální transformaci způsobu, jakým se vozidla prodávají a spravují napříč Evropou.",

    /* Team roles */
    "team.role.sulta": "CEO a předseda představenstva",
    "team.role.kratochvil": "CIO a člen představenstva",
    "team.role.svoren": "Člen představenstva",
    "team.role.galik": "CPO",
    "team.role.kofron": "CTO",
    "team.role.dusek": "CMO",
    "team.role.muller": "CBO",
    "team.role.navratil": "CSO, Omnetic",
    "team.role.pajer": "CEO, Cebia",
    "team.role.rorive": "CEO, Fastback srl.",
    "team.role.stanski": "CEO, SoftVig",

    /* Project details */
    "project.carvago.tagline": "Evropský online marketplace ojetých vozidel",
    "project.carvago.desc": "800 000+ vozidel s integrovanými službami včetně inspekcí, logistiky, financování, pojištění a servisu napříč Evropou.",
    "project.carvago.stat1.label": "Evropské trhy",
    "project.carvago.stat2.label": "Profesionální partneři",

    "project.omnetic.tagline": "Systém řízení dealerství",
    "project.omnetic.desc": "Přední poskytovatel DMS pro autorizované dealerství a automobilové třetí strany v regionu střední a východní Evropy.",
    "project.omnetic.stat1.label": "Klienti",
    "project.omnetic.stat2.label": "Země",

    "project.cebia.tagline": "Ověřování a zabezpečení vozidel",
    "project.cebia.desc": "Služby ověřování a zabezpečení vozidel v Česku, na Slovensku a v Rumunsku.",
    "project.cebia.stat1.label": "Ověřených vozidel",
    "project.cebia.stat2.label": "Země zdrojových dat",

    "project.fastback.tagline": "Online B2B obchodní platforma",
    "project.fastback.desc": "Online B2B obchodní platforma pro správu skladu ojetých vozidel a výkup.",
    "project.fastback.stat1.label": "Prodaných vozidel v 2022",
    "project.fastback.stat2.label": "Dealerství",

    "project.softvig.tagline": "Systémy pro importéry a dealery",
    "project.softvig.desc": "IT řešení pro importéry a dealerství v Polsku od roku 2000.",
    "project.softvig.stat1.label": "Dealerství",
    "project.softvig.stat2.label": "Top 10 dealerů v Polsku",

    "project.teas.tagline": "Systém řízení dealerství",
    "project.teas.desc": "Největší poskytovatel DMS v České republice a na Slovensku pro dealerství a servisní centra.",
    "project.teas.stat1.label": "Roční obrat v CZK",
    "project.teas.stat2.label": "Prodaných vozidel ročně",

    "project.caraudit.tagline": "Automatizovaná a detailní inspekce vozidel",
    "project.caraudit.desc": "Mobilní aplikace pro digitalizovanou inspekci vozidel a správu flotily.",
    "project.caraudit.stat1.label": "Zkontrolovaných vozidel měsíčně",
    "project.caraudit.stat2.label": "Výrobci automobilů",

    "project.carsdata.tagline": "Analytický nástroj pro trh a dealerství",
    "project.carsdata.desc": "Analytický nástroj pro trh a dealerství pokrývající 16 evropských zemí.",
    "project.carsdata.stat1.label": "Analyzovaných inzerátů denně",
    "project.carsdata.stat2.label": "Datové zdroje",

    "project.jbr.tagline": "IT systémy pro automobilový průmysl",
    "project.jbr.desc": "Polský vývojář IT systémů optimalizující procesy pro automobilové výrobce.",
    "project.jbr.stat1.label": "Let zkušeností",
    "project.jbr.stat2.label": "Zákaznický servis",

    "project.instamotion.tagline": "Online prodejce vozidel",
    "project.instamotion.desc": "Největší online prodejce ojetých a téměř nových vozidel na německém trhu.",
    "project.instamotion.stat1.label": "Partnerů v Německu",
    "project.instamotion.stat2.label": "Nabídek",

    "project.autrado.tagline": "Systémy řízení dealerství",
    "project.autrado.desc": "DMS software pro dealerství se správou vozidel a nástroji pro leady.",
    "project.autrado.stat1.label": "Partnerů v Evropě",
    "project.autrado.stat2.label": "Let zkušeností",

    "project.carobserver.tagline": "Profesionální optimalizace marží",
    "project.carobserver.desc": "Optimalizace marží pro výrobce a dealerství prostřednictvím cenové analytiky.",
    "project.carobserver.stat1.label": "Analýz vozidel",
    "project.carobserver.stat2.label": "Dealerských klientů",

    "project.dotzilla.tagline": "Řešení digitálního marketingu",
    "project.dotzilla.desc": "Řešení digitálního marketingu včetně SEO a DMS middleware od roku 2002.",
    "project.dotzilla.stat1.label": "Obsluhovaných dealerství",
    "project.dotzilla.stat2.label": "Let zkušeností",

    "project.automotive-systems.tagline": "Systém řízení dealerství",
    "project.automotive-systems.desc": "IT řešení a systém řízení dealerství pro autosalony v Belgii, Lucembursku a Švýcarsku.",
    "project.automotive-systems.stat1.label": "Aktivních poboček",
    "project.automotive-systems.stat2.label": "Uživatelů",

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
    "company.automotive-systems": "Systém řízení dealerství",
  },
};
