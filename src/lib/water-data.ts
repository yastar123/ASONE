// Data edukasi air — browser-safe, dipakai oleh halaman utama dan detail artikel.

export type Tone = 'safe' | 'warn' | 'danger' | 'neutral';
export type WaterBarDatum = { name: string; value: number; unit: string; tone?: Tone };
type ChartBase = { title: string; description: string; unit: string; source: string };
export type BarWaterChart = ChartBase & { kind: 'bar' | 'ph'; data: WaterBarDatum[]; scale?: 'linear' | 'sqrt'; legend?: Partial<Record<Tone, string>>; referenceX?: { value: number; label: string }[] };
export type DonutWaterChart = ChartBase & { kind: 'donut'; centerLabel: string; data: { name: string; value: number }[] };
export type RadarWaterChart = ChartBase & { kind: 'radar'; axes: string[]; max: number; series: { name: string; values: number[] }[] };
export type WaterChart = BarWaterChart | DonutWaterChart | RadarWaterChart;

// Batas maksimum cemaran logam pada air minum (mg/L). Skala akar kuadrat agar logam berbatas kecil tetap terlihat.
export const heavyMetalLimits: BarWaterChart = {
  kind: 'bar',
  title: 'Batas maksimum logam pada air minum',
  description: 'Semakin kecil angkanya, semakin berbahaya logam tersebut sehingga batasnya makin ketat.',
  unit: 'mg/L',
  scale: 'sqrt',
  data: [
    { name: 'Besi (Fe)', value: 1, unit: 'mg/L' },
    { name: 'Mangan (Mn)', value: 0.1, unit: 'mg/L' },
    { name: 'Timbal (Pb)', value: 0.01, unit: 'mg/L' },
    { name: 'Arsenik (As)', value: 0.01, unit: 'mg/L' },
    { name: 'Kadmium (Cd)', value: 0.003, unit: 'mg/L' },
    { name: 'Merkuri (Hg)', value: 0.001, unit: 'mg/L' },
  ],
  source: 'Acuan: Permenkes No. 2 Tahun 2023 & pedoman WHO (ringkasan).',
};

// Perbandingan pH minuman sehari-hari (nilai perkiraan umum)
export const phComparison: BarWaterChart = {
  kind: 'ph',
  referenceX: [{ value: 6.5, label: '6,5' }, { value: 8.5, label: '8,5' }],
  title: 'Perkiraan pH minuman sehari-hari',
  description: 'Air minum yang baik berada di rentang pH 6,5–8,5 sesuai standar Indonesia.',
  unit: 'pH',
  data: [
    { name: 'Minuman bersoda', value: 2.5, unit: 'pH' },
    { name: 'Kopi', value: 5, unit: 'pH' },
    { name: 'Teh', value: 6, unit: 'pH' },
    { name: 'Air mineral', value: 7, unit: 'pH' },
    { name: 'Air keran layak minum', value: 7.5, unit: 'pH' },
    { name: 'Air alkali', value: 9, unit: 'pH' },
  ],
  source: 'Nilai perkiraan umum; dapat berbeda antar merek dan sumber air.',
};

// Perkiraan pH berbagai jenis air
export const waterTypePh: BarWaterChart = {
  kind: 'ph',
  referenceX: [{ value: 6.5, label: '6,5' }, { value: 8.5, label: '8,5' }],
  title: 'Perkiraan pH berbagai jenis air',
  description: 'Rentang pH air minum di Indonesia adalah 6,5–8,5. Air hujan alami sedikit asam, sedangkan air alkali berada di atas rentang.',
  unit: 'pH',
  data: [
    { name: 'Air hujan', value: 5.6, unit: 'pH' },
    { name: 'Air sumur', value: 7, unit: 'pH' },
    { name: 'Air mineral', value: 7.3, unit: 'pH' },
    { name: 'Air PDAM', value: 7.5, unit: 'pH' },
    { name: 'Air alkali', value: 9, unit: 'pH' },
  ],
  source: 'Nilai perkiraan umum; berbeda antar sumber, merek, dan lokasi.',
};

// Efektivitas metode pengolahan air terhadap jenis cemaran (skala 0–100, estimasi edukatif)
export const filterEffectiveness: BarWaterChart = {
  kind: 'bar',
  title: 'Perkiraan kemampuan metode pengolahan air',
  description: 'Merebus hanya efektif membunuh kuman — tidak menghilangkan logam berat.',
  unit: '%',
  legend: { safe: 'Efektif', danger: 'Tidak efektif' },
  data: [
    { name: 'Merebus — kuman', value: 99, unit: '%', tone: 'safe' },
    { name: 'Merebus — logam berat (0%)', value: 0, unit: '%', tone: 'danger' },
    { name: 'Karbon aktif — klorin & bau', value: 90, unit: '%', tone: 'safe' },
    { name: 'Reverse Osmosis — logam berat', value: 95, unit: '%', tone: 'safe' },
    { name: 'Resin penukar ion — logam', value: 85, unit: '%', tone: 'safe' },
  ],
  source: 'Estimasi edukatif dari literatur umum; hasil nyata tergantung kondisi air dan perawatan filter.',
};

// Tanda air sumur bermasalah berdasarkan kadar besi (mg/L)
export const ironLevels: BarWaterChart = {
  kind: 'bar',
  title: 'Kadar besi pada air dan tandanya',
  description: 'Di atas 1 mg/L, air mulai berwarna, berbau logam, dan meninggalkan noda karat.',
  unit: 'mg/L',
  data: [
    { name: 'Aman (< 0,3)', value: 0.3, unit: 'mg/L', tone: 'safe' },
    { name: 'Batas maksimum', value: 1, unit: 'mg/L', tone: 'warn' },
    { name: 'Berasa logam', value: 2, unit: 'mg/L', tone: 'danger' },
    { name: 'Kuning & bernoda', value: 5, unit: 'mg/L', tone: 'danger' },
    { name: 'Keruh kecokelatan', value: 10, unit: 'mg/L', tone: 'danger' },
  ],
  source: 'Acuan: batas Permenkes No. 2 Tahun 2023 dan literatur kualitas air sumur.',
};

// Paparan besi harian dari air minum = kadar besi (mg/L) x 2 L air/hari (perhitungan sederhana)
export const ironIntake: BarWaterChart = {
  kind: 'bar',
  title: 'Asupan besi dari air minum per hari',
  description: 'Dihitung dari kadar besi x 2 liter air minum per hari. Belum termasuk besi dari makanan, jadi paparan dari air terus menumpuk setiap hari.',
  unit: 'mg/hari',
  data: [
    { name: 'Kadar 0,3 mg/L', value: 0.6, unit: 'mg/hari', tone: 'safe' },
    { name: 'Kadar 1 mg/L (batas)', value: 2, unit: 'mg/hari', tone: 'warn' },
    { name: 'Kadar 2 mg/L', value: 4, unit: 'mg/hari', tone: 'danger' },
    { name: 'Kadar 5 mg/L', value: 10, unit: 'mg/hari', tone: 'danger' },
    { name: 'Kadar 10 mg/L', value: 20, unit: 'mg/hari', tone: 'danger' },
  ],
  source: 'Perhitungan sederhana: kadar (mg/L) x 2 L. Ilustrasi edukatif, bukan batas medis.',
};

// Kebutuhan total air harian (EFSA, termasuk dari makanan)
export const hydrationNeeds: BarWaterChart = {
  kind: 'bar',
  title: 'Kebutuhan air harian menurut kelompok usia',
  description: 'Karena kita minum air setiap hari, kualitas air yang dikonsumsi berpengaruh besar dalam jangka panjang.',
  unit: 'L/hari',
  data: [
    { name: 'Anak 4–8 tahun', value: 1.6, unit: 'L/hari' },
    { name: 'Anak 9–13 th (perempuan)', value: 1.9, unit: 'L/hari' },
    { name: 'Anak 9–13 th (laki-laki)', value: 2.1, unit: 'L/hari' },
    { name: 'Wanita dewasa', value: 2, unit: 'L/hari' },
    { name: 'Pria dewasa', value: 2.5, unit: 'L/hari' },
  ],
  source: 'Acuan: EFSA, asupan air total yang memadai (minuman + makanan). Kebutuhan bervariasi menurut aktivitas dan cuaca.',
};

// Komposisi air dalam tubuh dewasa
export const bodyWater: DonutWaterChart = {
  kind: 'donut',
  title: 'Air dalam tubuh orang dewasa',
  description: 'Sekitar 60% berat badan dewasa adalah air, sehingga hidrasi yang baik dimulai dari air yang baik.',
  unit: '%',
  centerLabel: '± 60%',
  data: [
    { name: 'Air', value: 60 },
    { name: 'Lainnya', value: 40 },
  ],
  source: 'Angka rata-rata umum; bervariasi menurut usia, jenis kelamin, dan komposisi tubuh.',
};

// Asal asupan air harian
export const intakeSources: DonutWaterChart = {
  kind: 'donut',
  title: 'Dari mana asupan air harian berasal?',
  description: 'Sebagian besar asupan air berasal dari minuman, jadi kualitas air minum sehari-hari paling menentukan.',
  unit: '%',
  centerLabel: '± 80%',
  data: [
    { name: 'Minuman', value: 80 },
    { name: 'Makanan', value: 20 },
  ],
  source: 'Perkiraan umum (EFSA); proporsi berbeda antar individu.',
};

// Perbandingan metode pengolahan air (skala 0–3, estimasi edukatif dari isi artikel)
export const treatmentRadar: RadarWaterChart = {
  kind: 'radar',
  title: 'Membandingkan metode pengolahan air',
  description: 'Tidak ada satu metode untuk semua masalah. Skala 0 (tidak membantu) sampai 3 (sangat membantu).',
  unit: 'skor',
  max: 3,
  axes: ['Bakteri', 'Klorin & bau', 'Logam berat', 'Zat terlarut', 'Praktis & murah'],
  series: [
    { name: 'Merebus', values: [3, 1, 0, 0, 3] },
    { name: 'Karbon aktif', values: [0, 3, 1, 0, 3] },
    { name: 'Reverse Osmosis', values: [2, 2, 3, 3, 1] },
  ],
  source: 'Estimasi edukatif; hasil nyata bergantung pada kondisi air, spesifikasi alat, dan perawatan filter.',
};

export const articleCharts: Record<string, WaterChart[]> = {
  'bahaya-logam-berat-dalam-air-minum': [heavyMetalLimits, hydrationNeeds],
  'dampak-minum-air-berkarat': [ironLevels, ironIntake],
  'kelebihan-zat-besi-pada-air-sumur': [ironLevels, treatmentRadar],
  'mitos-merebus-air-menghilangkan-logam': [filterEffectiveness, treatmentRadar],
};
