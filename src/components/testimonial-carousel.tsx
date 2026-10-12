import { useState } from "react";
import { Pause, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const titles = ["Pengalaman penggunaan", "Rutinitas hidrasi", "Kualitas & kepraktisan"];

export function TestimonialCarousel() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="mt-9">
      <div className="mb-4 flex justify-end">
        <Button
          variant="outline"
          size="icon"
          aria-label={paused ? "Lanjutkan carousel testimoni" : "Jeda carousel testimoni"}
          aria-pressed={paused}
          title={paused ? "Lanjutkan" : "Jeda"}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </Button>
      </div>
      <div
        className="testimonial-carousel"
        role="region"
        aria-label="Testimoni pengguna"
        aria-roledescription="carousel"
        data-paused={paused}
        tabIndex={0}
      >
        <div className="testimonial-track">
          {[0, 1].map((copy) => (
            <div
              className="testimonial-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {titles.map((title, i) => (
                <article key={title} className="feature-card testimonial-slide">
                  <Quote className="size-6 text-primary/40" aria-hidden="true" />
                  <h3 className="mt-5 text-sm font-semibold">{title}</h3>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    Tempat untuk cerita pembeli AsonE. Belum ada testimoni pelanggan yang
                    ditambahkan.
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-primary">
                      0{i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-medium">Menunggu ulasan asli</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        Placeholder · bukan testimoni nyata
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
