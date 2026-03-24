import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  ssr: process.env.NODE_ENV === "production",
  presets: [vercelPreset()],
} satisfies Config;
