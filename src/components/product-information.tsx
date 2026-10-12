import { useState } from "react";
import { ShieldCheck, Sparkles, Filter, Droplet, CheckCircle2 } from "lucide-react";
import { product } from "@/lib/product-data";

const filterStages = [
  {
    step: "01",
    name: "Karbon Aktif Kelapa Alami",
    role: "Penyerap Bau & Residu Klorin",
    description:
      "Granula karbon aktif berbahan dasar tempurung kelapa alami dengan luas permukaan mikropori tinggi. Efektif menyerap bau tanah, senyawa organik volatil, dan residu klorin dari air PDAM/PAM.",
    highlight: "Mikropori 1.000+ m²/g",
    benefit: "Air terasa lebih segar, tidak berbau, dan nyaman di tenggorokan.",
  },
  {
    step: "02",
    name: "Bio-Keramik Mikro Berpori",
    role: "Filtrasi Partikel Halus & Aktivasi Alami",
    description:
      "Bola mineral keramik alami berpori mikro yang dibakar pada suhu tinggi. Berfungsi menyaring partikel mikro halus serta memancarkan resonansi mineral alami untuk kejernihan air.",
    highlight: "Filtrasi Fisik Tanpa Listrik",
    benefit: "Menjaga kejernihan air minum harian secara konsisten.",
  },
  {
    step: "03",
    name: "Bio-Alkaline Mineral Core",
    role: "Peningkat Derajat pH & Mineralisasi",
    description:
      "Media komposit mineral alami yang melepas ion mineral basa seperti magnesium dan kalsium secara terukur, menaikkan pH air menuju rentang alkali (klaim spesifikasi pH 9.0+).",
    highlight: "Pelepasan Mineral Basa Alami",
    benefit: "Menghasilkan air berkarakter alkali untuk hidrasi harian keluarga.",
  },
];

const claimGroups = [
  {
    category: "Pencernaan",
    title: "Kadar asam & pencernaan",
    claims:
      "Menetralkan dan menyeimbangkan kelebihan kadar asam dalam tubuh; menormalkan asam lambung.",
    note: "Tubuh mengatur keseimbangan asam-basa melalui paru-paru dan ginjal. pH air tidak membuktikan kemampuan menetralkan asam tubuh atau mengobati gangguan lambung.",
  },
  {
    category: "Metabolisme",
    title: "Ginjal & metabolisme",
    claims: "Gangguan ginjal; membantu penyembuhan batu ginjal; diabetes; kolesterol; asam urat.",
    note: "AsonE tidak terbukti mengobati kondisi tersebut. Penderita gangguan ginjal atau yang memiliki pembatasan cairan perlu mengikuti anjuran dokter sebelum mengubah kebiasaan minum.",
  },
  {
    category: "Sirkulasi",
    title: "Jantung & daya ingat",
    claims: "Darah tinggi; mencegah stroke; meningkatkan daya ingat.",
    note: "Bukti klinis khusus AsonE belum disertakan untuk klaim ini. Air alkali bukan pengganti obat, pemeriksaan, atau langkah pencegahan yang dianjurkan dokter.",
  },
  {
    category: "Hidrasi & Kulit",
    title: "Kulit & berat badan",
    claims: "Menjadikan kulit lembap; terapi kecantikan; menurunkan berat badan.",
    note: "Cukup minum mendukung hidrasi normal, tetapi tidak membuktikan manfaat khusus air alkali untuk kecantikan atau penurunan berat badan.",
  },
  {
    category: "Kebugaran",
    title: "Kesehatan seksual & reproduksi",
    claims: "Lemah syahwat; terapi kebugaran organ.",
    note: "Klaim ini belum didukung bukti klinis khusus produk. Keluhan organ dan vitalitas memerlukan pemeriksaan serta penanganan medis profesional.",
  },
  {
    category: "Sendi & Otot",
    title: "Sendi & nyeri",
    claims: "Mengatasi nyeri sendi.",
    note: "Air alkali tidak terbukti sebagai terapi nyeri sendi. Nyeri yang menetap perlu diperiksa untuk mengetahui penyebab anatomis atau peradangannya.",
  },
];

export function ProductInformation() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <>
      <section className="page-width pb-20" aria-labelledby="construction-title">
        <div className="grid gap-12 border-t border-border/80 pt-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="eyebrow mb-3 flex items-center gap-1.5 text-primary">
                <Filter className="size-3.5" /> MATERIAL & CARA KERJA
              </div>
              <h2
                id="construction-title"
                className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl"
              >
                Penyaringan Alami,
                <br />
                <span className="bg-gradient-to-r from-primary via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  100% Tanpa Listrik.
                </span>
              </h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-foreground/80">
                AsonE Water dirancang dengan material unggulan{" "}
                <strong className="text-primary font-bold">{product.mainMaterial}</strong>{" "}
                berstandar makanan (food-grade). Air mengalir dengan prinsip gravitasi melewati 3
                media filter khusus di dalam cartridge, menghasilkan air yang lebih jernih dan segar
                untuk rutinitas harian Anda.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                  <Droplet className="size-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Kapasitas Teko</div>
                  <div className="text-base font-extrabold text-foreground tabular-nums">
                    3,2 Liter
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-xs">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Sistem Operasi</div>
                  <div className="text-base font-extrabold text-foreground">Gravitasi Murni</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Sparkles className="size-4 text-primary" />
                <span>ANATOMI 3 TAHAP FILTER CARTRIDGE</span>
              </div>
              <span className="text-xs text-muted-foreground">Klik tahap untuk detail</span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {filterStages.map((stage, idx) => (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`rounded-xl p-3 text-left transition-all ${
                    activeStage === idx
                      ? "border border-primary bg-primary/5 shadow-xs"
                      : "border border-border/60 bg-muted/40 hover:bg-muted/70"
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold block ${activeStage === idx ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {stage.step}
                  </span>
                  <span className="mt-1 line-clamp-1 text-xs font-bold text-foreground">
                    {stage.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border/80 bg-muted/20 p-5 sm:p-6 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    Tahap {filterStages[activeStage].step} · {filterStages[activeStage].role}
                  </span>
                  <h3 className="text-lg font-extrabold text-foreground mt-0.5">
                    {filterStages[activeStage].name}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-card border border-border/70 rounded-md px-2.5 py-1 shrink-0">
                  {filterStages[activeStage].highlight}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-foreground/80">
                {filterStages[activeStage].description}
              </p>

              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs leading-relaxed text-emerald-950">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  <strong className="font-bold text-emerald-800">Manfaat Utama:</strong>{" "}
                  {filterStages[activeStage].benefit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section bg-gradient-to-b from-water-soft/50 via-background to-water-soft/20 py-20"
        aria-labelledby="health-claims-title"
      >
        <div className="page-width">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow mb-3 flex items-center justify-center gap-1.5 text-primary">
              <ShieldCheck className="size-3.5" /> INFORMASI KESEHATAN & EDUKASI
            </div>
            <h2 id="health-claims-title" className="section-title">
              Pahami Manfaat Hidrasi
              <br />
              <span className="bg-gradient-to-r from-primary via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Secara Ilmiah & Objektif.
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/80">
              Berikut adalah tinjauan objektif seputar klaim air alkali dan fisiologi tubuh. Kenali
              perbedaannya agar Anda dapat memanfaatkan hidrasi berkualitas secara bijak dan
              proporsional.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {claimGroups.map((item) => (
              <article
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <span>{item.category}</span>
                    <span aria-hidden="true" className="text-muted-foreground/60">
                      ·
                    </span>
                    <span className="text-muted-foreground font-normal">Tinjauan Ilmiah</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-3 rounded-xl border border-primary/20 bg-primary/[0.04] p-3 text-xs font-medium leading-relaxed text-foreground">
                    “{item.claims}”
                  </div>
                </div>
                <div className="mt-4 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">Fakta medis:</strong>{" "}
                  {item.note}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-primary/25 bg-card p-6 shadow-sm md:p-8">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-cyan-500 text-white shadow-sm">
              <ShieldCheck className="size-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Prinsip Utama: Hidrasi Sehat Bukan Pengganti Pengobatan Medis
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-foreground/80">
                AsonE adalah teko filtrasi air untuk kebutuhan hidrasi rumah tangga. Selalu gunakan
                air yang telah memenuhi standar kelayakan air minum. Produk tidak diperuntukkan bagi
                bayi. Jika Anda memiliki kondisi medis tertentu, konsultasikan dengan dokter atau
                tenaga kesehatan profesional.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
