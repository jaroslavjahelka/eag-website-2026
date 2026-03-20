import { useRef, useEffect, useState, useCallback } from "react";
import { highlightLocations } from "./globe-geo-data";

const COUNTRIES_URL = "/assets/ne_110m_admin_0_countries.geojson";

interface GlobeCanvasProps {
  className?: string;
  reducedMotion: boolean;
  onError?: () => void;
}

export default function GlobeCanvas({ className, reducedMotion, onError }: GlobeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let globe: any = null;
    let ro: ResizeObserver | null = null;

    Promise.all([
      import("globe.gl"),
      fetch(COUNTRIES_URL).then((r) => r.json()),
    ])
      .then(([mod, countries]) => {
        if (disposed) return;
        const Globe = mod.default;

        const { width, height } = container.getBoundingClientRect();
        if (width === 0 || height === 0) return;

        // Filter out Antarctica
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const features = countries.features.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (f: any) => f.properties.ISO_A2 !== "AQ",
        );

        // Countries where EAG has presence (highlight points)
        const eagCountries = new Set(["CZ", "DE", "AT", "NL", "HU", "RO", "HR", "ES"]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isEagCountry = (f: any) => eagCountries.has(f.properties.ISO_A2);

        globe = new Globe(container, { animateIn: false })
          .width(width)
          .height(height)
          .backgroundColor("#0a0a0a")
          .showAtmosphere(true)
          .atmosphereColor("#14b8a6")
          .atmosphereAltitude(0.2)
          .showGlobe(true)
          .showGraticules(false)
          // Vector country polygons
          .polygonsData(features)
          .polygonGeoJsonGeometry("geometry")
          .polygonCapColor(() => "#0a0a0a")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .polygonSideColor((f: any) =>
            isEagCountry(f) ? "rgba(20, 184, 166, 0.15)" : "rgba(20, 184, 166, 0.03)",
          )
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .polygonStrokeColor((f: any) =>
            isEagCountry(f) ? "#14b8a6" : "rgba(20, 184, 166, 0.2)",
          )
          .polygonAltitude(0.006)
          .polygonCapCurvatureResolution(5)
          // Highlight city dots
          .pointsData(
            highlightLocations.map((loc) => ({
              lat: loc.lat,
              lng: loc.lng,
              label: loc.label,
              color: "#14b8a6",
            })),
          )
          .pointAltitude(0.01)
          .pointColor("color")
          .pointRadius(0.5)
          .pointsMerge(true)
          .enablePointerInteraction(false);

        // Set view to show Europe
        globe.pointOfView({ lat: 48, lng: 15, altitude: 2.0 }, 0);

        // Auto-rotate
        if (!reducedMotion) {
          const controls = globe.controls();
          if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.3;
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableRotate = false;
          }
        }

        // Resize
        ro = new ResizeObserver((entries) => {
          const entry = entries[0];
          if (!entry || !globe) return;
          const { width: w, height: h } = entry.contentRect;
          if (w > 0 && h > 0) {
            globe.width(w).height(h);
          }
        });
        ro.observe(container);
      })
      .catch(() => {
        handleError();
      });

    return () => {
      disposed = true;
      ro?.disconnect();
      if (globe) {
        globe._destructor?.();
      }
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [mounted, reducedMotion, handleError]);

  return <div ref={containerRef} className={className} />;
}
