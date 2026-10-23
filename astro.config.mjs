import { defineConfig } from 'astro/config';

// Situs dilayani dari custom domain dutakoiblitar.id di root domain, jadi base
// path adalah '/'. Catatan penting: tautan antar-halaman dan foto ditulis
// root-absolute ('/paket-bibitan', '/img/...'), sehingga situs hanya benar
// bila dilayani dari akar domain. URL project Pages
// (https://appsheetindonesia.github.io/Koi-blitar/) bukan pratinjau yang sah
// untuk konfigurasi ini — setelah custom domain aktif, GitHub mengalihkan URL
// itu ke dutakoiblitar.id.
export default defineConfig({
  site: 'https://dutakoiblitar.id',
  base: '/',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
