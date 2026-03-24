import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  ssr: {
    // Bundle these browser-centric deps into the server build so Vercel
    // serverless functions don't need them in node_modules at runtime.
    noExternal: [
      "gsap",
      "@gsap/react",
      "globe.gl",
      "three",
      "@phosphor-icons/react",
      "react-aria-components",
      /^@react-aria\//,
      /^@react-stately\//,
      /^@react-types\//,
      "client-only",
      "react-aria",
      "clsx",
      /^@swc\/helpers/,
      /^@dnd-kit\//,
      "tailwind-merge",
      "tailwind-variants",
    ],
  },
});
