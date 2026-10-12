import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ShoppingBag,
  Droplets,
  Leaf,
  ShieldCheck,
  Wind,
  FlaskConical,
  Check,
  Menu,
  X,
  Play,
  ImageIcon,
  ExternalLink,
  CircleCheck,
  Info,
  Package,
  Plus,
  Minus,
  Activity,
  Sparkles,
  Filter as FilterIcon,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { ProductInformation } from "@/components/product-information";
import { product, describePh } from "@/lib/product-data";
import { WaterChartCard } from "@/components/water-chart";
import { WaterTypesExplorer } from "@/components/water-types";
import {
  heavyMetalLimits,
  phComparison,
  filterEffectiveness,
  bodyWater,
  intakeSources,
  hydrationNeeds,
  treatmentRadar,
  ironLevels,
  waterTypePh,
} from "@/lib/water-data";
import waterNaturePhoto from "@/assets/images/water_purity_nature_1791786097694.jpg";

export interface ProductPhoto {
  id: string;
  src: string;
  label: string;
  title: string;
  tag: string;
  desc: string;
}

const productGallery: ProductPhoto[] = [
  {
    id: "01",
    src: "/product-1.png",
    label: "01 / Unit & Kemasan",
    title: "ASONE Pitcher Utama & Box Kemasan",
    tag: "Unit Utama 3,2L",
    desc: "Teko filter air alkali 3,2 liter berteknologi Korea, 100% bebas listrik berbahan Tritan Food-Grade bebas BPA.",
  },
  {
    id: "02",
    src: "/product-2.png",
    label: "02 / Cartridge 3 Tahap",
    title: "Sistem Presisi Corong & Cartridge Filter",
    tag: "Detail Komponen",
    desc: "Komponen filter presisi dengan karbon aktif kelapa alami, bio keramik, dan bio alkaline mineral core.",
  },
  {
    id: "03",
    src: "/product-3.png",
    label: "03 / Desain Ergonomis",
    title: "Pegangan Nyaman & Corong Presisi",
    tag: "Kemudahan Pakai",
    desc: "Desain ergonomis memudahkan pengisian air dan penuangan harian tanpa tumpah atau tercecer.",
  },
  {
    id: "04",
    src: "/product-4.png",
    label: "04 / Material Tritan",
    title: "Bodi Jernih Tritan Bebas BPA",
    tag: "Kualitas Fisik",
    desc: "Material tangguh berstandar makanan (food-grade), bening layaknya kaca kristal, tahan benturan dan higienis.",
  },
  {
    id: "05",
    src: "/product-5.png",
    label: "05 / Sudut Menyeluruh",
    title: "Proporsi Elegan 3,2 Liter Siap Pakai",
    tag: "Kapasitas Keluarga",
    desc: "Ukuran ideal (26 × 16 × 27 cm) yang pas di kulkas, meja makan, maupun ruang kerja keluarga Anda.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AsonE — Teko Filter Air Alkali | Clean & Healthy Hydration" },
      {
        name: "description",
        content:
          "Kenali AsonE, teko filter air alkali 3,2 liter tanpa listrik berbahan Tritan, dengan arang aktif, bio keramik, dan bio alkaline. Pahami pemakaian dan batasan klaim kesehatan.",
      },
      { property: "og:title", content: "AsonE — Clean & Healthy Hydration" },
      {
        property: "og:description",
        content:
          "Teko filter air alkali 3,2 liter. Kenali produk, pahami kualitas air, dan belanja melalui Shopee.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["Produk", "#produk"],
  ["Kualitas Air", "#kualitas-air"],
  ["Jenis Air", "#jenis-air"],
  ["Data Air", "#data-air"],
  ["Galeri", "#galeri"],
];
const allNav = [
  ["Produk", "#produk"],
  ["Kualitas Air", "#kualitas-air"],
  ["Jenis Air", "#jenis-air"],
  ["Data Air", "#data-air"],
  ["Galeri", "#galeri"],
  ["Tanya Jawab", "#faq"],
  ["Artikel", "/artikel"],
];
const features = [
  {
    icon: FlaskConical,
    title: "Formula pH 9.0+",
    text: "Dirancang untuk meningkatkan pH air menjadi alkali. Hasil dapat berbeda sesuai air sumber.",
    tag: "Klaim spesifikasi penjual",
  },
  {
    icon: Wind,
    title: "Air tanpa bau mengganggu",
    text: "Karbon aktif membantu menyerap bau, untuk pengalaman minum yang lebih segar.",
    tag: "Anti-odor",
  },
  {
    icon: ShieldCheck,
    title: "Kurangi sisa klorin",
    text: "Karbon aktif membantu menyerap sisa klorin pada air yang digunakan.",
    tag: "Anti-chlorine",
  },
  {
    icon: Droplets,
    title: "Satu teko, untuk sehari-hari",
    text: "Kapasitas 3,2 liter dengan desain praktis untuk menemani rutinitas hidrasi keluarga.",
    tag: "Kapasitas 3,2 liter",
  },
];
const faqs = [
  [
    "Apakah air dengan pH lebih tinggi selalu lebih baik?",
    "Tidak. pH hanya salah satu parameter kualitas air. Air minum juga harus memenuhi persyaratan mikrobiologi, fisik, dan kimia. Klaim pH 9,0+ AsonE berada di atas rentang pH 6,5–8,5 dalam Permenkes No. 2 Tahun 2023; ini bukan bukti memenuhi seluruh standar air minum.",
  ],
  [
    "Apakah teko ini bisa digunakan untuk air mentah?",
    "Gunakan air yang sudah layak minum. Jangan mengandalkan teko ini untuk membuat air mentah aman. Kemampuan menyaring bakteri atau kontaminan tertentu perlu dibuktikan dengan uji laboratorium independen.",
  ],
  [
    "Minuman apa yang tidak boleh dimasukkan?",
    `Jangan masukkan ${product.prohibitedWithCartridge.join(", ").toLowerCase()}, atau minuman sejenis saat cartridge masih terpasang. Teko ini diperuntukkan untuk air.`,
  ],
  [
    "Apakah air alkali aman untuk bayi?",
    "Jangan gunakan filter air alkali ini untuk bayi, sesuai peringatan produk. Untuk kebutuhan khusus, kondisi medis, atau penggunaan rutin, konsultasikan dengan tenaga kesehatan.",
  ],
  [
    "Apakah produk ini dapat mengobati penyakit?",
    "Produk ini tidak menggantikan peran medis. Klaim menetralkan asam tubuh, mencegah penyakit, menurunkan berat badan, atau manfaat kulit tidak dijamin dan memerlukan bukti klinis. Tetap jalani pola hidup sehat.",
  ],
  [
    "Bagaimana cara membeli dan mengganti cartridge?",
    "Pembelian diarahkan ke halaman produk Shopee. Periksa harga, stok, ongkir, petunjuk pemakaian, dan jadwal penggantian cartridge langsung pada penjual sebelum membeli.",
  ],
];

function BuyButton({
  light = false,
  label = "Beli di Shopee",
  compact = false,
}: {
  light?: boolean;
  label?: string;
  compact?: boolean;
}) {
  return (
    <Button
      asChild
      size={compact ? "default" : "lg"}
      className={`${light ? "buy-white" : "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]"} font-bold transition-all ${compact ? "h-10 px-4" : "h-12 px-7"}`}
    >
      <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer">
        <ShoppingBag className="size-4" />
        {label}
        <ArrowUpRight className="size-4" />
      </a>
    </Button>
  );
}
function Brand() {
  return (
    <a href="/" aria-label="AsonE beranda" className="shrink-0">
      <img
        src="/favicon.png"
        alt="Logo ASONE — Teknologi Korea"
        className="brand-logo"
        width={66}
        height={66}
      />
    </a>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPh, setSelectedPh] = useState(7);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedHeroIdx, setSelectedHeroIdx] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<ProductPhoto | null>(null);
  const [chartCategory, setChartCategory] = useState<
    "all" | "quality" | "filtration" | "hydration"
  >("all");
  const currentHero = productGallery[selectedHeroIdx] ?? productGallery[0]!;
  const ph = describePh(selectedPh);
  return (
    <>
      <div className="announcement">
        ✨ <span className="font-extrabold text-white">ASONE Alkaline Water Filter</span> · Hidrasi
        Bersih & Segar Setiap Hari <span className="mx-2 hidden sm:inline">/</span>{" "}
        <span className="hidden sm:inline font-semibold text-white/95">
          Kapasitas 3,2L Bebas Listrik
        </span>
      </div>
      <header className="site-header">
        <div className="page-width flex h-[80px] items-center justify-between gap-5">
          <Brand />
          <nav className="site-nav flex items-center gap-7" aria-label="Navigasi utama">
            {nav.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold hover:text-primary transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <BuyButton compact />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden border-border/80"
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav
            className="mobile-menu lg:hidden border-t border-border/80 bg-background/95 backdrop-blur-xl p-6 shadow-xl"
            aria-label="Navigasi seluler"
          >
            <div className="grid gap-2">
              {allNav.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-foreground hover:bg-primary/5 transition-colors"
                >
                  <span>{label}</span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </a>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/60">
              <BuyButton />
            </div>
          </nav>
        )}
      </header>
      <main>
        <section className="hero">
          <img
            src={currentHero.src}
            alt={currentHero.title}
            className="hero-image"
            fetchPriority="high"
          />
          <div className="page-width">
            <div className="hero-copy reveal">
              <div className="eyebrow mb-5">
                <Droplets className="size-3.5 text-primary" /> TEKNOLOGI HIDRASI SEGAR
              </div>
              <h1 className="hero-title">
                ASONE<span className="text-cyan-400">.</span>
                <span className="hero-category">
                  Alkaline <br />
                  Water Filter
                </span>
              </h1>
              <p className="mt-5 max-w-[390px] text-base leading-relaxed text-foreground/85">
                Kenali <strong className="text-foreground">ASONE Water</strong> — teko filter air
                alkali 3,2 liter tanpa listrik berbahan{" "}
                <strong className="text-primary font-bold">Plastik Tritan Food-Grade</strong>.
                Praktis menyaring air untuk rutinitas hidrasi sehat keluarga Anda.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <BuyButton />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="h-12 border-primary/40 bg-card/90 px-4 font-bold hover:bg-primary/10 hover:text-primary gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Play className="size-4 fill-primary text-primary" />
                  Tonton Video Demo
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="h-12 px-4 font-bold hover:bg-primary/5 hover:text-primary"
                >
                  <a href="#produk">
                    Fitur <ArrowRight className="size-4 ml-1" />
                  </a>
                </Button>
              </div>

              {/* Angle Switcher for Products 1 to 5 */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mr-1">
                  Sudut Teko:
                </span>
                {productGallery.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedHeroIdx(idx)}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                      selectedHeroIdx === idx
                        ? "border-primary bg-primary text-primary-foreground shadow-xs"
                        : "border-border/80 bg-card text-foreground/80 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                    aria-label={`Pilih sudut ${item.title}`}
                  >
                    <span>{item.id}</span>
                    <span className="hidden sm:inline text-[11px] font-medium opacity-90">
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>

              <div className="hero-details">
                <span>
                  <Check className="size-3.5" /> 3,2 Liter
                </span>
                <span>
                  <Check className="size-3.5" /> Bebas Listrik
                </span>
                <span>
                  <Check className="size-3.5" /> Tritan Bebas BPA
                </span>
              </div>
            </div>
          </div>
          <div className="hero-feature">
            <div>
              <span className="text-xs font-bold tracking-wide">{currentHero.label}</span>
              <span className="ml-3 hidden sm:inline text-xs font-normal text-white/80">
                {currentHero.title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActivePhoto(currentHero)}
              className="text-xs font-bold text-cyan-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              Perbesar Foto <ArrowUpRight className="inline size-4" />
            </button>
          </div>
        </section>
        <div className="border-b border-border bg-gradient-to-r from-background via-water-soft/40 to-background py-5">
          <div className="page-width grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              [Droplets, "Hidrasi Sehat Setiap Hari"],
              [Leaf, "Formula Air Alkali Alami"],
              [ShieldCheck, "Karbon Aktif Anti-Bau"],
              [Package, "Kapasitas 3,2L Keluarga"],
            ].map(([Icon, label], i) => {
              const FeatureIcon = Icon as typeof Droplets;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border/80 bg-card p-3.5 shadow-xs transition-all hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FeatureIcon className="size-5" />
                  </div>
                  <span className="text-xs font-bold text-foreground">{label as string}</span>
                </div>
              );
            })}
          </div>
        </div>

        <section id="produk" className="section page-width product-section">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-3">FITUR UNGGULAN TEKO</p>
              <h2 className="section-title">
                Air Lebih Segar & Alami.
                <br />
                <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  Rutinitas Hidrasi Maksimal.
                </span>
              </h2>
            </div>
            <p className="max-w-[360px] text-sm leading-relaxed text-foreground/80">
              Ketahui keunggulan di dalam teko filter AsonE dan bagaimana komponennya bekerja untuk
              menemani keseharian Anda.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            <article className="feature-card lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="icon-tile">
                    <FlaskConical className="size-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-primary">01 / FITUR UTAMA</span>
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-extrabold text-foreground">
                  Formula Derajat pH 9.0+ & Mineral Alami
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  Dirancang khusus untuk membantu menaikkan derajat pH air minum menuju karakter
                  alkali segar dengan bantuan media bio-alkaline dan komposit mineral alami.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-primary">Klaim Spesifikasi Penjual</span>
                <span>Tergantung sumber air baku</span>
              </div>
            </article>

            <article className="feature-card lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="icon-tile">
                    <Wind className="size-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-primary">02</span>
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-foreground">
                  Air Tanpa Bau Mengganggu
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-foreground/80">
                  Karbon aktif tempurung kelapa menyerap senyawa volatil dan aroma tanah,
                  menghadirkan rasa air yang netral dan segar.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-primary">
                Karbon Tempurung Kelapa
              </div>
            </article>

            <article className="feature-card lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="icon-tile">
                    <ShieldCheck className="size-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-primary">03</span>
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-foreground">
                  Reduksi Residu Klorin
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-foreground/80">
                  Membantu mengurangi residu klorin dan kaporit dari instalasi air perpipaan kota
                  untuk hidrasi yang lebih nyaman diminum.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-primary">
                Filtrasi Klorin Aktif
              </div>
            </article>

            <article className="feature-card lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="icon-tile">
                    <Droplets className="size-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-primary">04</span>
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-extrabold text-foreground">
                  Kapasitas 3,2 Liter Ramah Keluarga
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  Cukup untuk kebutuhan hidrasi harian seluruh anggota keluarga tanpa perlu colokan
                  kabel, dispenser berat, atau tagihan listrik tambahan.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-primary">100% Bebas Listrik</span>
                <span>Material Tritan Food-Grade</span>
              </div>
            </article>
          </div>
          <p className="mt-6 text-xs leading-5 text-muted-foreground">
            * Spesifikasi berdasarkan informasi penjual. Efektivitas filter dan pH hasil memerlukan
            pengujian; bukan jaminan kualitas air atau manfaat medis.
          </p>
        </section>

        <ProductInformation />

        <section
          id="kualitas-air"
          className="section bg-gradient-to-b from-water-soft via-background to-water-soft/30 py-20"
        >
          <div className="page-width">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow mb-3">EDUKASI KUALITAS AIR</p>
              <h2 className="section-title">
                Air yang Baik Bukan
                <br />
                <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  Sekadar Terlihat Jernih.
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                Derajat keasaman (pH), total zat terlarut (TDS), dan kebersihan mikrobiologi adalah
                parameter penentu. Kenali skalanya di bawah ini:
              </p>
            </div>
            <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">
                    Simulasi Skala Derajat pH (0 — 14)
                  </h3>
                  <span className="text-xs font-semibold text-primary">Interaktif</span>
                </div>
                <div className="ph-scale" role="group" aria-label="Skala pH interaktif">
                  {Array.from({ length: 15 }, (_, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      aria-label={`pH ${i}`}
                      aria-pressed={selectedPh === i}
                      data-active={selectedPh === i}
                      onClick={() => setSelectedPh(i)}
                    >
                      {i}
                    </Button>
                  ))}
                </div>
                <div className="mt-3 flex justify-between text-xs font-bold text-muted-foreground">
                  <span className="text-red-500">ASAM (0-6)</span>
                  <span className="text-emerald-600">NETRAL (7)</span>
                  <span className="text-primary">BASA / ALKALI (8-14)</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-muted-foreground mr-1">
                    Simulasi Cepat:
                  </span>
                  {[
                    { label: "Lemon (pH 2)", val: 2 },
                    { label: "Kopi (pH 5)", val: 5 },
                    { label: "Air Murni (pH 7)", val: 7 },
                    { label: "Ideal Permenkes (pH 8)", val: 8 },
                    { label: "Alkali AsonE (pH 9)", val: 9 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setSelectedPh(preset.val)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                        selectedPh === preset.val
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted text-foreground/80 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex items-start gap-5 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
                  <div className="number min-w-14 text-primary tabular-nums">{selectedPh}</div>
                  <div aria-live="polite">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-foreground">{ph.label}</h4>
                      {selectedPh >= 6.5 && selectedPh <= 8.5 ? (
                        <span className="text-xs font-bold text-emerald-700">
                          · Rentang Ideal Permenkes
                        </span>
                      ) : selectedPh > 8.5 ? (
                        <span className="text-xs font-bold text-primary">· Kategori Alkali</span>
                      ) : (
                        <span className="text-xs font-bold text-red-600">· Kategori Asam</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-foreground/80">
                      {ph.explanation}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3 rounded-xl border border-border/80 bg-background p-4 text-xs leading-relaxed text-foreground/85">
                  <Info className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p>
                    <strong className="text-primary font-bold">Catatan Regulasi:</strong> Standar pH
                    air minum Indonesia berdasarkan Permenkes No. 2 Tahun 2023 adalah{" "}
                    <strong>6,5–8,5</strong>. Klaim pH 9,0+ berada di atas rentang standar ini;
                    selalu sesuaikan dengan kondisi dan kebutuhan tubuh Anda.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs">
                <p className="eyebrow mb-3">ACUAN KEMENTERIAN KESEHATAN RI</p>
                <h3 className="text-xl font-bold text-foreground">Standar Baku Mutu Air Minum</h3>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Berdasarkan <strong>Permenkes No. 2 Tahun 2023</strong> tentang Standar Baku Mutu
                  Kesehatan Lingkungan untuk Media Air Minum:
                </p>
                <dl className="mt-5 divide-y divide-border/60">
                  {[
                    ["Derajat keasaman (pH)", "6,5 – 8,5", "Parameter Kimia Wajib"],
                    ["Total zat terlarut (TDS)", "< 300 mg/L", "Parameter Fisik"],
                    ["Tingkat Kekeruhan", "< 3 NTU", "Parameter Fisik"],
                    ["Bakteri E. coli & Koliform", "0 / 100 mL", "Parameter Mikrobiologi"],
                  ].map(([name, value, category]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-4 py-3.5 text-xs"
                    >
                      <div>
                        <dt className="font-semibold text-foreground">{name}</dt>
                        <span className="text-[11px] text-muted-foreground">{category}</span>
                      </div>
                      <dd className="font-mono font-bold text-emerald-700 tabular-nums text-sm">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="https://jdih.kemkes.go.id/storage/documents/pdfs/2023permenkes002.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary/10"
                >
                  Unduh Dokumen Resmi Permenkes <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="jenis-air" className="section page-width">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-3">MACAM-MACAM AIR</p>
              <h2 className="section-title">
                Kenali jenis air
                <br />
                yang Anda minum.
              </h2>
            </div>
            <p className="max-w-[330px] text-sm leading-7 text-muted-foreground">
              Dari air mineral hingga air sumur: asal, perkiraan pH, dan hal yang perlu
              diperhatikan.
            </p>
          </div>
          <WaterTypesExplorer />
          <div className="mt-8">
            <WaterChartCard chart={waterTypePh} />
          </div>
        </section>

        <section id="data-air" className="section page-width">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-3">DATA & FAKTA AIR</p>
              <h2 className="section-title">
                Angka yang perlu
                <br />
                Anda kenali.
              </h2>
            </div>
            <p className="max-w-[360px] text-sm leading-7 text-muted-foreground">
              Ringkasan data kualitas air dari standar resmi Permenkes, EFSA, dan literatur umum,
              disajikan dalam visualisasi grafik interaktif.
            </p>
          </div>

          {/* Quick Highlight Benchmark Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-card/90 p-4.5 shadow-xs transition-all hover:border-emerald-500/40 hover:shadow-md">
              <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Droplets className="size-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Standar Kualitas
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline gap-2">
                <span className="text-2xl font-black tracking-tight text-foreground font-display">
                  6,5 – 8,5
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  pH Ideal
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Rentang pH air minum layak konsumsi menurut Permenkes RI No. 2/2023.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-card/90 p-4.5 shadow-xs transition-all hover:border-amber-500/40 hover:shadow-md">
              <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
                <span className="flex size-7 items-center justify-center rounded-lg bg-amber-500/10">
                  <ShieldCheck className="size-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Batas Logam Ketat
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline gap-2">
                <span className="text-2xl font-black tracking-tight text-foreground font-display">
                  0,01
                </span>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  mg/L Timbal
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Batas maksimum cemaran logam toksik timbal & arsenik pada air minum.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-card/90 p-4.5 shadow-xs transition-all hover:border-sky-500/40 hover:shadow-md">
              <div className="flex items-center gap-2.5 text-sky-600 dark:text-sky-400">
                <span className="flex size-7 items-center justify-center rounded-lg bg-sky-500/10">
                  <Activity className="size-4" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Komposisi Tubuh
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline gap-2">
                <span className="text-2xl font-black tracking-tight text-foreground font-display">
                  ± 60%
                </span>
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                  Kandungan Air
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Rata-rata massa tubuh manusia adalah air, menuntut hidrasi yang higienis.
              </p>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-border/60 pb-4">
            <span className="text-xs font-semibold text-muted-foreground mr-1 hidden sm:inline">
              Kategori:
            </span>
            <button
              type="button"
              onClick={() => setChartCategory("all")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                chartCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-foreground/80 hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              <BarChart3 className="size-3.5" />
              <span>Semua Grafik</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${chartCategory === "all" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}
              >
                8
              </span>
            </button>

            <button
              type="button"
              onClick={() => setChartCategory("quality")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                chartCategory === "quality"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-foreground/80 hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              <Droplets className="size-3.5" />
              <span>Kualitas & Logam</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${chartCategory === "quality" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}
              >
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setChartCategory("filtration")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                chartCategory === "filtration"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-foreground/80 hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              <FilterIcon className="size-3.5" />
              <span>Metode Filtrasi</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${chartCategory === "filtration" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}
              >
                2
              </span>
            </button>

            <button
              type="button"
              onClick={() => setChartCategory("hydration")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                chartCategory === "hydration"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-foreground/80 hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              <Activity className="size-3.5" />
              <span>Hidrasi & Tubuh</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${chartCategory === "hydration" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}
              >
                3
              </span>
            </button>
          </div>

          {/* Filtered Charts Grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {(chartCategory === "all" || chartCategory === "quality") && (
              <>
                <WaterChartCard chart={phComparison} />
                <WaterChartCard chart={heavyMetalLimits} />
                <WaterChartCard chart={ironLevels} />
              </>
            )}
            {(chartCategory === "all" || chartCategory === "filtration") && (
              <>
                <WaterChartCard chart={filterEffectiveness} />
                <WaterChartCard chart={treatmentRadar} />
              </>
            )}
            {(chartCategory === "all" || chartCategory === "hydration") && (
              <>
                <WaterChartCard chart={bodyWater} />
                <WaterChartCard chart={intakeSources} />
                <WaterChartCard chart={hydrationNeeds} />
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <Info className="size-4 shrink-0 text-primary" />
              <span>
                Grafik bersifat edukatif berdasarkan standar resmi. Untuk memastikan kualitas air di
                rumah Anda, lakukan uji laboratorium.
              </span>
            </p>
            <span className="text-[11px] font-semibold text-foreground/80 shrink-0">
              Diperbarui: Oktober 2026
            </span>
          </div>
        </section>

        <section id="galeri" className="section page-width">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow mb-3">LEBIH DEKAT DENGAN ASONE</p>
              <h2 className="section-title">Satu Teko. Banyak Momen.</h2>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              Klik foto untuk melihat resolusi penuh
            </span>
          </div>
          <Tabs defaultValue="photo" className="mt-8 gallery-tabs">
            <TabsList
              aria-label="Jenis media produk"
              className="h-11 gap-1 bg-secondary rounded-xl p-1"
            >
              <TabsTrigger
                value="photo"
                className="gap-2 px-6 py-2 rounded-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ImageIcon className="size-4" aria-hidden="true" />
                Galeri Foto Resmi
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="gap-2 px-6 py-2 rounded-lg font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Play className="size-4" aria-hidden="true" />
                Panduan Video
              </TabsTrigger>
            </TabsList>
            <TabsContent value="photo" className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {productGallery.map((item) => (
                  <figure
                    key={item.id}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl"
                    onClick={() => setActivePhoto(item)}
                  >
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-muted/30 to-muted/10 p-3 flex items-center justify-center">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-3">
                        <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                          <ExternalLink className="size-3" /> Perbesar
                        </span>
                      </div>
                    </div>
                    <figcaption className="p-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {item.tag}
                      </div>
                      <h4 className="mt-1 text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="video" className="mt-8">
              <div className="grid gap-8 lg:grid-cols-12 items-center rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[310px] aspect-[9/16] overflow-hidden rounded-[2.5rem] p-2.5 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 shadow-2xl ring-1 ring-white/20">
                    {/* Simulated mobile speaker bar */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 h-4 w-24 rounded-full bg-slate-900/90 border border-white/10 flex items-center justify-center">
                      <div className="size-2 rounded-full bg-slate-700/80 mr-2" />
                      <div className="h-1 w-8 rounded-full bg-slate-700/60" />
                    </div>
                    <div className="size-full overflow-hidden rounded-[2rem] bg-black relative">
                      <video
                        src="/video-a.mp4"
                        poster="/product-1.png"
                        controls
                        playsInline
                        preload="metadata"
                        className="size-full object-cover"
                      >
                        <source src="/video-a.mp4" type="video/mp4" />
                        <source src="/video-1.mp4" type="video/mp4" />
                        Browser Anda tidak mendukung tag video.
                      </video>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="eyebrow mb-2 flex items-center gap-1.5 text-primary">
                      <Play className="size-3.5 fill-primary" /> VIDEO DEMO ASLI (12 DETIK)
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      Melihat Langsung Teko AsonE & Aliran Filtrasi Alami
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-foreground/80">
                      Saksikan demonstrasi fisik teko filter air alkali AsonE. Tanpa colokan listrik
                      dan kabel, cukup tuang air dari corong atas dan gravitasi mengalirkan air
                      melalui 3 lapisan filter cartridge.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5">
                      <div className="text-xs font-mono font-bold text-primary">01 / Gravitasi</div>
                      <div className="mt-1 text-xs font-semibold text-foreground">
                        100% Bebas Listrik
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-normal">
                        Bisa diletakkan di mana saja tanpa repot kabel.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5">
                      <div className="text-xs font-mono font-bold text-primary">
                        02 / 3-Stage Filter
                      </div>
                      <div className="mt-1 text-xs font-semibold text-foreground">
                        Karbon & Bio Core
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-normal">
                        Menyerap bau klorin dan menyeimbangkan pH air.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5">
                      <div className="text-xs font-mono font-bold text-primary">
                        03 / Tritan Bebas BPA
                      </div>
                      <div className="mt-1 text-xs font-semibold text-foreground">
                        Kapasitas 3,2L
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-normal">
                        Bening, kokoh, tahan banting dan higienis.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      type="button"
                      onClick={() => setIsVideoModalOpen(true)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-sm gap-2 cursor-pointer"
                    >
                      <Play className="size-4 fill-primary-foreground" />
                      Buka Video Layar Penuh
                    </Button>
                    <BuyButton compact label="Beli Teko di Shopee" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-border/80 bg-card p-5 text-xs text-muted-foreground shadow-xs">
            <span className="font-bold text-foreground">Spesifikasi Fisik Teko:</span>
            <span>
              Kapasitas:{" "}
              <strong className="text-foreground">
                {String(product.capacityLiters).replace(".", ",")} Liter
              </strong>
            </span>
            <span>
              Dimensi Kotak:{" "}
              <strong className="text-foreground">{product.boxDimensionsCm.join(" × ")} cm</strong>
            </span>
            <span>
              Material Utama: <strong className="text-foreground">{product.mainMaterial}</strong>
            </span>
            <span>
              Sistem Operasi:{" "}
              <strong className="text-foreground">{product.operatingSystem} Bebas Listrik</strong>
            </span>
            <span>
              Media: <strong className="text-foreground">{product.filterMedia.join(", ")}</strong>
            </span>
          </div>
        </section>

        <section id="testimoni" className="section bg-warm">
          <div className="page-width">
            <div className="text-center">
              <p className="eyebrow mb-3">CERITA PENGGUNA</p>
              <h2 className="section-title">Ruang untuk Pengalaman Anda.</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Ulasan terverifikasi akan ditampilkan setelah tersedia dari pembeli resmi.
              </p>
            </div>
            <TestimonialCarousel />
            <div className="mt-6 text-center">
              <Button asChild variant="link" className="font-bold text-primary">
                <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer">
                  Lihat ulasan pembeli di Shopee <ArrowUpRight className="size-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section id="faq" className="section page-width">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow mb-3">SEBELUM TEGUKAN PERTAMA</p>
              <h2 className="section-title">
                Hal yang Perlu
                <br />
                Anda Ketahui.
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/80">
                Pilihan yang baik dimulai dengan informasi yang jelas dan transparan. Kenali cara
                pakai serta batasan produk.
              </p>
              <div className="mt-6 flex max-w-xs items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-foreground/85">
                  Bukan pengganti perawatan medis. Gunakan air yang sudah layak minum dan ikuti
                  petunjuk penjual.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {faqs.map(([question, answer], i) => (
                <div
                  key={question}
                  className="rounded-2xl border border-border/80 bg-card p-1.5 shadow-xs transition-all hover:border-primary/40"
                >
                  <Button
                    variant="ghost"
                    className="h-auto w-full justify-between whitespace-normal rounded-xl px-4 py-3.5 text-left text-sm font-bold text-foreground hover:bg-primary/[0.04]"
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="pr-3 leading-snug">{question}</span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {openFaq === i ? (
                        <Minus className="size-4 text-primary" />
                      ) : (
                        <Plus className="size-4 text-primary" />
                      )}
                    </span>
                  </Button>
                  {openFaq === i && (
                    <p
                      id={`faq-${i}`}
                      className="px-4 pb-4 pt-1 text-xs leading-relaxed text-foreground/80"
                    >
                      {answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-24 text-white">
          <img
            src={waterNaturePhoto}
            alt="Mata air pegunungan alami"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-primary/90 to-cyan-950/85 backdrop-blur-[2px]" />
          <div className="page-width relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="eyebrow mb-3 bg-white text-primary font-extrabold shadow-md">
                ✨ PILIHAN HIDRASI KELUARGA
              </span>
              <h2 className="section-title text-white">
                Awali Gaya Hidup Sehat dengan Teko AsonE.
              </h2>
              <p className="mt-4 text-base font-medium text-white/90 leading-relaxed">
                Kapasitas 3,2 Liter · 100% Bebas Listrik · 3 Media Filter Alami (Karbon Aktif,
                Bio-Keramik, Bio-Alkaline) · Tritan Bebas BPA
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <BuyButton light label="Dapatkan AsonE di Shopee" />
              <p className="mt-3 text-xs font-semibold text-white/90">
                Toko Resmi · Garansi Pengiriman Cepat ke Seluruh Indonesia
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="page-width pb-20 md:pb-8 pt-12">
        <div className="flex flex-col justify-between gap-7 md:flex-row">
          <div>
            <Brand />
            <p className="mt-4 max-w-xs text-xs leading-6 text-muted-foreground">
              Pilihan hidrasi yang dimulai dengan mengenal air Anda.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-medium text-foreground/75">
            <a href="#produk" className="hover:text-primary transition-colors">
              Tentang AsonE
            </a>
            <a href="#kualitas-air" className="hover:text-primary transition-colors">
              Edukasi Air
            </a>
            <a href="#jenis-air" className="hover:text-primary transition-colors">
              Macam Air
            </a>
            <a href="#data-air" className="hover:text-primary transition-colors">
              Data Mutu
            </a>
            <a href="#galeri" className="hover:text-primary transition-colors">
              Galeri Produk
            </a>
            <a
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-bold text-primary"
            >
              Shopee Resmi <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-border pt-6 text-[11px] leading-5 text-muted-foreground">
          <span>
            © {new Date().getUTCFullYear()} AsonE. Clean & Healthy Hydration. Seluruh hak cipta
            dilindungi.
          </span>
          <span>
            Informasi bersifat edukatif dan bukan nasihat medis. Klaim produk berasal dari penjual;
            hasil penggunaan individual dapat bervariasi sesuai sumber air yang digunakan.
          </span>
        </div>
      </footer>

      {/* Floating Mobile Sticky CTA: < 15% mobile viewport height */}
      <div className="fixed bottom-0 inset-x-0 z-30 flex items-center justify-between gap-3 border-t border-border/80 bg-background/95 px-4 py-2.5 shadow-xl backdrop-blur-md md:hidden">
        <div>
          <div className="text-xs font-extrabold text-foreground">ASONE Water Filter</div>
          <div className="text-[10px] text-muted-foreground">3,2L · Bebas Listrik</div>
        </div>
        <BuyButton compact label="Beli di Shopee" />
      </div>

      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full overflow-hidden rounded-2xl bg-card border border-border/80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black transition-colors"
              aria-label="Tutup foto"
            >
              <X className="size-5" />
            </button>
            <div className="max-h-[65vh] overflow-hidden bg-black/5 flex items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[65vh] w-full object-contain"
              />
            </div>
            <div className="p-6">
              <div className="text-xs font-bold text-primary uppercase tracking-wider">
                {activePhoto.tag}
              </div>
              <h3 className="mt-1 text-xl font-bold text-foreground">{activePhoto.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {activePhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full overflow-hidden rounded-3xl bg-card border border-border/80 shadow-2xl p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black transition-colors cursor-pointer"
              aria-label="Tutup pemutar video"
            >
              <X className="size-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Play className="size-4 fill-primary" />
              </span>
              <div>
                <h3 id="video-modal-title" className="text-base font-bold text-foreground">
                  Video Demonstrasi Teko AsonE
                </h3>
                <p className="text-xs text-muted-foreground">
                  ASONE Pitcher 3,2L · 100% Bebas Listrik
                </p>
              </div>
            </div>
            <div className="relative mx-auto aspect-[9/16] max-h-[60vh] overflow-hidden rounded-2xl bg-black shadow-lg">
              <video
                src="/video-a.mp4"
                poster="/product-1.png"
                controls
                autoPlay
                playsInline
                className="size-full object-contain"
              >
                <source src="/video-a.mp4" type="video/mp4" />
                <source src="/video-1.mp4" type="video/mp4" />
                Browser Anda tidak mendukung pemutar video.
              </video>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-border/60">
              <span className="text-xs text-muted-foreground">Toko Resmi · Garansi Pengiriman</span>
              <BuyButton compact label="Beli di Shopee" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
