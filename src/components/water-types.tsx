import { useState } from 'react';
import { Droplets, FlaskConical, Mountain, Package, CloudRain, Gem, Flame, Building2, Leaf, CircleCheck, TriangleAlert, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { readinessLabel, waterTypeGroups, waterTypes, type WaterTypeGroup } from '@/lib/water-types';

const icons: Record<string, LucideIcon> = {
  mineral: Mountain, demineral: FlaskConical, 'isi-ulang': Package, alkali: Leaf, pdam: Building2, sumur: Droplets, hujan: CloudRain, sadah: Gem, matang: Flame,
};

export function WaterTypesExplorer() {
  const [group, setGroup] = useState<WaterTypeGroup | 'Semua'>('Semua');
  const list = group === 'Semua' ? waterTypes : waterTypes.filter((w) => w.group === group);
  return (
    <div>
      <div role="group" aria-label="Filter jenis air" className="mt-8 flex flex-wrap gap-2">
        {(['Semua', ...waterTypeGroups] as const).map((g) => (
          <Button key={g} size="sm" variant={group === g ? 'default' : 'outline'} aria-pressed={group === g} onClick={() => setGroup(g)}>{g}</Button>
        ))}
      </div>
      <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => {
          const Icon = icons[w.id] ?? Droplets;
          return (
            <li key={w.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="icon-tile"><Icon className="size-5" aria-hidden="true" /></span>
                <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold text-primary">{w.group}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{w.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{w.summary}</p>
              <dl className="mt-4 divide-y divide-border border-y border-border text-xs">
                <div className="flex justify-between gap-4 py-2.5"><dt className="text-muted-foreground">Asal</dt><dd className="text-right font-medium text-foreground">{w.source}</dd></div>
                <div className="flex justify-between gap-4 py-2.5"><dt className="text-muted-foreground">Perkiraan pH</dt><dd className="text-right font-medium text-foreground">{w.ph}</dd></div>
                <div className="flex justify-between gap-4 py-2.5"><dt className="text-muted-foreground">Status</dt><dd className="flex items-center gap-1.5 text-right font-medium text-foreground"><CircleCheck className="size-3.5 shrink-0 text-primary" aria-hidden="true" />{readinessLabel[w.readiness]}</dd></div>
              </dl>
              <p className="mt-4 flex gap-2 text-xs leading-5 text-muted-foreground"><TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" /><span><strong className="text-foreground">Perhatikan:</strong> {w.watch}</span></p>
              <p className="mt-2 flex gap-2 text-xs leading-5 text-muted-foreground"><Lightbulb className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" /><span>{w.tip}</span></p>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-[11px] leading-5 text-muted-foreground">Ringkasan edukatif. Karakter tiap jenis air berbeda menurut sumber, merek, dan pengolahan. AsonE ditujukan untuk air yang sudah layak minum.</p>
    </div>
  );
}
