export type ArticleSection = { heading: string; intro?: string; points: { title: string; text: string }[] };
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  intro: string;
  sections: ArticleSection[];
  /** Poin penting yang dirangkum untuk pembaca yang terburu-buru. */
  summary: string[];
  /** Angka kunci yang ditampilkan sebagai kartu ringkas. */
  facts: { value: string; label: string }[];
  /** Kaitan topik artikel dengan produk AsonE (jujur soal kemampuan karbon aktif). */
  asoneNote: { heading: string; text: string };
};
type BaseArticle = Omit<Article, 'summary' | 'facts' | 'asoneNote'>;

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const baseArticles: BaseArticle[] = [
  {
    slug: 'bahaya-logam-berat-dalam-air-minum',
    title: 'Bahaya Logam Berat dalam Air Minum',
    excerpt: 'Timbal, arsenik, merkuri, dan kadmium dapat menumpuk di tubuh dan mengganggu saraf, ginjal, hingga organ reproduksi.',
    category: 'Kesehatan',
    readMinutes: 4,
    image: img('1548839140-29a749e1cf4d'),
    imageAlt: 'Segelas air minum jernih',
    intro: 'Kandungan logam berat (seperti timbal, arsenik, merkuri, kadmium, dan kromium) serta kelebihan zat besi di dalam air minum dapat menyebabkan kerusakan organ tubuh, gangguan saraf, hingga risiko kanker akibat akumulasi racun dalam jangka panjang.',
    sections: [
      { heading: 'Jenis Logam dan Dampak Kesehatannya', points: [
        { title: 'Timbal (Pb)', text: 'Dapat menurunkan IQ pada anak-anak, mengganggu sistem saraf, serta menyebabkan gangguan reproduksi dan kerusakan ginjal.' },
        { title: 'Arsenik (As)', text: 'Berpotensi menyebabkan keracunan akut hingga kronis dan risiko kematian.' },
        { title: 'Merkuri (Hg) & Kadmium (Cd)', text: 'Merusak sistem saraf pusat, fungsi ginjal, serta struktur tulang.' },
        { title: 'Zat Besi (Fe) berlebih', text: 'Membuat air berwarna kekuningan, berbau logam, dan rasanya tidak enak; konsumsi terus-menerus dapat memicu gangguan pencernaan, mual, atau kerusakan dinding usus.' },
      ] },
      { heading: 'Hal yang Perlu Diketahui', points: [
        { title: 'Rebusan tidak menghilangkan logam', text: 'Memasak atau merebus air hanya efektif membunuh bakteri, tetapi tidak dapat menguapkan, menghilangkan, atau mengendapkan logam berat.' },
        { title: 'Visual jernih belum tentu aman', text: 'Air yang tampak jernih dan tidak berwarna bisa saja tetap mengandung cemaran logam atau zat kimia berbahaya.' },
        { title: 'Cara penyaringan', text: 'Logam berat dapat dikurangi menggunakan metode khusus seperti Reverse Osmosis (RO), resin penukar ion, atau adsorpsi karbon aktif, bukan sekadar pemanasan biasa.' },
      ] },
      { heading: 'Dari Mana Logam Berat Berasal?', points: [
        { title: 'Pipa dan keran tua', text: 'Pipa logam yang menua atau berkarat dapat melepaskan timbal dan besi ke dalam air yang mengalir.' },
        { title: 'Limbah industri dan pertambangan', text: 'Air tanah di sekitar kawasan industri dapat tercemar arsenik, kadmium, atau merkuri.' },
        { title: 'Kondisi alami tanah', text: 'Beberapa daerah memiliki kandungan besi atau mangan alami yang tinggi di dalam air sumurnya.' },
      ] },
      { heading: 'Langkah Praktis Melindungi Keluarga', points: [
        { title: 'Uji air secara berkala', text: 'Lakukan uji laboratorium minimal setahun sekali, terutama jika menggunakan air sumur.' },
        { title: 'Alirkan air beberapa detik', text: 'Jika keran lama tidak dipakai, alirkan air 30–60 detik sebelum digunakan untuk minum atau memasak.' },
        { title: 'Pilih filter sesuai masalahnya', text: 'Kenali dulu cemarannya lewat uji lab, lalu pilih teknologi filter yang memang dirancang untuk cemaran tersebut.' },
      ] },
    ],
  },
  {
    slug: 'dampak-minum-air-berkarat',
    title: 'Dampak Minum Air Berkarat bagi Tubuh',
    excerpt: 'Sesekali tidak sengaja minum air berkarat umumnya tidak berbahaya, tapi konsumsi jangka panjang bisa menimbulkan masalah.',
    category: 'Kualitas Air',
    readMinutes: 4,
    image: img('1559839914-17aae19cec71'),
    imageAlt: 'Air mengalir dari keran',
    intro: 'Minum air yang mengandung karat (oksida besi) secara tidak sengaja dalam jumlah sedikit umumnya tidak berbahaya dan tidak menyebabkan tetanus. Namun, konsumsi air berkarat dalam waktu lama atau dengan kadar besi yang tinggi dapat menimbulkan berbagai masalah kesehatan dan lingkungan.',
    sections: [
      { heading: 'Dampak Kesehatan', points: [
        { title: 'Gangguan pencernaan', text: 'Menyebabkan mual, muntah, sakit perut, kram, dan diare.' },
        { title: 'Akumulasi zat besi (hemokromatosis)', text: 'Terjadi jika tubuh menyimpan terlalu banyak zat besi dalam jangka panjang, berisiko merusak organ penting seperti hati dan jantung.' },
        { title: 'Infeksi kuman', text: 'Karat yang parah sering kali menjadi tempat berkembang biaknya bakteri atau menghasilkan lendir/biofilm yang membawa kuman penyebab sakit perut.' },
        { title: 'Keracunan logam', text: 'Paparan logam berat dalam jangka panjang dapat mengganggu fungsi ginjal, saraf, dan sistem pencernaan.' },
      ] },
      { heading: 'Ciri-Ciri Air Minum Tercemar Karat', points: [
        { title: 'Perubahan warna', text: 'Air terlihat agak kuning, kecokelatan, atau kemerahan.' },
        { title: 'Rasa dan bau', text: 'Memiliki rasa logam yang kuat dan bau khas karat yang tidak sedap.' },
        { title: 'Bekas noda', text: 'Meninggalkan noda kekuningan pada pakaian putih, perabotan, atau dinding bak penampungan air.' },
      ] },
      { heading: 'Langkah Penanganan', points: [
        { title: 'Jika baru sekali tidak sengaja minum', text: 'Cukup perbanyak minum air putih bersih untuk membantu tubuh membuang sisa mineral tersebut secara alami.' },
        { title: 'Gunakan sistem filtrasi', text: 'Pasang filter air khusus (seperti filter oksidasi atau karbon aktif) untuk menyaring kandungan zat besi dan endapan karat.' },
        { title: 'Ganti wadah atau pipa', text: 'Jika karat berasal dari botol minum, termos, atau tumbler yang sudah terkelupas, segera hentikan penggunaannya.' },
      ] },
      { heading: 'Kapan Harus ke Dokter?', points: [
        { title: 'Gejala berulang', text: 'Jika mual, sakit perut, atau diare terus muncul setelah minum air dari sumber yang sama, hentikan pemakaian dan periksakan diri.' },
        { title: 'Anak-anak dan lansia', text: 'Kelompok rentan lebih mudah terdampak; jangan tunda konsultasi bila muncul keluhan.' },
        { title: 'Bawa informasi sumber air', text: 'Ceritakan dari mana air berasal dan sejak kapan dikonsumsi agar tenaga medis bisa menilai dengan tepat.' },
      ] },
    ],
  },
  {
    slug: 'kelebihan-zat-besi-pada-air-sumur',
    title: 'Kelebihan Zat Besi pada Air: Bahaya & Tandanya',
    excerpt: 'Air dengan kadar besi tinggi dapat mengganggu pencernaan, memicu bakteri besi, dan merusak peralatan rumah tangga.',
    category: 'Kualitas Air',
    readMinutes: 3,
    image: img('1536939459926-301728717817'),
    imageAlt: 'Tetesan air jernih',
    intro: 'Kandungan zat besi yang terlalu tinggi di dalam air minum dapat menimbulkan berbagai masalah kesehatan, gangguan pencernaan, serta kerusakan pada peralatan rumah tangga.',
    sections: [
      { heading: 'Bahaya pada Kesehatan', points: [
        { title: 'Gangguan pencernaan', text: 'Konsumsi air dengan kadar besi tinggi dalam waktu lama dapat menyebabkan mual, muntah, hingga diare.' },
        { title: 'Risiko keracunan', text: 'Penumpukan zat besi berlebih di dalam tubuh (terutama pada anak-anak) dapat berisiko menyebabkan keracunan logam.' },
        { title: 'Pertumbuhan bakteri', text: 'Besi yang berlebih di saluran air bisa menjadi sumber energi bagi bakteri besi (iron bacteria), yang membentuk lendir oranye-cokelat dan berisiko memicu iritasi kulit.' },
        { title: 'Kerusakan organ', text: 'Dalam jangka panjang, kelebihan zat besi dapat membebani kerja organ tubuh dan merusak dinding usus.' },
      ] },
      { heading: 'Dampak Fisik dan Kerusakan Lingkungan', points: [
        { title: 'Perubahan rasa dan bau', text: 'Air terasa seperti logam (amis/pahit) dan berbau tidak sedap sehingga tidak nyaman dikonsumsi.' },
        { title: 'Perubahan warna air', text: 'Air yang awalnya jernih bisa berubah menjadi kuning, cokelat, atau keruh setelah terkena oksigen.' },
        { title: 'Kerusakan perabotan dan pakaian', text: 'Menimbulkan noda karat kecokelatan pada pakaian saat dicuci, mengotori perabot porselen, serta membuat pipa, keran, atau shower berkerak dan tersumbat.' },
      ] },
      { heading: 'Cara Menurunkan Kadar Besi', points: [
        { title: 'Aerasi dan pengendapan', text: 'Mengalirkan air ke tandon terbuka agar besi teroksidasi dan mengendap, lalu ambil air jernihnya.' },
        { title: 'Filter mangan zeolit atau karbon aktif', text: 'Media filter khusus dapat menangkap partikel besi dan memperbaiki rasa serta bau air.' },
        { title: 'Uji ulang setelah filtrasi', text: 'Pastikan kadar besi hasil penyaringan kembali di bawah batas 1 mg/L sebelum rutin dikonsumsi.' },
      ] },
    ],
  },
  {
    slug: 'mitos-merebus-air-menghilangkan-logam',
    title: 'Mitos: Merebus Air Menghilangkan Logam Berat',
    excerpt: 'Merebus hanya membunuh bakteri. Pada air sumur yang mengandung besi, merebus justru bisa membuat konsentrasinya makin pekat.',
    category: 'Edukasi',
    readMinutes: 3,
    image: img('1564419320461-6870880221ad'),
    imageAlt: 'Gelas berisi air minum',
    intro: 'Banyak orang mengira air yang sudah direbus pasti aman diminum. Faktanya, pemanasan hanya efektif untuk membunuh kuman, bukan untuk menghilangkan logam atau zat kimia terlarut.',
    sections: [
      { heading: 'Fakta yang Perlu Diketahui', points: [
        { title: 'Merebus hanya membunuh bakteri', text: 'Memasak air tidak dapat menguapkan, menghilangkan, atau mengendapkan logam berat.' },
        { title: 'Konsentrasi bisa makin pekat', text: 'Merebus air sumur yang mengandung besi tidak akan menghilangkan logam tersebut, bahkan bisa membuat konsentrasinya semakin pekat karena sebagian air menguap.' },
        { title: 'Jernih belum tentu aman', text: 'Cemaran logam dan zat kimia sering kali tidak terlihat, tidak berwarna, dan tidak berbau.' },
      ] },
      { heading: 'Lalu Apa yang Bisa Dilakukan?', points: [
        { title: 'Gunakan filtrasi yang sesuai', text: 'Reverse Osmosis (RO), resin penukar ion, atau adsorpsi karbon aktif dapat membantu mengurangi kandungan logam.' },
        { title: 'Uji kualitas air', text: 'Untuk kepastian, lakukan uji laboratorium terhadap air sumber dan bandingkan dengan standar Permenkes No. 2 Tahun 2023.' },
        { title: 'Rawat wadah dan filter', text: 'Ganti cartridge filter sesuai jadwal dan hentikan pemakaian wadah yang sudah berkarat atau terkelupas.' },
      ] },
      { heading: 'Membandingkan Metode Pengolahan Air', points: [
        { title: 'Merebus', text: 'Murah dan efektif membunuh bakteri serta virus, tetapi tidak mengurangi logam, garam terlarut, atau zat kimia.' },
        { title: 'Karbon aktif', text: 'Baik untuk menyerap bau, rasa tidak sedap, dan sisa klorin; perlu diganti berkala agar tetap bekerja optimal.' },
        { title: 'Reverse Osmosis (RO)', text: 'Salah satu metode paling menyeluruh untuk menurunkan logam berat dan zat terlarut, dengan biaya dan perawatan lebih tinggi.' },
        { title: 'Kombinasi beberapa tahap', text: 'Untuk air bermasalah, sistem bertingkat (endapkan — saring — RO) biasanya memberi hasil paling konsisten.' },
      ] },
    ],
  },
];

const extras: Record<string, Pick<Article, 'summary' | 'facts' | 'asoneNote'>> = {
  'bahaya-logam-berat-dalam-air-minum': {
    summary: [
      'Logam berat (timbal, arsenik, merkuri, kadmium) menumpuk di tubuh dan merusak saraf, ginjal, serta tulang.',
      'Air jernih belum tentu aman, dan merebus tidak menghilangkan logam.',
      'Sumber umum: pipa tua, limbah industri, dan kondisi alami tanah.',
      'Langkah awal paling tepat adalah uji laboratorium, baru pilih teknologi filter yang sesuai.',
    ],
    facts: [
      { value: '0,01 mg/L', label: 'Batas maksimum timbal dan arsenik' },
      { value: '0,001 mg/L', label: 'Batas maksimum merkuri' },
      { value: '0%', label: 'Logam berkurang saat air direbus' },
    ],
    asoneNote: {
      heading: 'Kaitannya dengan AsonE',
      text: 'AsonE memakai filter karbon aktif yang membantu mengurangi bau dan sisa klorin. Untuk cemaran logam berat yang terbukti dari uji laboratorium, gunakan sistem khusus seperti Reverse Osmosis atau resin penukar ion. AsonE dipakai pada air yang sudah layak minum.',
    },
  },
  'dampak-minum-air-berkarat': {
    summary: [
      'Minum air berkarat sesekali umumnya tidak berbahaya, tetapi konsumsi jangka panjang bisa mengganggu pencernaan.',
      'Tanda utamanya: air kuning atau kecokelatan, rasa logam, bau karat, dan noda pada pakaian putih.',
      'Kadar besi di atas 1 mg/L sudah melewati batas Permenkes.',
      'Karat parah bisa disertai lendir atau biofilm yang membawa kuman.',
    ],
    facts: [
      { value: '1 mg/L', label: 'Batas maksimum besi pada air minum' },
      { value: '0,3 mg/L', label: 'Kadar yang masih tergolong aman' },
      { value: '2 liter', label: 'Perkiraan air minum per orang tiap hari' },
    ],
    asoneNote: {
      heading: 'Kaitannya dengan AsonE',
      text: 'Karbon aktif pada AsonE membantu memperbaiki bau dan rasa air, tetapi tidak dirancang untuk menurunkan kadar karat atau besi yang tinggi. Atasi dulu sumbernya (pipa, tandon, atau air sumur), lalu gunakan AsonE untuk air yang sudah layak minum.',
    },
  },
  'kelebihan-zat-besi-pada-air-sumur': {
    summary: [
      'Besi berlebih menimbulkan rasa logam, air menguning, noda karat, dan pipa tersumbat.',
      'Penumpukan besi dalam jangka panjang membebani organ, terutama pada anak-anak.',
      'Aerasi lalu pengendapan, serta filter mangan zeolit, membantu menurunkan kadar besi.',
      'Setelah disaring, uji ulang dan pastikan kadar kembali di bawah 1 mg/L.',
    ],
    facts: [
      { value: '1 mg/L', label: 'Batas maksimum besi (Permenkes)' },
      { value: '5 mg/L', label: 'Air mulai kuning dan bernoda' },
      { value: '10 mg/L', label: 'Air tampak keruh kecokelatan' },
    ],
    asoneNote: {
      heading: 'Kaitannya dengan AsonE',
      text: 'Untuk air sumur berbesi, lakukan penyaringan awal (aerasi, endapan, atau filter mangan zeolit). AsonE cocok sebagai langkah akhir di rumah untuk membantu mengurangi bau dan sisa klorin pada air yang sudah memenuhi syarat.',
    },
  },
  'mitos-merebus-air-menghilangkan-logam': {
    summary: [
      'Merebus efektif membunuh bakteri dan virus, tetapi tidak menghilangkan logam atau zat kimia terlarut.',
      'Konsentrasi logam bisa makin pekat karena sebagian air menguap.',
      'Pilih metode sesuai masalah: karbon aktif untuk bau dan klorin, RO untuk logam dan zat terlarut.',
      'Ganti cartridge sesuai jadwal agar filter tetap bekerja optimal.',
    ],
    facts: [
      { value: '99%', label: 'Kuman dapat dibunuh dengan merebus' },
      { value: '0%', label: 'Logam berat berkurang karena merebus' },
      { value: '3 tahap', label: 'Endapkan, saring, lalu RO untuk air bermasalah' },
    ],
    asoneNote: {
      heading: 'Kaitannya dengan AsonE',
      text: 'AsonE bekerja lewat karbon aktif untuk membantu mengurangi bau dan sisa klorin, bukan untuk membunuh kuman atau menghilangkan logam. Gunakan air yang sudah aman secara mikrobiologi, dan ganti cartridge sesuai petunjuk agar kinerjanya terjaga.',
    },
  },
};

export const articles: Article[] = baseArticles.map((a) => ({ ...a, ...extras[a.slug]! }));

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
