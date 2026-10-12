import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { articles } from "@/lib/articles";

export const Route = createFileRoute("/artikel/")({
  head: () => ({
    meta: [
      { title: "Artikel Kualitas Air Minum — AsonE" },
      {
        name: "description",
        content:
          "Artikel edukasi tentang logam berat, air berkarat, zat besi berlebih, dan cara menyaring air minum dengan tepat.",
      },
      { property: "og:title", content: "Artikel Kualitas Air Minum — AsonE" },
      {
        property: "og:description",
        content: "Pelajari bahaya cemaran air minum dan cara mengatasinya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticleList,
});

function ArticleList() {
  return (
    <main className="page-width py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Kembali ke beranda
      </Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-primary">
        Edukasi Air
      </p>
      <h1 className="mt-2 text-4xl font-semibold text-foreground md:text-5xl">Artikel</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Kenali cemaran yang sering tidak terlihat di air minum Anda, dampaknya bagi kesehatan, dan
        cara menanganinya.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to="/artikel/$slug"
            params={{ slug: a.slug }}
            className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl"
          >
            <div className="overflow-hidden">
              <img
                src={a.image}
                alt={a.imageAlt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-bold text-primary">{a.category}</span>
                <span aria-hidden="true" className="text-muted-foreground/60">
                  ·
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="size-3.5" />
                  {a.readMinutes} menit baca
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {a.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{a.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                Baca selengkapnya{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
