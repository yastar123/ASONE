import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { articles } from '@/lib/articles';

export const Route = createFileRoute('/artikel/')({
  head: () => ({ meta: [
    { title: 'Artikel Kualitas Air Minum — AsonE' },
    { name: 'description', content: 'Artikel edukasi tentang logam berat, air berkarat, zat besi berlebih, dan cara menyaring air minum dengan tepat.' },
    { property: 'og:title', content: 'Artikel Kualitas Air Minum — AsonE' },
    { property: 'og:description', content: 'Pelajari bahaya cemaran air minum dan cara mengatasinya.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: ArticleList,
});

function ArticleList() {
  return (
    <main className="page-width py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Kembali ke beranda</Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-primary">Edukasi Air</p>
      <h1 className="mt-2 text-4xl font-semibold text-foreground md:text-5xl">Artikel</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">Kenali cemaran yang sering tidak terlihat di air minum Anda, dampaknya bagi kesehatan, dan cara menanganinya.</p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {articles.map((a) => (
          <Link key={a.slug} to="/artikel/$slug" params={{ slug: a.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg">
            <img src={a.image} alt={a.imageAlt} loading="lazy" className="aspect-[16/10] w-full object-cover transition group-hover:scale-[1.02]" />
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="font-semibold text-primary">{a.category}</span><span className="flex items-center gap-1"><Clock className="size-3" />{a.readMinutes} menit baca</span></div>
              <h2 className="mt-3 text-xl font-semibold text-foreground">{a.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{a.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Baca selengkapnya <ArrowRight className="size-4" /></span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
