// Jenis-jenis air — browser-safe, ringkasan edukatif (bukan hasil uji untuk produk tertentu).

export type Readiness = 'ready' | 'treat' | 'depends';
export type WaterTypeGroup = 'Kemasan & olahan' | 'Dari sumber' | 'Di rumah';

export type WaterType = {
  id: string;
  name: string;
  group: WaterTypeGroup;
  summary: string;
  source: string;
  ph: string;
  readiness: Readiness;
  watch: string;
  tip: string;
};

export const readinessLabel: Record<Readiness, string> = {
  ready: 'Umumnya siap minum',
  treat: 'Perlu diolah dulu',
  depends: 'Tergantung sumber & pengolahan',
};

export const waterTypeGroups: WaterTypeGroup[] = ['Kemasan & olahan', 'Dari sumber', 'Di rumah'];

export const waterTypes: WaterType[] = [
  {
    id: 'mineral',
    name: 'Air mineral',
    group: 'Kemasan & olahan',
    summary: 'Air dari sumber alami seperti mata air pegunungan yang mengandung mineral alami, dijual dalam kemasan.',
    source: 'Mata air atau sumber alami',
    ph: '± 6,5–8,5',
    readiness: 'ready',
    watch: 'Kandungan mineral berbeda antar merek; periksa label dan tanggal kedaluwarsa.',
    tip: 'Simpan di tempat sejuk, jauh dari sinar matahari langsung.',
  },
  {
    id: 'demineral',
    name: 'Air demineral',
    group: 'Kemasan & olahan',
    summary: 'Air yang hampir seluruh mineralnya dihilangkan lewat proses seperti reverse osmosis, distilasi, atau deionisasi.',
    source: 'Hasil pengolahan (RO, distilasi, deionisasi)',
    ph: 'Bervariasi, cenderung netral–sedikit asam',
    readiness: 'ready',
    watch: 'Rasanya hambar karena minim mineral. Air ini juga dipakai untuk setrika, aki, dan alat laboratorium.',
    tip: 'Pastikan makanan Anda sudah mencukupi kebutuhan mineral harian.',
  },
  {
    id: 'isi-ulang',
    name: 'Air isi ulang (galon)',
    group: 'Kemasan & olahan',
    summary: 'Air olahan depot yang disaring dan didesinfeksi (misalnya UV atau ozon), lalu diisikan ke galon.',
    source: 'Depot air minum',
    ph: 'Bergantung depot',
    readiness: 'depends',
    watch: 'Mutu bergantung pada kebersihan depot dan galon. Pilih depot yang terawat dan bersih.',
    tip: 'Bilas dan jaga kebersihan galon serta dispenser secara rutin.',
  },
  {
    id: 'alkali',
    name: 'Air alkali',
    group: 'Kemasan & olahan',
    summary: 'Air dengan pH di atas 7, dihasilkan oleh ionizer atau filter yang menambahkan mineral tertentu.',
    source: 'Hasil pengolahan (ionizer atau filter mineral)',
    ph: '> 7 (umumnya 8–9+)',
    readiness: 'depends',
    watch: 'Standar air minum Indonesia pH 6,5–8,5. pH tinggi tidak otomatis lebih sehat, dan manfaat kesehatannya belum terbukti kuat.',
    tip: 'Pilih berdasarkan rasa dan kenyamanan, bukan klaim kesehatan.',
  },
  {
    id: 'pdam',
    name: 'Air PDAM / ledeng',
    group: 'Dari sumber',
    summary: 'Air yang diolah perusahaan air minum dan dialirkan lewat pipa, umumnya mengandung sisa klorin sebagai desinfeksi.',
    source: 'Perusahaan air minum (PDAM)',
    ph: '± 6,5–8,5',
    readiness: 'treat',
    watch: 'Kualitas bisa berubah di sepanjang pipa atau tandon rumah. Bau klorin dan karat kadang muncul.',
    tip: 'Masak dulu sebelum diminum. Filter karbon aktif membantu mengurangi bau dan sisa klorin.',
  },
  {
    id: 'sumur',
    name: 'Air sumur (air tanah)',
    group: 'Dari sumber',
    summary: 'Air tanah yang diambil dengan sumur gali atau bor; kualitasnya sangat bergantung pada lokasi.',
    source: 'Air tanah',
    ph: '± 6,5–7,5 (bervariasi)',
    readiness: 'treat',
    watch: 'Bisa mengandung besi, mangan, kapur, bahkan cemaran bakteri atau logam. Warna jernih belum tentu aman.',
    tip: 'Uji laboratorium secara berkala, lalu pilih pengolahan yang sesuai hasil uji.',
  },
  {
    id: 'hujan',
    name: 'Air hujan',
    group: 'Dari sumber',
    summary: 'Air dari atmosfer yang relatif bersih saat turun, tetapi mudah tercemar ketika ditampung.',
    source: 'Curah hujan',
    ph: '± 5,6 (sedikit asam alami)',
    readiness: 'treat',
    watch: 'Dapat membawa debu, kotoran atap, atau polusi udara, dan tidak mengandung mineral.',
    tip: 'Jangan diminum langsung; saring dan masak jika ingin dikonsumsi.',
  },
  {
    id: 'sadah',
    name: 'Air sadah',
    group: 'Dari sumber',
    summary: 'Air yang banyak mengandung kalsium dan magnesium sehingga meninggalkan kerak putih di teko, keran, dan pemanas.',
    source: 'Air tanah atau daerah berkapur',
    ph: 'Bervariasi',
    readiness: 'depends',
    watch: 'Membuat sabun sulit berbusa dan kerak menumpuk pada peralatan.',
    tip: 'Bersihkan kerak teko berkala dan ikuti jadwal penggantian filter.',
  },
  {
    id: 'matang',
    name: 'Air matang (rebusan)',
    group: 'Di rumah',
    summary: 'Air yang direbus hingga mendidih sehingga bakteri dan virus mati.',
    source: 'Air baku yang direbus',
    ph: 'Mengikuti air baku',
    readiness: 'ready',
    watch: 'Merebus tidak menghilangkan logam atau zat kimia terlarut, dan konsentrasinya bisa makin pekat saat air menguap.',
    tip: 'Gunakan air baku yang sudah layak, lalu saring bila perlu untuk bau dan rasa.',
  },
];

export const getWaterType = (id: string) => waterTypes.find((w) => w.id === id);
