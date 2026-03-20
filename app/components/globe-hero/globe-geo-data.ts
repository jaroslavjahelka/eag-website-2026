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
  { lat: 52.52, lng: 13.4, label: "Berlin" },
  { lat: 48.21, lng: 16.37, label: "Vienna" },
  { lat: 52.37, lng: 4.9, label: "Amsterdam" },
  { lat: 47.5, lng: 19.04, label: "Budapest" },
  { lat: 44.43, lng: 26.1, label: "Bucharest" },
  { lat: 45.81, lng: 15.98, label: "Zagreb" },
  { lat: 40.42, lng: -3.7, label: "Madrid" },
  { lat: 41.39, lng: 2.17, label: "Barcelona" },
];
