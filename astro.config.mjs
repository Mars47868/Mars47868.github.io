import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://marschen82.github.io',

  vite: {
    plugins: [tailwindcss()],
  },
});