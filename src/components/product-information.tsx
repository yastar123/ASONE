import { ShieldCheck } from 'lucide-react';
import { product } from '@/lib/product-data';

const claimGroups = [
  { title: 'Kadar asam & pencernaan', claims: 'Menetralkan dan menyeimbangkan kelebihan kadar asam dalam tubuh; menormalkan asam lambung.', note: 'Tubuh mengatur keseimbangan asam-basa melalui paru-paru dan ginjal. pH air tidak membuktikan kemampuan menetralkan asam tubuh atau mengobati gangguan lambung.' },
  { title: 'Ginjal & metabolisme', claims: 'Gangguan ginjal; membantu penyembuhan batu ginjal; diabetes; kolesterol; asam urat.', note: 'AsonE tidak terbukti mengobati kondisi tersebut. Penderita gangguan ginjal atau yang memiliki pembatasan cairan perlu mengikuti anjuran dokter sebelum mengubah kebiasaan minum.' },
  { title: 'Jantung & daya ingat', claims: 'Darah tinggi; mencegah stroke; meningkatkan daya ingat.', note: 'Bukti klinis khusus AsonE belum disertakan untuk klaim ini. Air alkali bukan pengganti obat, pemeriksaan, atau langkah pencegahan yang dianjurkan dokter.' },
  { title: 'Kulit & berat badan', claims: 'Menjadikan kulit lembap; terapi kecantikan; menurunkan berat badan.', note: 'Cukup minum mendukung hidrasi normal, tetapi tidak membuktikan manfaat khusus air alkali untuk kecantikan atau penurunan berat badan.' },
  { title: 'Kesehatan seksual & kewanitaan', claims: 'Lemah syahwat; terapi kewanitaan.', note: 'Klaim ini belum didukung bukti klinis khusus produk. Keluhan seksual dan kewanitaan memerlukan pemeriksaan serta penanganan tenaga kesehatan.' },
  { title: 'Sendi & nyeri', claims: 'Mengatasi nyeri sendi.', note: 'Air alkali tidak terbukti sebagai terapi nyeri sendi. Nyeri yang menetap perlu diperiksa untuk mengetahui penyebabnya.' },
];

export function ProductInformation() {
  return <>
    <section className="page-width pb-16" aria-labelledby="construction-title">
      <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-2">
        <div><p className="eyebrow mb-3">MATERIAL & CARA KERJA</p><h2 id="construction-title" className="text-2xl font-semibold">Penyaringan tanpa listrik.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">AsonE Water adalah alat filter air dengan bahan utama {product.mainMaterial.toLowerCase()}. Sistem kerjanya menggunakan penyaringan: air melewati media di dalam cartridge sebelum terkumpul di teko. Tidak memerlukan sambungan listrik.</p><p className="mt-4 text-xs leading-6 text-muted-foreground">Spesifikasi berdasarkan informasi pemilik produk. Gunakan air yang sudah layak minum dan ikuti petunjuk pencucian, pemakaian, serta penggantian cartridge dari penjual.</p></div>
        <div><p className="eyebrow mb-3">MEDIA DI DALAM FILTER</p><ol>{product.filterMedia.map((name, i) => <li key={name} className="flex items-start gap-4 border-b border-border py-4"><span className="text-xs font-semibold text-primary">0{i + 1}</span><div><h3 className="text-sm font-semibold">{name}</h3><p className="mt-1 text-xs leading-6 text-muted-foreground">{i === 0 ? 'Karbon aktif membantu menyerap bau dan sisa klorin. Kemampuan aktual bergantung pada kondisi air dan filter.' : 'Media filter yang diinformasikan oleh pemilik produk. Komposisi, pengaruh terhadap air, dan efektivitasnya perlu dikonfirmasi melalui spesifikasi serta hasil uji.'}</p></div></li>)}</ol></div>
      </div>
    </section>
    <section className="section bg-water-soft" aria-labelledby="health-claims-title"><div className="page-width">
      <p className="eyebrow mb-3">INFORMASI KLAIM KESEHATAN</p><h2 id="health-claims-title" className="section-title">Bedakan hidrasi<br />dengan terapi medis.</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">Materi promosi yang diberikan menyebut “terapi & pencegahan”. Daftar berikut adalah klaim promosi, bukan manfaat AsonE yang telah dibuktikan secara klinis. Bukti uji klinis khusus produk belum disertakan, sehingga klaim ini tidak dapat dijadikan janji penyembuhan atau pencegahan penyakit.</p>
      <div className="mt-9 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{claimGroups.map(item => <article key={item.title} className="border-t border-border pt-5"><h3 className="text-base font-semibold">{item.title}</h3><p className="mt-3 text-xs font-medium text-primary">Klaim promosi — belum terverifikasi</p><p className="mt-2 text-sm leading-7">{item.claims}</p><p className="mt-3 text-xs leading-6 text-muted-foreground">{item.note}</p></article>)}</div>
      <div className="mt-9 flex gap-3 border-y border-border py-5"><ShieldCheck className="mt-1 size-5 shrink-0 text-primary" /><p className="text-xs leading-7"><strong>Bukan alat terapi atau pengganti perawatan medis.</strong> Jangan menghentikan obat atau menunda pemeriksaan karena klaim air alkali. Produk tidak diperuntukkan bagi bayi. Utamakan air yang memenuhi standar kualitas air minum.</p></div>
    </div></section>
  </>;
}