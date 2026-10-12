import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mars47868.github.io',

  integrations: [
    sitemap({
      // 404 與 CMS 後台不進 sitemap
      filter: (page) => !/\/(404|admin)\/?$/.test(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
