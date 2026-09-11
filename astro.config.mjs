import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kirtiHRConsulting.github.io/',
  base: '/', output: 'static', trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
