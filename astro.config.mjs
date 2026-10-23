import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dutakoiblitar.id',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
