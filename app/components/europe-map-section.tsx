import { useRef, useEffect, useState } from "react";

/**
 * Fullscreen dark pinned section — SVG Europe map with GSAP letter reveal.
 * Loads real GeoJSON country shapes, projects via Mercator, highlights EAG markets.
 */

const GEOJSON_URL = "/assets/ne_110m_admin_0_countries.geojson";

const EAG_ISOS = new Set(["CZ", "SK", "PL", "HU", "DE", "AT", "NL", "BE", "IT", "FR", "ES", "RO"]);

/* Countries to render (European region) */
const EU_ISOS = new Set([
  "CZ","DE","AT","NL","HU","RO","HR","ES","FR","IT","PL","GB","SE","NO",
  "FI","PT","BE","CH","DK","SK","RS","BG","GR","IE","LT","LV","EE","UA",
  "BY","MD","AL","BA","ME","MK","SI","LU","IS","TR",
]);

/* ── Simple Mercator projection ── */

function mercatorX(lng: number): number {
  return (lng + 180) * (1000 / 360);
}

function mercatorY(lat: number): number {
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  return 500 - (mercN * 1000) / (2 * Math.PI);
}

/* Project a GeoJSON polygon ring to SVG path commands */
function ringToPath(coords: number[][]): string {
  return coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${mercatorX(c[0]).toFixed(1)},${mercatorY(c[1]).toFixed(1)}`)
    .join(" ") + "Z";
}

/* Convert a GeoJSON geometry to a full SVG path `d` string */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function geometryToPath(geo: any): string {
  if (geo.type === "Polygon") {
    return geo.coordinates.map(ringToPath).join(" ");
  }
  if (geo.type === "MultiPolygon") {
    return geo.coordinates
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((poly: any) => poly.map(ringToPath).join(" "))
      .join(" ");
  }
  return "";
}

/* ── City dots ── */
const CITIES = [
  { lat: 50.08, lng: 14.44, label: "Prague" },
  { lat: 48.15, lng: 17.11, label: "Bratislava" },
  { lat: 52.23, lng: 21.01, label: "Warsaw" },
  { lat: 47.50, lng: 19.04, label: "Budapest" },
  { lat: 52.52, lng: 13.40, label: "Berlin" },
  { lat: 48.21, lng: 16.37, label: "Vienna" },
  { lat: 52.37, lng:  4.90, label: "Amsterdam" },
  { lat: 50.85, lng:  4.35, label: "Brussels" },
  { lat: 41.90, lng: 12.50, label: "Rome" },
  { lat: 48.86, lng:  2.35, label: "Paris" },
  { lat: 40.42, lng: -3.70, label: "Madrid" },
  { lat: 41.39, lng:  2.17, label: "Barcelona" },
  { lat: 44.43, lng: 26.10, label: "Bucharest" },
];

/* ── Viewport for Europe (in projected coords) ── */
const VIEW_LEFT   = mercatorX(-12);
const VIEW_RIGHT  = mercatorX(32);
const VIEW_TOP    = mercatorY(62);
const VIEW_BOTTOM = mercatorY(34);
const VIEW_W = VIEW_RIGHT - VIEW_LEFT;
const VIEW_H = VIEW_BOTTOM - VIEW_TOP;

/* ── Component ── */

interface CountryPath {
  iso: string;
  d: string;
  isEag: boolean;
}

export function EuropeMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const [countries, setCountries] = useState<CountryPath[]>([]);

  /* Load GeoJSON on mount */
  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((r) => r.json())
      .then((geojson) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const paths: CountryPath[] = geojson.features
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((f: any) => {
            const iso = f.properties.ISO_A2;
            return EU_ISOS.has(iso) || EAG_ISOS.has(iso);
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((f: any) => ({
            iso: f.properties.ISO_A2 as string,
            d: geometryToPath(f.geometry),
            isEag: EAG_ISOS.has(f.properties.ISO_A2),
          }));
        setCountries(paths);
      })
      .catch(() => {});
  }, []);

  /* GSAP: pin section, reveal chars on scrub */
  useEffect(() => {
    const section = sectionRef.current;
    const h1 = line1Ref.current;
    const h2 = line2Ref.current;
    if (!section || !h1 || !h2) return;

    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, stMod]) => {
        const gsap = gsapMod.gsap ?? gsapMod.default;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        gsap.registerPlugin(ScrollTrigger);

        /* Wrap each character in a span, grouped by word for proper line-breaking */
        function splitChars(el: HTMLElement): HTMLSpanElement[] {
          const text = el.textContent ?? "";
          el.textContent = "";
          el.style.display = "flex";
          el.style.flexWrap = "wrap";
          const chars: HTMLSpanElement[] = [];
          const words = text.split(" ");

          words.forEach((word, wi) => {
            // Word wrapper — keeps letters together
            const wordWrap = document.createElement("span");
            wordWrap.style.display = "inline-flex";
            wordWrap.style.whiteSpace = "nowrap";

            for (const ch of word) {
              const span = document.createElement("span");
              span.textContent = ch;
              span.style.display = "inline-block";
              span.style.opacity = "0";
              span.style.transform = "translateY(40px)";
              wordWrap.appendChild(span);
              chars.push(span);
            }

            el.appendChild(wordWrap);

            // Add a space between words (not after last word)
            if (wi < words.length - 1) {
              const space = document.createElement("span");
              space.innerHTML = "&nbsp;";
              space.style.display = "inline-block";
              space.style.width = "0.3em";
              el.appendChild(space);
            }
          });

          return chars;
        }

        ctx = gsap.context(() => {
          const chars1 = splitChars(h1);
          const chars2 = splitChars(h2);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=400%",
              pin: true,
              scrub: 0.8,
            },
          });

          /* Pause before text appears — just the map visible */
          tl.to({}, { duration: 0.6 });

          /* Stagger chars in — faster reveal */
          tl.to(chars1, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.6,
            ease: "power2.out",
          }, 0.6);

          tl.to(chars2, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.6,
            ease: "power2.out",
          }, 1.0);

          /* Hold fully visible — generous pause after */
          tl.to({}, { duration: 1.2 });
        }, section);
      },
    );

    return () => {
      ctx?.revert();
    };
  }, [countries]); // re-run after countries load so DOM is ready

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative flex h-svh items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── SVG Map ── */}
      <svg
        viewBox={`${VIEW_LEFT} ${VIEW_TOP} ${VIEW_W} ${VIEW_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="country-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background countries */}
        {countries
          .filter((c) => !c.isEag)
          .map((c) => (
            <path
              key={c.iso}
              d={c.d}
              fill="rgba(20, 184, 166, 0.04)"
              stroke="rgba(20, 184, 166, 0.15)"
              strokeWidth="0.3"
            />
          ))}

        {/* EAG countries — bright green */}
        {countries
          .filter((c) => c.isEag)
          .map((c) => (
            <g key={c.iso}>
              <path
                d={c.d}
                fill="rgba(20, 184, 166, 0.15)"
                stroke="#14b8a6"
                strokeWidth="0.5"
                filter="url(#country-glow)"
              />
            </g>
          ))}

        {/* City dots with pulse */}
        {CITIES.map((city) => {
          const cx = mercatorX(city.lng);
          const cy = mercatorY(city.lat);
          return (
            <g key={city.label}>
              <circle cx={cx} cy={cy} r="0.8" fill="#14b8a6" />
              <circle cx={cx} cy={cy} r="0.8" fill="none" stroke="#14b8a6" strokeWidth="0.3" opacity="0.5">
                <animate attributeName="r" from="0.8" to="3" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60" />

      {/* Text */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-5xl">
          <h2
            ref={line1Ref}
            className="text-b1 font-bold leading-[1.1] text-white lg:text-c5"
          >
            12+ European markets.
          </h2>
          <h2
            ref={line2Ref}
            className="mt-2 text-b1 font-bold leading-[1.1] text-white/40 lg:text-c5"
          >
            One connected platform.
          </h2>
        </div>
      </div>
    </section>
  );
}
