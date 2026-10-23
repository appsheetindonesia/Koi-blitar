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

## Design

Satu aksen (vermilion `#b8331c`), dasar kertas `#f4f1e9`, ink `#17140f`. Tanpa gradient, glass, emoji, atau kartu bertumpuk. Tipografi: Newsreader (display) + Archivo (teks). Radius 2px (`--radius`), pemisah hairline. Khusus foto ikan dipakai sudut oval 14px (`--radius-foto`) supaya foto terpisah jelas dari blok teks yang bersudut tajam.
