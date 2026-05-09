// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://neighborhoodhaulingut.com',
  integrations: [
    sitemap(),
    // Don't re-compress images — Astro's <Image> already produces optimized
    // WebPs; running another compressor over them just adds build time.
    compress({ Image: false }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});