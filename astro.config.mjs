import { defineConfig } from 'astro/config';

// Situs dipublikasikan di custom domain dutakoiblitar.id, jadi base path adalah
// root "/". Kalau nanti domain dilepas dan situs dilayani dari
// https://<user>.github.io/Koi-blitar, ubah `base` menjadi '/Koi-blitar' dan
// sesuaikan `site`.
export default defineConfig({
  site: 'https://dutakoiblitar.id',
  base: '/',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
