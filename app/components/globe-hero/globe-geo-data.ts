/**
 * Geographic data for the 3D globe.
 *
 * Highlight locations represent EAG's key European markets.
 * Country polygons are loaded at runtime from GeoJSON (see globe-canvas.tsx).
 */

export interface HighlightPoint {
  lat: number;
  lng: number;
  label: string;
}

export const highlightLocations: HighlightPoint[] = [
  { lat: 50.08, lng: 14.44, label: "Prague" },
  { lat: 48.15, lng: 17.11, label: "Bratislava" },
  { lat: 52.23, lng: 21.01, label: "Warsaw" },
  { lat: 47.5, lng: 19.04, label: "Budapest" },
  { lat: 52.52, lng: 13.4, label: "Berlin" },
  { lat: 48.21, lng: 16.37, label: "Vienna" },
  { lat: 52.37, lng: 4.9, label: "Amsterdam" },
  { lat: 50.85, lng: 4.35, label: "Brussels" },
  { lat: 41.9, lng: 12.5, label: "Rome" },
  { lat: 48.86, lng: 2.35, label: "Paris" },
  { lat: 40.42, lng: -3.7, label: "Madrid" },
  { lat: 41.39, lng: 2.17, label: "Barcelona" },
  { lat: 44.43, lng: 26.1, label: "Bucharest" },
];
