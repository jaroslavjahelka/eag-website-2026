import { useRef, useEffect, useState, useCallback } from "react";

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

/* ── Pre-split text lines into words+chars for React rendering ── */
const LINE1 = "12+ European markets.";
const LINE2 = "One connected platform.";

function splitWords(text: string) {
  return text.split(" ").map((word) => ({
    word,
    chars: word.split(""),
  }));
}

const LINE1_WORDS = splitWords(LINE1);
const LINE2_WORDS = splitWords(LINE2);

/* ── Component ── */

interface CountryPath {
  iso: string;
  d: string;
  isEag: boolean;
}

export function EuropeMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<CountryPath[]>([]);
  const chars1Ref = useRef<HTMLSpanElement[]>([]);
  const chars2Ref = useRef<HTMLSpanElement[]>([]);
  const gsapReady = useRef(false);

  const char1Ref = useCallback((el: HTMLSpanElement | null) => {
    if (el && !chars1Ref.current.includes(el)) {
      chars1Ref.current.push(el);
    }
  }, []);

  const char2Ref = useCallback((el: HTMLSpanElement | null) => {
    if (el && !chars2Ref.current.includes(el)) {
      chars2Ref.current.push(el);
    }
  }, []);

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
    if (gsapReady.current) return;
    const section = sectionRef.current;
    const chars1 = chars1Ref.current;
    const chars2 = chars2Ref.current;
    if (!section || chars1.length === 0 || chars2.length === 0) return;
    gsapReady.current = true;

    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, stMod]) => {
        const gsap = gsapMod.gsap ?? gsapMod.default;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.set(chars1, { opacity: 0, y: 30 });
          gsap.set(chars2, { opacity: 0, y: 30 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 0.4,
            },
          });

          tl.to({}, { duration: 0.15 });

          tl.to(chars1, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
          }, 0.15);

          tl.to(chars2, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: "power2.out",
          }, 0.45);

          tl.to({}, { duration: 0.6 });
        }, section);
      },
    );

    return () => {
      ctx?.revert();
    };
  });

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative flex h-svh items-center overflow-hidden bg-eag-black"
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-eag-black via-eag-black/40 to-eag-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-eag-black/60 via-transparent to-eag-black/60" />

      {/* Text */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-5xl text-b1 font-bold leading-[1.1] text-white lg:text-c5">
          <h2 className="flex flex-wrap" aria-label={LINE1}>
            {LINE1_WORDS.map((w, wi) => (
              <span key={wi} className="inline-flex shrink-0 whitespace-nowrap">
                {w.chars.map((ch, ci) => (
                  <span key={ci} ref={char1Ref} className="inline-block" aria-hidden="true">
                    {ch}
                  </span>
                ))}
                {wi < LINE1_WORDS.length - 1 && (
                  <span ref={char1Ref} className="inline-block w-[0.25em]">{"\u00A0"}</span>
                )}
              </span>
            ))}
          </h2>
          <p className="mt-2 flex flex-wrap" aria-label={LINE2}>
            {LINE2_WORDS.map((w, wi) => (
              <span key={wi} className="inline-flex shrink-0 whitespace-nowrap">
                {w.chars.map((ch, ci) => (
                  <span key={ci} ref={char2Ref} className="inline-block" aria-hidden="true">
                    {ch}
                  </span>
                ))}
                {wi < LINE2_WORDS.length - 1 && (
                  <span ref={char2Ref} className="inline-block w-[0.25em]">{"\u00A0"}</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
