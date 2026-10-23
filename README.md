# Duta Koi Blitar

Situs statis untuk Duta Koi Blitar — farm koi di Desa Modangan, Kecamatan Nglegok, Kabupaten Blitar.

Dibangun dengan [Astro](https://astro.build) (output statis, tanpa framework UI di sisi klien). Seluruh foto berasal dari farm sendiri.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # hasil statis di dist/
npm run preview  # pratinjau hasil build
```

## Struktur

```
src/
  data/site.ts          # kontak, rekening, daftar paket & varietas (satu sumber)
  layouts/Base.astro    # head, meta, JSON-LD LocalBusiness, header & footer
  layouts/PaketPage.astro
  components/           # Header, Footer, BottomNav, WaButton, PaketTable, OrderFacts, Copy
  pages/
    index.astro
    paket-bibitan.astro
    paket-borongan.astro
    paket-custome.astro
    paket-satuan.astro
    cara-pemesanan.astro
    tentang-kami.astro
    kontak-kami.astro
  styles/global.css     # design token: paper/ink + satu aksen vermilion
public/img/             # foto farm (WebP) + logo
scripts/images.mjs      # konversi ulang foto sumber ke WebP
```

## Catatan isi

- Harga sengaja tidak dicantumkan. Stok dan harga berubah harian; setiap paket punya tombol WhatsApp yang mengisi pesan otomatis.
- Setiap baris paket dan setiap varietas satuan membawa fotonya sendiri (`gambar` + `alt` di `src/data/site.ts`), jadi tidak ada galeri foto terpisah dari daftar.
- Foto thumbnail bisa diklik untuk dibuka besar. Satu `<dialog>` bersama di `components/FotoZoom.astro` membaca `data-zoom-src`, `data-zoom-alt`, dan `data-zoom-label` dari pemicunya; tutup lewat tombol, klik backdrop, atau Escape (perilaku bawaan dialog).
- Alamat, jam layanan, nomor WhatsApp, syarat DP 50%, dan nomor rekening BCA diambil dari situs lama dan tidak diubah.
- Semua CTA mengarah ke `wa.me/6285799449920` dengan pesan yang sudah terisi sesuai paket.

## Navigasi mobile

Di bawah 720px muncul bottom navbar berbentuk pill melayang (5 tab: Beranda, Bibitan, Borongan, Mix, Satuan), masing-masing dengan ikon garis 1.6px di atas label. Tab aktif memakai latar `--paper-deep` dan ikon vermilion. `body` diberi padding bawah setinggi bar plus `--tabbar-gap` dan `env(safe-area-inset-bottom)` agar footer tidak tertutup, termasuk di iPhone. Di 721px ke atas bar disembunyikan dan navigasi header yang dipakai.

Rentang 721–1080px memakai tombol Menu di header (bottom navbar sudah hilang, navigasi desktop belum muncul). Panel menu berisi 7 tujuan internal yang sama plus WhatsApp, sehingga tidak ada halaman yang hanya bisa dijangkau lewat footer. Di 1081px ke atas navigasi header penuh tampil dan tombol Menu disembunyikan.

Tombol WhatsApp melayang (juga hanya di bawah 720px) duduk tepat di atas bottom navbar. Tombol muncul setelah hero terlewati, dan labelnya mengikuti baris paket yang melewati garis tengah layar: `data-wa-msg` + `data-wa-label` pada baris tabel. Setelah tabel terlewati, pesan terakhir yang tetap dipakai. Di halaman tanpa daftar paket, tombol memakai pesan default halaman.

## Deploy ke GitHub Pages

`.github/workflows/deploy.yml` membangun situs dan menerbitkannya setiap kali `main` di-push (atau lewat tombol *Run workflow*). Tiga job: `build` (`npm ci` → `npm run build` → `actions/upload-pages-artifact` → unggah `dist` sebagai artefak biasa), `cek` (unduh `dist` → `node scripts/check-links.mjs dist`), lalu `deploy` yang menunggu keduanya. Memakai `GITHUB_TOKEN` dengan izin `pages: write` dan `id-token: write`. Tidak ada secret yang perlu dibuat.

**Cek tautan.** `cek` gagal — dan `deploy` tidak jalan — bila ada `href`/`src` di HTML `dist` atau `url(...)` di CSS `dist` yang menunjuk ke file yang tidak ada. Skrip `scripts/check-links.mjs` memeriksa tiga sumber: atribut `href`/`src` di semua `.html`, `url(...)` di blok `<style>` inline tiap halaman, dan `url(...)` di semua `.css` (termasuk `@font-face` hasil `@fontsource`). Nilai kosong, anchor `#...`, dan URL eksternal/`data:`/`mailto:`/`https:` dilewati; path root-absolute (`/img/x.webp`, `/_astro/x.woff2`) diselesaikan dari akar `dist`, path relatif dari folder file pemiliknya — jadi `url(../img/x.webp)` di dalam `_astro/` juga benar. Folder dihitung ada bila berisi `index.html`. Jalankan lokal dengan `npm run check:links` setelah `npm run build`; pesan gagalnya menyebut file pemilik dan nilai referensinya, misalnya `paket-satuan\index.html → /img/showa.webp` atau `_astro\paket-bibitan.css → /_astro/newsreader-latin-wght-normal.woff2`.

**Base path.** `astro.config.mjs` memakai `base: '/'` karena situs dilayani dari custom domain di akar domain. Ini bukan pilihan kosmetik: tautan navigasi (`/paket-bibitan`) dan semua foto (`/img/...`) ditulis root-absolute, jadi situs hanya berfungsi bila dilayani dari akar domain. Karena itu URL project Pages `https://appsheetindonesia.github.io/Koi-blitar/` tidak bisa dipakai sebagai pratinjau — setelah custom domain aktif, GitHub justru mengalihkan URL itu ke `dutakoiblitar.id`.

Kalau suatu saat situs harus dilayani dari subpath (`/Koi-blitar`), jangan hanya mengubah `base`; semua `href` dan `src` root-absolute di `src/` juga harus diberi prefiks, misalnya lewat helper di `src/data/site.ts`.

**Custom domain.** Sudah aktif di repo: Pages memakai *Source: GitHub Actions* dengan custom domain `dutakoiblitar.id`. Tidak perlu file `CNAME` di repo — pada deploy lewat Actions, domain diambil dari pengaturan repo dan file `CNAME` diabaikan GitHub. *Enforce HTTPS* belum bisa diaktifkan karena sertifikat baru terbit setelah DNS mengarah ke GitHub; aktifkan setelah itu.

**DNS.** Apex `dutakoiblitar.id` diarahkan ke GitHub Pages, bukan ke IP hosting lama:

| Tipe | Nama | Nilai |
| --- | --- | --- |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `appsheetindonesia.github.io` |

**Status per 23 Oktober 2026.** Workflow sudah berjalan sukses (build + deploy), dan `https://appsheetindonesia.github.io/Koi-blitar/index.html` sudah dialihkan GitHub ke `dutakoiblitar.id`. Tapi apex masih menunjuk ke `202.10.43.110` / `2001:df0:27b:3::4:608c` (hosting lama, server LiteSpeed), jadi `https://dutakoiblitar.id/` masih menyajikan situs lama sampai record A/AAAA diganti. Setelah DNS diarahkan, minta penerbitan sertifikat di *Settings → Pages*, lalu aktifkan *Enforce HTTPS*.

## Design

Satu aksen (vermilion `#b8331c`), dasar kertas `#f4f1e9`, ink `#17140f`. Tanpa gradient, glass, emoji, atau kartu bertumpuk. Tipografi: Newsreader (display) + Archivo (teks). Radius 2px (`--radius`), pemisah hairline. Khusus foto ikan dipakai sudut oval 14px (`--radius-foto`) supaya foto terpisah jelas dari blok teks yang bersudut tajam.
