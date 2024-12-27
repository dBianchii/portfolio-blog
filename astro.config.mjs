// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://gabrielbianchi.com",

  integrations: [
    react({
      include: ["**/react/*"],
    }),
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: vercel(),
});
