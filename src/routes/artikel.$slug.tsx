import { Fragment } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CircleCheck, Clock, Droplets, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles, getArticle } from "@/lib/articles";
import { product } from "@/lib/product-data";
import { WaterChartCard } from "@/components/water-chart";
import { articleCharts } from "@/lib/water-data";

export const Route = createFileRoute("/artikel/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Artikel tidak ditemukan — AsonE" },
          { name: "robots", content: "noindex" },
        ],
      };
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} — AsonE` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: a.image },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticleDetail,
});

function ArticleNotFound() {
  return (
    <main className="page-width py-20 text-center">
      <h1 className="text-2xl font-semibold">Artikel tidak ditemukan</h1>
      <Link to="/artikel" className="mt-4 inline-block text-primary underline">
        Lihat semua artikel
      </Link>
    </main>
  );
}

function ArticleDetail() {
  const { article: a } = Route.useLoaderData();
  const charts = articleCharts[a.slug] ?? [];
  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <main className="page-width py-12">
      <Link
        to="/artikel"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Semua artikel
      </Link>
      <article className="mx-auto mt-8 max-w-3xl">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-widest text-primary">{a.category}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {a.readMinutes} menit baca
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          {a.title}
        </h1>
        <img
          src={a.image}
          alt={a.imageAlt}
          className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
        />
        <p className="mt-8 text-lg leading-8 text-foreground">{a.intro}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {a.facts.map((f) => (
            <div key={f.label} className="stat-pill p-4">
              <div className="font-display text-2xl font-bold text-primary font-mono tabular-nums">
                {f.value}
              </div>
              <div className="mt-1 text-xs leading-5 text-muted-foreground">{f.label}</div>
            </div>
          ))}
        </div>
        <aside
          className="mt-8 rounded-2xl border border-border bg-secondary p-6"
          aria-labelledby="ringkasan"
        >
          <h2 id="ringkasan" className="text-lg font-semibold text-foreground">
            Poin penting artikel ini
          </h2>
          <ul className="mt-4 space-y-3">
            {a.summary.map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-6 text-foreground">
                <CircleCheck className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </aside>
        {charts[0] && (
          <div className="mt-10">
            <WaterChartCard chart={charts[0]} />
          </div>
        )}
        {a.sections.map((s, i) => (
          <Fragment key={s.heading}>
            <section className="mt-10">
              <h2 className="text-2xl font-semibold text-foreground">{s.heading}</h2>
              <ul className="mt-5 space-y-4">
                {s.points.map((p) => (
                  <li key={p.title} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-1 leading-7 text-muted-foreground">{p.text}</p>
                  </li>
                ))}
              </ul>
            </section>
            {i === 0 &&
              charts.slice(1).map((c) => (
                <div key={c.title} className="mt-10">
                  <WaterChartCard chart={c} />
                </div>
              ))}
          </Fragment>
        ))}
        <div className="mt-12 rounded-2xl bg-secondary p-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Droplets className="size-5 text-primary" aria-hidden="true" />
            {a.asoneNote.heading}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{a.asoneNote.text}</p>
          <Button asChild className="mt-4">
            <a href={product.purchaseUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingBag />
              Beli di Shopee
              <ArrowUpRight />
            </a>
          </Button>
        </div>
        <p className="mt-6 text-xs leading-5 text-muted-foreground">
          Informasi bersifat edukatif, bukan nasihat medis. Foto ilustrasi dari Unsplash.
        </p>
      </article>
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-foreground">Artikel lainnya</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/artikel/$slug"
              params={{ slug: o.slug }}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={o.image}
                alt={o.imageAlt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <h3 className="p-4 font-semibold text-foreground">{o.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
