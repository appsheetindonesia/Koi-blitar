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
};

export const paketBibitan: Paket[] = [
  { slug: 'bibitan-100', judul: 'Paket 100 ekor', ekor: '100 ekor', ukuran: '10–14 cm', grade: 'Random', catatan: 'Paling ekonomis untuk pembesaran skala kolam besar.' },
  { slug: 'bibitan-50', judul: 'Paket 50 ekor', ekor: '50 ekor', ukuran: '15–20 cm', grade: 'Random' },
  { slug: 'bibitan-30', judul: 'Paket 30 ekor', ekor: '30 ekor', ukuran: '15–20 cm', grade: 'A' },
  { slug: 'bibitan-20', judul: 'Paket 20 ekor', ekor: '20 ekor', ukuran: '15–20 cm', grade: 'A', catatan: 'Jumlah terkecil untuk mulai seleksi sendiri.' },
];

export const paketBorongan: Paket[] = [
  { slug: 'borongan-22', judul: 'Borongan 22 ekor', ekor: '20–30 ekor', ukuran: '20 cm up', grade: 'A' },
  { slug: 'borongan-20', judul: 'Borongan 20 ekor', ekor: '20–30 ekor', ukuran: '25 cm up', grade: 'A', catatan: 'Ukuran terbesar di kelompok borongan.' },
  { slug: 'borongan-15', judul: 'Borongan 15 ekor', ekor: '15–20 ekor', ukuran: '20 cm up', grade: 'A pilihan' },
  { slug: 'borongan-10', judul: 'Borongan 10 ekor', ekor: '5–10 ekor', ukuran: '25 cm up', grade: 'A pilihan' },
];

export const paketCustome: Paket[] = [
  { slug: 'mix-1', judul: 'Mix 1 — Jumbo', ekor: 'Sesuai permintaan', ukuran: 'Jumbo', grade: 'A', catatan: 'Bisa dicampur dengan paket lain.' },
  { slug: 'mix-2', judul: 'Mix 2 — Jumbo Super', ekor: 'Sesuai permintaan', ukuran: 'Jumbo', grade: 'Super pilihan', catatan: 'Bisa dicampur dengan paket lain.' },
  { slug: 'mix-3', judul: 'Mix 3 — Minion', ekor: 'Sesuai permintaan', ukuran: 'Minion', grade: 'Super pilihan', catatan: 'Bisa dicampur dengan paket lain.' },
  { slug: 'mix-4', judul: 'Mix 4 — Bebas', ekor: 'Sesuai permintaan', ukuran: 'Campur', grade: 'Super pilihan', catatan: 'Bisa dicampur dengan paket lain.' },
];

// Varietas yang tercantum di katalog paket satuan situs lama, semuanya grade SQ.
export const varietasSatuan = [
  { nama: 'Kohaku', ket: 'Dasar putih dengan corak merah.' },
  { nama: 'Showa', ket: 'Tiga warna: hitam, merah, dan putih.' },
  { nama: 'Doitsu Sanke', ket: 'Bersisik cermin, corak merah dan hitam di atas putih.' },
  { nama: 'Kiko', ket: 'Tersedia sesuai stok saat itu.' },
];

// Foto stok dari bak farm — untuk menunjukkan kondisi ikan, bukan katalog tetap.
export const fotoSatuan = [
  { gambar: '/img/kohaku.webp', alt: 'Koi putih dengan corak merah difoto dari atas di bak biru' },
  { gambar: '/img/showa.webp', alt: 'Koi tiga warna hitam, merah, dan putih di bak biru' },
  { gambar: '/img/doitsu.webp', alt: 'Koi dengan barisan sisik cermin di sepanjang punggung' },
  { gambar: '/img/tancho.webp', alt: 'Koi putih dengan satu bulatan merah di kepala' },
  { gambar: '/img/ogon.webp', alt: 'Koi oranye keemasan dipegang dengan tangan' },
  { gambar: '/img/sanke.webp', alt: 'Koi putih dengan corak merah dan bintik hitam kecil' },
];
