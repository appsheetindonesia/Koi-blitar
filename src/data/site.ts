// Satu sumber data untuk paket, kontak, dan syarat — dipakai semua halaman.

export const site = {
  name: 'Duta Koi Blitar',
  url: 'https://dutakoiblitar.id',
  waNumber: '6285799449920',
  waDisplay: '+62 857-9944-9920',
  hours: 'Buka setiap hari, 08.00–16.30 WIB',
  address: {
    street: 'Desa Modangan, Kec. Nglegok',
    locality: 'Kabupaten Blitar',
    region: 'Jawa Timur',
    postalCode: '66181',
  },
  bank: {
    name: 'BCA',
    account: '0901951101',
    holder: 'M. Anas Fajar Rizqi',
  },
};

export function waLink(message: string): string {
  return `https://wa.me/${site.waNumber}?text=${encodeURIComponent(message)}`;
}

export type Paket = {
  slug: string;
  judul: string;
  ekor: string;
  ukuran: string;
  grade: string;
  catatan?: string;
  gambar: string;
  alt: string;
};

export const paketBibitan: Paket[] = [
  {
    slug: 'bibitan-100',
    judul: 'Paket 100 ekor',
    ekor: '100 ekor',
    ukuran: '10–14 cm',
    grade: 'Random',
    catatan: 'Paling ekonomis untuk pembesaran skala kolam besar.',
    gambar: '/img/mix-varietas.webp',
    alt: 'Puluhan anakan koi aneka varietas di ember biru, contoh isi paket 100 ekor',
  },
  {
    slug: 'bibitan-50',
    judul: 'Paket 50 ekor',
    ekor: '50 ekor',
    ukuran: '15–20 cm',
    grade: 'Random',
    gambar: '/img/bibitan-ember.webp',
    alt: 'Anakan koi merah putih dan tiga warna di ember biru, contoh isi paket 50 ekor',
  },
  {
    slug: 'bibitan-30',
    judul: 'Paket 30 ekor',
    ekor: '30 ekor',
    ukuran: '15–20 cm',
    grade: 'A',
    gambar: '/img/bibitan-anakan-detail.webp',
    alt: 'Detail anakan koi aneka warna hasil sortir di ember biru, contoh isi paket 30 ekor',
  },
  {
    slug: 'bibitan-20',
    judul: 'Paket 20 ekor',
    ekor: '20 ekor',
    ukuran: '15–20 cm',
    grade: 'A',
    catatan: 'Jumlah terkecil untuk mulai seleksi sendiri.',
    gambar: '/img/bibitan-ember-detail.webp',
    alt: 'Detail anakan koi merah putih dan tiga warna di ember biru, contoh isi paket 20 ekor',
  },
];

export const paketBorongan: Paket[] = [
  {
    slug: 'borongan-22',
    judul: 'Borongan 22 ekor',
    ekor: '20–30 ekor',
    ukuran: '20 cm up',
    grade: 'A',
    gambar: '/img/borongan-empat.webp',
    alt: 'Empat koi Kohaku merah putih di bak biru, contoh kelompok borongan 20 cm ke atas',
  },
  {
    slug: 'borongan-20',
    judul: 'Borongan 20 ekor',
    ekor: '20–30 ekor',
    ukuran: '25 cm up',
    grade: 'A',
    catatan: 'Ukuran terbesar di kelompok borongan.',
    gambar: '/img/jumbo-tangan.webp',
    alt: 'Koi jumbo dipegang dengan kedua tangan di atas bak biru, contoh ukuran 25 cm ke atas',
  },
  {
    slug: 'borongan-15',
    judul: 'Borongan 15 ekor',
    ekor: '15–20 ekor',
    ukuran: '20 cm up',
    grade: 'A pilihan',
    gambar: '/img/showa-gelap.webp',
    alt: 'Koi Showa tiga warna di bak biru, contoh kelompok borongan grade A pilihan',
  },
  {
    slug: 'borongan-10',
    judul: 'Borongan 10 ekor',
    ekor: '5–10 ekor',
    ukuran: '25 cm up',
    grade: 'A pilihan',
    gambar: '/img/kohaku-panjang.webp',
    alt: 'Satu ekor kohaku panjang merah putih difoto dari atas, contoh ikan borongan grade A pilihan',
  },
];

export const paketCustome: Paket[] = [
  {
    slug: 'mix-1',
    judul: 'Mix 1 — Jumbo',
    ekor: 'Sesuai permintaan',
    ukuran: 'Jumbo',
    grade: 'A',
    catatan: 'Bisa dicampur dengan paket lain.',
    gambar: '/img/jumbo-tangan.webp',
    alt: 'Koi jumbo dipegang dengan kedua tangan di atas bak biru, contoh isi mix jumbo',
  },
  {
    slug: 'mix-2',
    judul: 'Mix 2 — Jumbo Super',
    ekor: 'Sesuai permintaan',
    ukuran: 'Jumbo',
    grade: 'Super pilihan',
    catatan: 'Bisa dicampur dengan paket lain.',
    gambar: '/img/tancho.webp',
    alt: 'Koi Tancho putih dengan bulatan merah di kepala, contoh isi mix jumbo super',
  },
  {
    slug: 'mix-3',
    judul: 'Mix 3 — Minion',
    ekor: 'Sesuai permintaan',
    ukuran: 'Minion',
    grade: 'Super pilihan',
    catatan: 'Bisa dicampur dengan paket lain.',
    gambar: '/img/kohaku.webp',
    alt: 'Koi Kohaku putih bermotif merah difoto dari atas, contoh isi mix minion',
  },
  {
    slug: 'mix-4',
    judul: 'Mix 4 — Bebas',
    ekor: 'Sesuai permintaan',
    ukuran: 'Campur',
    grade: 'Super pilihan',
    catatan: 'Bisa dicampur dengan paket lain.',
    gambar: '/img/sanke.webp',
    alt: 'Koi bermotif merah dan bintik hitam difoto dari atas, contoh isi mix bebas',
  },
];

// Varietas yang tercantum di katalog paket satuan situs lama, semuanya grade SQ.
// Setiap varietas membawa fotonya sendiri, jadi tidak ada galeri terpisah.
export const varietasSatuan = [
  {
    nama: 'Kohaku',
    ket: 'Dasar putih dengan corak merah.',
    gambar: '/img/kohaku.webp',
    alt: 'Koi Kohaku putih bermotif merah difoto dari atas di bak biru',
  },
  {
    nama: 'Showa',
    ket: 'Tiga warna: hitam, merah, dan putih.',
    gambar: '/img/showa.webp',
    alt: 'Koi Showa tiga warna hitam, merah, dan putih di bak biru',
  },
  {
    nama: 'Doitsu Sanke',
    ket: 'Bersisik cermin, corak merah dan hitam di atas putih.',
    gambar: '/img/doitsu.webp',
    alt: 'Koi Doitsu dengan barisan sisik cermin di sepanjang punggung',
  },
  {
    nama: 'Kiko',
    ket: 'Tersedia sesuai stok saat itu.',
    gambar: '/img/ogon.webp',
    alt: 'Koi metalik keemasan dipegang di atas bak biru, contoh varietas Kiko',
  },
];

