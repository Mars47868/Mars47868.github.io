import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mars47868.github.io',

  vite: {
    plugins: [tailwindcss()],
  },
});