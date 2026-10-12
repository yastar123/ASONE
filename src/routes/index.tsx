import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, ShoppingBag, Droplets, Leaf, ShieldCheck, Wind, FlaskConical, Check, Menu, X, Play, ImageIcon, ExternalLink, CircleCheck, Info, Package, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import originalPhoto from '@/assets/asone-product.png';
import { ProductInformation } from '@/components/product-information';
import { product, describePh } from '@/lib/product-data';
import { WaterChartCard } from '@/components/water-chart';
import { WaterTypesExplorer } from '@/components/water-types';
import { heavyMetalLimits, phComparison, filterEffectiveness, bodyWater, intakeSources, hydrationNeeds, treatmentRadar, ironLevels, waterTypePh } from '@/lib/water-data';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'AsonE — Teko Filter Air Alkali | Clean & Healthy Hydration' },
    { name: 'description', content: 'Kenali AsonE, teko filter air alkali 3,2 liter tanpa listrik berbahan Tritan, dengan arang aktif, bio keramik, dan bio alkaline. Pahami pemakaian dan batasan klaim kesehatan.' },
    { property: 'og:title', content: 'AsonE — Clean & Healthy Hydration' },
    { property: 'og:description', content: 'Teko filter air alkali 3,2 liter. Kenali produk, pahami kualitas air, dan belanja melalui Shopee.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const nav = [['Produk', '#produk'], ['Kualitas Air', '#kualitas-air'], ['Jenis Air', '#jenis-air'], ['Data Air', '#data-air'], ['Galeri', '#galeri'], ['Tanya Jawab', '#faq'], ['Artikel', '/artikel']];
const features = [
  { icon: FlaskConical, title: 'Formula pH 9.0+', text: 'Dirancang untuk meningkatkan pH air menjadi alkali. Hasil dapat berbeda sesuai air sumber.', tag: 'Klaim spesifikasi penjual' },
  { icon: Wind, title: 'Air tanpa bau mengganggu', text: 'Karbon aktif membantu menyerap bau, untuk pengalaman minum yang lebih segar.', tag: 'Anti-odor' },
  { icon: ShieldCheck, title: 'Kurangi sisa klorin', text: 'Karbon aktif membantu menyerap sisa klorin pada air yang digunakan.', tag: 'Anti-chlorine' },
  { icon: Droplets, title: 'Satu teko, untuk sehari-hari', text: 'Kapasitas 3,2 liter dengan desain praktis untuk menemani rutinitas hidrasi keluarga.', tag: 'Kapasitas 3,2 liter' },
];
const faqs = [
  ['Apakah air dengan pH lebih tinggi selalu lebih baik?', 'Tidak. pH hanya salah satu parameter kualitas air. Air minum juga harus memenuhi persyaratan mikrobiologi, fisik, dan kimia. Klaim pH 9,0+ AsonE berada di atas rentang pH 6,5–8,5 dalam Permenkes No. 2 Tahun 2023; ini bukan bukti memenuhi seluruh standar air minum.'],
  ['Apakah teko ini bisa digunakan untuk air mentah?', 'Gunakan air yang sudah layak minum. Jangan mengandalkan teko ini untuk membuat air mentah aman. Kemampuan menyaring bakteri atau kontaminan tertentu perlu dibuktikan dengan uji laboratorium independen.'],
  ['Minuman apa yang tidak boleh dimasukkan?', `Jangan masukkan ${product.prohibitedWithCartridge.join(', ').toLowerCase()}, atau minuman sejenis saat cartridge masih terpasang. Teko ini diperuntukkan untuk air.`],
  ['Apakah air alkali aman untuk bayi?', 'Jangan gunakan filter air alkali ini untuk bayi, sesuai peringatan produk. Untuk kebutuhan khusus, kondisi medis, atau penggunaan rutin, konsultasikan dengan tenaga kesehatan.'],
  ['Apakah produk ini dapat mengobati penyakit?', 'Produk ini tidak menggantikan peran medis. Klaim menetralkan asam tubuh, mencegah penyakit, menurunkan berat badan, atau manfaat kulit tidak dijamin dan memerlukan bukti klinis. Tetap jalani pola hidup sehat.'],
  ['Bagaimana cara membeli dan mengganti cartridge?', 'Pembelian diarahkan ke halaman produk Shopee. Periksa harga, stok, ongkir, petunjuk pemakaian, dan jadwal penggantian cartridge langsung pada penjual sebelum membeli.'],
];

function BuyButton({ light = false, label = 'Beli di Shopee', compact = false }: { light?: boolean; label?: string; compact?: boolean }) {
  return <Button asChild size={compact ? 'default' : 'lg'} className={`${light ? 'buy-white' : ''} ${compact ? '' : 'h-12 px-6'}`}><a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer"><ShoppingBag />{label}<ArrowUpRight /></a></Button>;
}
function Brand() { return <a href="/" aria-label="AsonE beranda" className="shrink-0"><img src="/favicon.png" alt="Logo ASONE — Teknologi Korea" className="brand-logo" width={66} height={66} /></a>; }

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPh, setSelectedPh] = useState(7);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mediaNotice, setMediaNotice] = useState<string | null>(null);
  const ph = describePh(selectedPh);
  return <>
    <div className="announcement">Clean water. A better everyday. <span className="mx-3">/</span> ASONE Alkaline Water Filter</div>
    <header className="site-header">
      <div className="page-width flex h-[80px] items-center justify-between gap-5">
        <Brand />
        <nav className="site-nav flex items-center gap-7" aria-label="Navigasi utama">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="flex items-center gap-2"><div className="hidden sm:block"><BuyButton compact /></div><Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      </div>
      {menuOpen && <nav className="mobile-menu lg:hidden" aria-label="Navigasi seluler">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<BuyButton /></nav>}
    </header>
    <main>
      <section className="hero">
        <img src={originalPhoto} alt="Foto asli teko filter air ASONE dan kemasannya di atas meja" className="hero-image" fetchPriority="high" />
        <div className="page-width"><div className="hero-copy reveal">
          <div className="eyebrow mb-5 flex items-center gap-2"><Droplets className="size-4" /> HIDRASI DIMULAI DI SINI</div>
          <h1 className="hero-title">ASONE<span className="text-water">.</span><span className="hero-category">Alkaline <br />Water Filter</span></h1>
          <p className="mt-5 max-w-[350px] text-sm leading-7 text-muted-foreground">Kenali ASONE Water, teko filter air alkali tanpa listrik berbahan plastik Tritan. Sistem penyaringan untuk menemani rutinitas hidrasi Anda.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4"><BuyButton /><Button variant="link" asChild className="px-0"><a href="#produk">Jelajahi produk <ArrowRight /></a></Button></div>
          <div className="hero-details"><span><Check className="size-3.5" /> 3,2 liter</span><span><Check className="size-3.5" /> Tanpa listrik</span><span><Check className="size-3.5" /> Plastik Tritan</span></div>
        </div></div>
        <div className="hero-feature"><span className="text-xs">01 / ASONE ORIGINAL</span><span className="text-xs">Teko & kemasan produk <ArrowUpRight className="inline size-4" /></span></div>
      </section>
      <div className="border-b border-border bg-background"><div className="page-width grid grid-cols-2 gap-6 py-7 md:grid-cols-4">{[[Droplets, 'Hidrasi sehari-hari'], [Leaf, 'Formula air alkali'], [ShieldCheck, 'Karbon aktif'], [Package, 'Praktis untuk keluarga']].map(([Icon, label], i) => { const FeatureIcon = Icon as typeof Droplets; return <div key={i} className="flex items-center justify-center gap-3 text-xs font-medium"><FeatureIcon className="size-5 text-primary" /><span>{label as string}</span></div>; })}</div></div>

      <section id="produk" className="section page-width product-section">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow mb-3">SEDERHANA, DI SETIAP TEGUKAN</p><h2 className="section-title">Air yang lebih nyaman.<br />Rutinitas yang lebih baik.</h2></div><p className="max-w-[330px] text-sm leading-7 text-muted-foreground">Kenali apa yang ada di dalam teko AsonE, dan bagaimana filternya menemani keseharian Anda.</p></div>
        <div className="feature-grid mt-10 grid sm:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: Icon, title, text, tag }, i) => <article className="feature-card" key={title}><div className="flex items-center justify-between"><div className="icon-tile"><Icon className="size-5" /></div><span className="text-xs text-muted-foreground">0{i + 1}</span></div><h3 className="mb-3 mt-6 text-base font-bold leading-6">{title}</h3><p className="text-xs leading-6 text-muted-foreground">{text}</p><div className="mt-6 border-t border-border pt-4 text-[10px] font-medium text-primary">{tag}</div></article>)}</div>
        <p className="mt-5 text-[11px] leading-5 text-muted-foreground">Spesifikasi berdasarkan informasi penjual. Efektivitas filter dan pH hasil memerlukan pengujian; bukan jaminan kualitas air atau manfaat medis.</p>
      </section>

      <ProductInformation />

      <section id="kualitas-air" className="section bg-water-soft">
        <div className="page-width">
          <div className="mx-auto max-w-xl text-center"><p className="eyebrow mb-3">KENALI AIR ANDA</p><h2 className="section-title">Air yang baik bukan<br />sekadar terlihat jernih.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">pH, kandungan zat terlarut, dan kebersihan mikrobiologi sama-sama penting. Kenali parameternya sebelum memilih.</p></div>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div><div className="mb-5 flex items-center justify-between"><h3 className="text-lg font-semibold">Memahami skala pH</h3><span className="text-xs text-muted-foreground">0 — 14</span></div>
              <div className="ph-scale" role="group" aria-label="Skala pH interaktif">{Array.from({ length: 15 }, (_, i) => <Button key={i} variant="ghost" aria-label={`pH ${i}`} aria-pressed={selectedPh === i} data-active={selectedPh === i} onClick={() => setSelectedPh(i)}>{i}</Button>)}</div>
              <div className="mt-3 flex justify-between text-[10px] text-muted-foreground"><span>ASAM</span><span>NETRAL</span><span>BASA / ALKALI</span></div>
              <div className="mt-7 flex items-start gap-4 border-y border-border py-5"><div className="number min-w-12 text-water">{selectedPh}</div><div aria-live="polite"><h4 className="mb-1 text-sm font-semibold">{ph.label}</h4><p className="text-xs leading-6 text-muted-foreground">{ph.explanation}</p></div></div>
              <div className="mt-5 flex gap-3 text-xs leading-6"><Info className="mt-1 size-4 shrink-0 text-water" /><p><strong>Perhatikan rentangnya.</strong> Standar pH air minum Indonesia adalah 6,5–8,5. Klaim pH 9,0+ produk berada di atas rentang ini; pH tinggi tidak otomatis lebih sehat.</p></div>
            </div>
            <div className="border-l-0 border-border lg:border-l lg:pl-10"><p className="eyebrow mb-3">ACUAN KEMENTERIAN KESEHATAN RI</p><h3 className="text-xl font-semibold">Standar kualitas air minum</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">Diatur dalam <strong>Permenkes No. 2 Tahun 2023</strong>, bukan satu undang-undang khusus pH. Berikut beberapa parameter wajib:</p>
              <dl className="mt-5">{[['Derajat keasaman (pH)', '6,5–8,5'], ['Total zat terlarut (TDS)', '< 300 mg/L'], ['Kekeruhan', '< 3 NTU'], ['E. coli & total koliform', '0 / 100 mL']].map(([name, value]) => <div key={name} className="flex items-center justify-between gap-4 border-b border-border py-3.5 text-xs"><dt className="text-muted-foreground">{name}</dt><dd className="font-semibold text-foreground">{value}</dd></div>)}</dl>
              <a href="https://jdih.kemkes.go.id/storage/documents/pdfs/2023permenkes002.pdf" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary underline underline-offset-4">Baca regulasi resmi <ExternalLink className="size-3" /></a>
              <p className="mt-3 text-[10px] leading-5 text-muted-foreground">Ringkasan, bukan seluruh parameter. Kepatuhan kualitas air perlu dibuktikan melalui pengujian laboratorium.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="jenis-air" className="section page-width">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow mb-3">MACAM-MACAM AIR</p><h2 className="section-title">Kenali jenis air<br />yang Anda minum.</h2></div><p className="max-w-[330px] text-sm leading-7 text-muted-foreground">Dari air mineral hingga air sumur: asal, perkiraan pH, dan hal yang perlu diperhatikan.</p></div>
        <WaterTypesExplorer />
        <div className="mt-8"><WaterChartCard chart={waterTypePh} /></div>
      </section>

      <section id="data-air" className="section page-width">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow mb-3">DATA & FAKTA AIR</p><h2 className="section-title">Angka yang perlu<br />Anda kenali.</h2></div><p className="max-w-[330px] text-sm leading-7 text-muted-foreground">Ringkasan data kualitas air dari standar resmi dan literatur umum, disajikan dalam grafik sederhana.</p></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <WaterChartCard chart={phComparison} />
          <WaterChartCard chart={heavyMetalLimits} />
          <WaterChartCard chart={ironLevels} />
          <WaterChartCard chart={filterEffectiveness} />
          <WaterChartCard chart={bodyWater} />
          <WaterChartCard chart={intakeSources} />
          <WaterChartCard chart={hydrationNeeds} />
          <WaterChartCard chart={treatmentRadar} />
        </div>
        <p className="mt-5 text-[11px] leading-5 text-muted-foreground">Grafik bersifat edukatif. Untuk memastikan kualitas air di rumah Anda, lakukan uji laboratorium terhadap sumber air.</p>
      </section>

      <section id="galeri" className="section page-width">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow mb-3">LEBIH DEKAT DENGAN ASONE</p><h2 className="section-title">Satu teko. Banyak momen.</h2></div><span className="text-xs text-muted-foreground">Detail produk & inspirasi keseharian</span></div>
        <Tabs defaultValue="photo" className="mt-7 gallery-tabs">
          <TabsList aria-label="Jenis media produk" className="h-11 gap-1 bg-secondary">
            <TabsTrigger value="photo" className="gap-2 px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><ImageIcon className="size-4" aria-hidden="true" />Foto</TabsTrigger>
            <TabsTrigger value="video" className="gap-2 px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Play className="size-4" aria-hidden="true" />Video</TabsTrigger>
          </TabsList>
          <TabsContent value="photo" className="mt-6"><div className="gallery-grid grid gap-5 sm:grid-cols-[2fr_1fr_1fr]"><figure><img src={originalPhoto} alt="Foto asli teko dan kemasan AsonE dari pemilik produk" className="gallery-photo" loading="lazy" /><figcaption className="mt-3 text-xs">ASONE Alkaline Water Filter <span className="text-muted-foreground">· Foto produk asli</span></figcaption></figure>{['Detail cartridge', 'AsonE di keseharian Anda'].map(label => <figure key={label}><div className="media-placeholder"><ImageIcon className="size-8 stroke-1" /><span className="text-xs">Foto segera hadir</span></div><figcaption className="mt-3 text-xs">{label} <span className="text-muted-foreground">· Placeholder</span></figcaption></figure>)}</div></TabsContent>
          <TabsContent value="video" className="mt-6"><div className="grid gap-6 md:grid-cols-2">{['Mengenal AsonE lebih dekat', 'Cara menggunakan teko AsonE'].map(label => <div key={label}><div className="video-placeholder"><Button variant="outline" size="icon" className="size-14 rounded-full" aria-label={`Informasi video ${label}`} onClick={() => setMediaNotice(label)}><Play className="size-5" /></Button></div><div className="mt-3 flex justify-between gap-3 text-xs"><span>{label}</span><span className="text-muted-foreground">Video segera hadir</span></div></div>)}</div></TabsContent>
        </Tabs>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 border-y border-border py-5 text-xs text-muted-foreground"><span className="font-semibold text-foreground">Spesifikasi produk</span><span>Kapasitas: {String(product.capacityLiters).replace('.', ',')} L</span><span>Dimensi kardus: {product.boxDimensionsCm.join(' × ')} cm</span><span>Bahan: {product.mainMaterial}</span><span>Sistem: {product.operatingSystem} tanpa listrik</span><span>Media filter: {product.filterMedia.join(', ')}</span></div>
      </section>

      <section id="testimoni" className="section bg-warm"><div className="page-width"><div className="text-center"><p className="eyebrow mb-3">CERITA PENGGUNA</p><h2 className="section-title">Ruang untuk pengalaman Anda.</h2><p className="mt-3 text-sm text-muted-foreground">Ulasan terverifikasi akan ditampilkan setelah tersedia.</p></div><TestimonialCarousel /><div className="mt-6 text-center"><Button asChild variant="link"><a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer">Lihat ulasan pembeli di Shopee <ArrowUpRight /></a></Button></div></div></section>

      <section id="faq" className="section page-width"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow mb-3">SEBELUM TEGUKAN PERTAMA</p><h2 className="section-title">Hal yang perlu<br />Anda ketahui.</h2><p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">Pilihan yang baik dimulai dengan informasi yang jelas. Kenali cara pakai dan batasan produk.</p><div className="mt-6 flex max-w-xs items-start gap-3 border-l-2 border-primary pl-4"><ShieldCheck className="mt-1 size-5 shrink-0 text-primary" /><p className="text-xs leading-6">Bukan pengganti perawatan medis. Gunakan air yang sudah layak minum dan ikuti petunjuk penjual.</p></div></div><div>{faqs.map(([question, answer], i) => <div key={question} className="border-b border-border"><Button variant="ghost" className="h-auto w-full justify-between whitespace-normal rounded-none px-0 py-5 text-left text-sm hover:bg-transparent" aria-expanded={openFaq === i} aria-controls={`faq-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>{question}{openFaq === i ? <Minus className="text-primary" /> : <Plus className="text-muted-foreground" />}</Button>{openFaq === i && <p id={`faq-${i}`} className="pb-5 pr-6 text-xs leading-7 text-muted-foreground">{answer}</p>}</div>)}</div></div></section>

      <section className="purchase-band py-16"><div className="page-width flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="eyebrow mb-3">AWALI RUTINITAS BARU ANDA</p><h2 className="section-title">AsonE, di setiap tegukan.</h2><p className="mt-3 text-sm opacity-80">Teko Filter Air Alkali · 3,2 liter · Karbon aktif</p></div><div><BuyButton light label="Dapatkan AsonE di Shopee" /><p className="mt-3 text-center text-[10px] opacity-80">Harga, stok, ongkir & pembayaran tersedia di Shopee</p></div></div></section>
    </main>
    <footer className="page-width pb-8 pt-12"><div className="flex flex-col justify-between gap-7 md:flex-row"><div><Brand /><p className="mt-4 max-w-xs text-xs leading-6 text-muted-foreground">Pilihan hidrasi yang dimulai dengan mengenal air Anda.</p></div><div className="flex flex-wrap gap-x-8 gap-y-4 text-xs text-muted-foreground"><a href="#produk">Tentang AsonE</a><a href="#kualitas-air">Edukasi air</a><a href="#galeri">Galeri produk</a><a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">Shopee <ArrowUpRight className="size-3" /></a></div></div><div className="mt-8 flex flex-col justify-between gap-3 border-t border-border pt-6 text-[10px] leading-5 text-muted-foreground"><span>© {new Date().getUTCFullYear()} AsonE. Clean & Healthy Hydration.</span><span>Informasi bersifat edukatif, bukan nasihat medis. Klaim produk berasal dari penjual; hasil individual dapat berbeda.</span></div></footer>
    {mediaNotice && <div role="dialog" aria-modal="true" aria-labelledby="video-title" className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 px-5" onClick={() => setMediaNotice(null)}><div className="relative w-full max-w-md rounded-lg bg-background p-8 shadow-xl" onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="absolute right-3 top-3" aria-label="Tutup informasi video" onClick={() => setMediaNotice(null)}><X /></Button><Play className="mb-5 size-8 text-primary" /><h2 id="video-title" className="text-xl font-semibold">{mediaNotice}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Video produk belum tersedia. Bagian ini akan menampilkan video asli AsonE setelah ditambahkan.</p><Button className="mt-6" onClick={() => setMediaNotice(null)}>Tutup</Button></div></div>}
  </>;
}
