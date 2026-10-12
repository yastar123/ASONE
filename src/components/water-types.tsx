import { useState } from "react";
import {
  Droplets,
  FlaskConical,
  Mountain,
  Package,
  CloudRain,
  Gem,
  Flame,
  Building2,
  Leaf,
  CircleCheck,
  TriangleAlert,
  Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  readinessLabel,
  waterTypeGroups,
  waterTypes,
  type WaterTypeGroup,
} from "@/lib/water-types";

const icons: Record<string, LucideIcon> = {
  mineral: Mountain,
  demineral: FlaskConical,
  "isi-ulang": Package,
  alkali: Leaf,
  pdam: Building2,
  sumur: Droplets,
  hujan: CloudRain,
  sadah: Gem,
  matang: Flame,
};

export function WaterTypesExplorer() {
  const [group, setGroup] = useState<WaterTypeGroup | "Semua">("Semua");
  const list = group === "Semua" ? waterTypes : waterTypes.filter((w) => w.group === group);
  return (
    <div>
      <div role="group" aria-label="Filter jenis air" className="mt-8 flex flex-wrap gap-2">
        {(["Semua", ...waterTypeGroups] as const).map((g) => (
          <Button
            key={g}
            size="sm"
            variant={group === g ? "default" : "outline"}
            className={
              group === g
                ? "bg-primary font-bold text-primary-foreground shadow-xs"
                : "border-border/80 font-medium text-foreground hover:border-primary/40 hover:bg-primary/[0.03]"
            }
            aria-pressed={group === g}
            onClick={() => setGroup(g)}
          >
            {g}
          </Button>
        ))}
      </div>
      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => {
          const Icon = icons[w.id] ?? Droplets;
          const statusStyle =
            w.readiness === "ready"
              ? "bg-emerald-500/10 text-emerald-800 border-emerald-500/25"
              : w.readiness === "treat"
                ? "bg-amber-500/10 text-amber-800 border-amber-500/25"
                : "bg-primary/10 text-primary border-primary/25";

          return (
            <li
              key={w.id}
              className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="icon-tile group-hover:scale-105 transition-transform">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold text-primary">{w.group}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {w.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/80">{w.summary}</p>
                <dl className="mt-4 divide-y divide-border/60 border-y border-border/60 text-xs">
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted-foreground">Sumber Asal</dt>
                    <dd className="font-semibold text-foreground text-right">{w.source}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted-foreground">Perkiraan pH</dt>
                    <dd className="font-bold text-primary tabular-nums">{w.ph}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted-foreground">Status Kelayakan</dt>
                    <dd
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-bold ${statusStyle}`}
                    >
                      <CircleCheck className="size-3 shrink-0" aria-hidden="true" />
                      {readinessLabel[w.readiness]}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 space-y-2.5">
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3 text-xs leading-relaxed text-amber-950">
                  <strong className="font-bold text-amber-800">Perhatikan:</strong> {w.watch}
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-3 text-xs leading-relaxed text-foreground/90">
                  <strong className="font-bold text-primary">Tips:</strong> {w.tip}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-[11px] leading-5 text-muted-foreground">
        Ringkasan edukatif. Karakter tiap jenis air berbeda menurut sumber, merek, dan pengolahan.
        AsonE ditujukan untuk air yang sudah layak minum.
      </p>
    </div>
  );
}
