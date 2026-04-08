/**
 * llms.txt — structured information for AI models and LLM crawlers.
 * See https://llmstxt.org for the specification.
 * Accessible at /llms.txt
 */
export function loader() {
  const content = `# EAG

> International investment group focused on the digital transformation of the automotive market.

EAG (Evropská Autobazarová Grupa) builds and invests in growth companies that are leaders in the European automotive digital ecosystem. Founded in 1991, headquartered in Prague, Czech Republic.

## Portfolio Companies

- [Carvago](https://www.carvago.com): Online marketplace for verified used cars across Europe
- [Omnetic](https://www.omnetic.com): Dealer management system and automotive software platform
- [Cebia](https://www.cebia.cz): Vehicle history and verification services
- [Fastback](https://www.fastback.cz): Automotive logistics and transport solutions
- [Softvig](https://www.softvig.com): IT solutions for the automotive industry
- [Teas](https://www.teas.cz): Technical inspection and vehicle assessment
- [Carsdata](https://www.carsdata.cz): Automotive data and analytics
- [Caraudit](https://www.caraudit.cz): Vehicle inspection services
- [JBR](https://www.jbr.cz): Used car sales and remarketing
- [Instamotion](https://www.instamotion.com): Online car buying platform in Germany
- [Autrado](https://www.autrado.de): B2B automotive trading platform
- [Carobserver](https://www.carobserver.com): Market intelligence for automotive
- [Dotzilla](https://www.dotzilla.cz): Digital marketing for automotive
- [Automotive Systems](https://www.automotivesystems.cz): Integrated automotive software

## Key Facts

- Founded: 1991
- Headquarters: Prague, Czech Republic
- Markets: 12+ European countries
- Portfolio: 14 companies
- B2B clients: 5,700+
- Vehicles processed: 30M+

## Pages

- [Home](https://www.eag.cz): Company overview and mission
- [Projects](https://www.eag.cz/projects): Portfolio companies and investments
- [Our Story](https://www.eag.cz/story): History and timeline from 1991 to today
- [Team](https://www.eag.cz/team): Leadership team
- [Media](https://www.eag.cz/media): News, press coverage, and downloads

## Contact

- Email: info@eag.group
- Location: Prague, Czech Republic
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
