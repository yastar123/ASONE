import { useState, useId, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  ReferenceArea,
  LabelList,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Droplets,
  ShieldAlert,
  Activity,
  Filter,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import type {
  BarWaterChart,
  DonutWaterChart,
  RadarWaterChart,
  Tone,
  WaterChart,
} from "@/lib/water-data";

const fmt = (v: unknown) => String(v ?? "").replace(".", ",");

// Helper to determine chart thematic meta
function getChartMeta(title: string, kind: string) {
  const lower = title.toLowerCase();
  if (lower.includes("ph")) {
    return {
      category: "KUALITAS & KEASAMAN",
      icon: Droplets,
      accent: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      badge: "Rentang 6,5 – 8,5",
      quickTakeaway:
        "pH 6,5–8,5 adalah rentang standar air minum sehat di Indonesia sesuai Permenkes.",
    };
  }
  if (lower.includes("logam") || lower.includes("cemaran")) {
    return {
      category: "BATAS KESELAMATAN LOGAM",
      icon: ShieldAlert,
      accent: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
      badge: "Permenkes No. 2/2023",
      quickTakeaway:
        "Batas logam berat seperti timbal & arsenik sangat ketat karena bahaya akumulasi jangka panjang.",
    };
  }
  if (lower.includes("besi")) {
    return {
      category: "KUALITAS AIR SUMUR",
      icon: Layers,
      accent: "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20",
      badge: "Batas Max 1 mg/L",
      quickTakeaway:
        "Kadar besi > 1 mg/L menimbulkan bau logam, rasa tidak enak, dan bercak kuning karat.",
    };
  }
  if (
    lower.includes("efektivitas") ||
    lower.includes("kemampuan") ||
    lower.includes("metode") ||
    lower.includes("membandingkan")
  ) {
    return {
      category: "TEKNOLOGI FILTRASI",
      icon: Filter,
      accent: "text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20",
      badge: "Uji Komparasi",
      quickTakeaway:
        "Merebus efektif membunuh bakteri, namun memerlukan filter khusus untuk memurnikan logam terlarut.",
    };
  }
  if (lower.includes("tubuh") || lower.includes("asupan") || lower.includes("kebutuhan")) {
    return {
      category: "HIDRASI & BIOLOGI",
      icon: Activity,
      accent: "text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/20",
      badge: "Standar EFSA / WHO",
      quickTakeaway:
        "Mayoritas tubuh tersusun dari air; hidrasi harian yang bersih mendukung seluruh fungsi organ.",
    };
  }
  return {
    category: "DATA AIR",
    icon: Sparkles,
    accent: "text-primary bg-primary/10 border-primary/20",
    badge: "Edukasi Ilmiah",
    quickTakeaway: "Data acuan standar kualitas dan konsumsi air minum keluarga.",
  };
}

// Custom Tooltip for Bar Charts
function CustomBarTooltip({
  active,
  payload,
  unit,
  isPh,
}: {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number; unit?: string; tone?: Tone } }>;
  unit: string;
  isPh: boolean;
}) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;

  const value = item.value;
  let statusBadge = null;

  if (isPh) {
    if (value >= 6.5 && value <= 8.5) {
      statusBadge = {
        label: "Rentang Ideal Air Minum",
        className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
      };
    } else if (value < 6.5) {
      statusBadge = {
        label: "Cenderung Asam (< 6,5)",
        className: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
      };
    } else {
      statusBadge = {
        label: "Alkali / Basa (> 8,5)",
        className: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
      };
    }
  } else if (item.tone) {
    if (item.tone === "safe") {
      statusBadge = {
        label: "Kondisi Aman / Efektif",
        className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
      };
    } else if (item.tone === "warn") {
      statusBadge = {
        label: "Ambang Batas Maksimal",
        className: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
      };
    } else if (item.tone === "danger") {
      statusBadge = {
        label: "Perlu Penanganan / Risiko",
        className: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
      };
    }
  }

  return (
    <div className="rounded-xl border border-border/80 bg-card/95 p-3.5 shadow-xl backdrop-blur-md transition-all min-w-[190px]">
      <p className="text-xs font-medium text-muted-foreground">{item.name}</p>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-xl font-extrabold tracking-tight text-foreground">{fmt(value)}</span>
        <span className="text-xs font-semibold text-primary">{unit}</span>
      </div>
      {statusBadge && (
        <div
          className={`mt-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${statusBadge.className}`}
        >
          <span className="size-1.5 rounded-full bg-current animate-pulse" />
          {statusBadge.label}
        </div>
      )}
    </div>
  );
}

function BarBody({ chart }: { chart: BarWaterChart }) {
  const isPh = chart.kind === "ph";
  const uniqueId = useId().replace(/:/g, "");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chart.data}
        layout="vertical"
        margin={{ top: 8, right: 52, bottom: 8, left: 12 }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <defs>
          <linearGradient id={`grad-safe-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#059669" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
          </linearGradient>
          <linearGradient id={`grad-warn-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d97706" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={1} />
          </linearGradient>
          <linearGradient id={`grad-danger-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e11d48" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity={1} />
          </linearGradient>
          <linearGradient id={`grad-primary-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0284c7" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity={1} />
          </linearGradient>
          <linearGradient id={`grad-ph-alkaline-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#818cf8" stopOpacity={1} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          stroke="var(--border)"
          strokeOpacity={0.6}
        />

        {isPh && (
          <ReferenceArea
            x1={6.5}
            x2={8.5}
            fill="#10b981"
            fillOpacity={0.07}
            stroke="#10b981"
            strokeOpacity={0.25}
            strokeDasharray="3 3"
          />
        )}

        <XAxis
          type="number"
          scale={chart.scale ?? "linear"}
          domain={[0, "auto"]}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickFormatter={fmt}
          axisLine={{ stroke: "var(--border)", strokeOpacity: 0.8 }}
          tickLine={{ stroke: "var(--border)" }}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={140}
          tick={{ fontSize: 11, fill: "var(--foreground)", fontWeight: 500 }}
          axisLine={{ stroke: "var(--border)", strokeOpacity: 0.8 }}
          tickLine={false}
        />

        <Tooltip
          cursor={{ fill: "var(--secondary)", opacity: 0.4 }}
          content={<CustomBarTooltip unit={chart.unit} isPh={isPh} />}
        />

        {chart.referenceX?.map((r) => (
          <ReferenceLine
            key={r.label}
            x={r.value}
            stroke={isPh ? "#10b981" : "var(--muted-foreground)"}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: isPh ? `Rentang ${r.label}` : r.label,
              fontSize: 10,
              fill: isPh ? "#059669" : "var(--muted-foreground)",
              position: "top",
              fontWeight: 600,
            }}
          />
        ))}

        <Bar
          dataKey="value"
          radius={[0, 8, 8, 0]}
          maxBarSize={24}
          isAnimationActive={true}
          animationDuration={800}
        >
          {chart.data.map((d, index) => {
            const isHovered = hoveredIdx === index;
            let fillUrl = `url(#grad-primary-${uniqueId})`;

            if (isPh) {
              if (d.value >= 6.5 && d.value <= 8.5) {
                fillUrl = `url(#grad-safe-${uniqueId})`;
              } else if (d.value > 8.5) {
                fillUrl = `url(#grad-ph-alkaline-${uniqueId})`;
              } else {
                fillUrl = `url(#grad-warn-${uniqueId})`;
              }
            } else if (d.tone === "safe") {
              fillUrl = `url(#grad-safe-${uniqueId})`;
            } else if (d.tone === "warn") {
              fillUrl = `url(#grad-warn-${uniqueId})`;
            } else if (d.tone === "danger") {
              fillUrl = `url(#grad-danger-${uniqueId})`;
            }

            return (
              <Cell
                key={d.name}
                fill={fillUrl}
                fillOpacity={hoveredIdx !== null && !isHovered ? 0.45 : 1}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(index)}
              />
            );
          })}

          <LabelList
            dataKey="value"
            content={(props) => {
              const {
                x = 0,
                y = 0,
                width = 0,
                height = 0,
                value,
              } = props as {
                x?: number;
                y?: number;
                width?: number;
                height?: number;
                value?: number;
              };
              return (
                <text
                  x={Number(x) + Number(width) + 8}
                  y={Number(y) + Number(height) / 2}
                  dominantBaseline="middle"
                  style={{
                    fontSize: 11,
                    fill: "var(--foreground)",
                    fontWeight: 700,
                  }}
                >
                  {fmt(value)}
                </text>
              );
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function DonutBody({ chart }: { chart: DonutWaterChart }) {
  const uniqueId = useId().replace(/:/g, "");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const colors = [
    { start: "#0284c7", end: "#0ea5e9" }, // Sky Blue
    { start: "#0d9488", end: "#14b8a6" }, // Teal
    { start: "#6366f1", end: "#818cf8" }, // Indigo
  ];

  const activeItem = hoveredIndex !== null ? chart.data[hoveredIndex] : null;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="relative h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart onMouseLeave={() => setHoveredIndex(null)}>
            <defs>
              {colors.map((c, i) => (
                <linearGradient
                  key={i}
                  id={`donut-grad-${uniqueId}-${i}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor={c.start} />
                  <stop offset="100%" stopColor={c.end} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={chart.data}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="88%"
              paddingAngle={3}
              stroke="var(--card)"
              strokeWidth={3}
              isAnimationActive={true}
              animationDuration={800}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
            >
              {chart.data.map((d, i) => (
                <Cell
                  key={d.name}
                  fill={`url(#donut-grad-${uniqueId}-${i % colors.length})`}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    filter: hoveredIndex === i ? "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" : "none",
                    transform: hoveredIndex === i ? "scale(1.03)" : "scale(1)",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0];
                if (!d) return null;
                return (
                  <div className="rounded-xl border border-border/80 bg-card/95 p-3 shadow-xl backdrop-blur-md">
                    <p className="text-xs font-semibold text-foreground">{d.name}</p>
                    <p className="mt-0.5 text-base font-extrabold text-primary">
                      {fmt(d.value)}
                      {chart.unit}
                    </p>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Dynamic Center Label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black tracking-tight text-primary font-display sm:text-3xl">
            {activeItem ? `${fmt(activeItem.value)}${chart.unit}` : chart.centerLabel}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
            {activeItem ? activeItem.name : "Proporsi Total"}
          </span>
        </div>
      </div>

      {/* Interactive Segment Cards */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        {chart.data.map((d, i) => {
          const isSelected = hoveredIndex === i;
          return (
            <div
              key={d.name}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`rounded-xl border p-2.5 transition-all cursor-pointer ${
                isSelected
                  ? "border-primary/50 bg-primary/5 shadow-xs"
                  : "border-border/60 bg-muted/20 hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-foreground">
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{ background: colors[i % colors.length]?.start }}
                  />
                  {d.name}
                </span>
                <span className="font-extrabold text-foreground">
                  {fmt(d.value)}
                  {chart.unit}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${d.value}%`,
                    background: colors[i % colors.length]?.start,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RadarBody({ chart }: { chart: RadarWaterChart }) {
  const [activeSeries, setActiveSeries] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    chart.series.forEach((s) => {
      init[s.name] = true;
    });
    return init;
  });

  const seriesStyle = [
    {
      name: "Merebus",
      stroke: "#f59e0b",
      fill: "#f59e0b",
      badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
    },
    {
      name: "Karbon aktif",
      stroke: "#0d9488",
      fill: "#0d9488",
      badgeClass: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30",
    },
    {
      name: "Reverse Osmosis",
      stroke: "#0284c7",
      fill: "#0284c7",
      badgeClass: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
    },
  ];

  const rows = useMemo(() => {
    return chart.axes.map((axis, i) => {
      const row: Record<string, string | number> = { axis };
      chart.series.forEach((s) => {
        row[s.name] = s.values[i] ?? 0;
      });
      return row;
    });
  }, [chart]);

  const toggleSeries = (name: string) => {
    setActiveSeries((prev) => {
      const activeCount = Object.values(prev).filter(Boolean).length;
      if (prev[name] && activeCount <= 1) {
        // Keep at least one active
        return prev;
      }
      return { ...prev, [name]: !prev[name] };
    });
  };

  const getScoreDescription = (val: number) => {
    if (val >= 3) return "⭐⭐⭐ Sangat Efektif (3/3)";
    if (val === 2) return "⭐⭐ Cukup Efektif (2/3)";
    if (val === 1) return "⭐ Efektivitas Terbatas (1/3)";
    return "✕ Tidak Mengatasi (0/3)";
  };

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Interactive Series Toggle Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-1">
        {chart.series.map((s, i) => {
          const isEnabled = activeSeries[s.name] ?? true;
          const conf = seriesStyle[i % seriesStyle.length];
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => toggleSeries(s.name)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                isEnabled
                  ? `${conf?.badgeClass} shadow-xs font-bold ring-1 ring-primary/20`
                  : "border-border/60 bg-muted/40 text-muted-foreground opacity-50 hover:opacity-80"
              }`}
              title={`Klik untuk menampilkan / menyembunyikan seri ${s.name}`}
            >
              <span
                className="size-2 rounded-full shrink-0"
                style={{ background: isEnabled ? conf?.stroke : "var(--muted-foreground)" }}
              />
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="relative h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={rows} outerRadius="72%">
            <PolarGrid stroke="var(--border)" strokeOpacity={0.8} />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fontSize: 11, fill: "var(--foreground)", fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, chart.max]}
              tickCount={chart.max + 1}
              tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
              axisLine={false}
            />

            {chart.series.map((s, i) => {
              const conf = seriesStyle[i % seriesStyle.length];
              const isEnabled = activeSeries[s.name] ?? true;
              if (!isEnabled) return null;

              return (
                <Radar
                  key={s.name}
                  name={s.name}
                  dataKey={s.name}
                  stroke={conf?.stroke}
                  fill={conf?.fill}
                  fillOpacity={0.22}
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 1.5, fill: "var(--card)", stroke: conf?.stroke }}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              );
            })}

            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                return (
                  <div className="rounded-xl border border-border/80 bg-card/95 p-3.5 shadow-xl backdrop-blur-md min-w-[210px]">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-primary border-b border-border/60 pb-1.5 mb-2">
                      Fokus: {label}
                    </p>
                    <div className="space-y-1.5">
                      {payload.map((p) => {
                        const val = Number(p.value ?? 0);
                        return (
                          <div key={p.name} className="flex flex-col text-xs">
                            <div className="flex items-center justify-between font-bold text-foreground">
                              <span className="flex items-center gap-1.5">
                                <span
                                  className="size-2 rounded-full"
                                  style={{ background: p.color }}
                                />
                                {p.name}:
                              </span>
                              <span>
                                {val} / {chart.max}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground ml-3.5">
                              {getScoreDescription(val)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-center text-[11px] text-muted-foreground pt-1">
        *Klik label metode di atas untuk membandingkan secara spesifik
      </p>
    </div>
  );
}

export function WaterChartCard({ chart }: { chart: WaterChart }) {
  const meta = getChartMeta(chart.title, chart.kind);
  const IconComponent = meta.icon;

  const isBarOrPh = chart.kind === "bar" || chart.kind === "ph";
  const height = isBarOrPh ? "h-76 sm:h-80" : "h-80 sm:h-84";

  return (
    <figure className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-card via-card to-card/95 p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      {/* Subtle Top Ambient Gradient Line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/30 via-primary/70 to-primary/30 opacity-60 transition-opacity group-hover:opacity-100" />

      {/* Header with Categorization & Badge */}
      <figcaption className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-xl border ${meta.accent} transition-transform group-hover:scale-105`}
            >
              <IconComponent className="size-4" aria-hidden="true" />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
              {meta.category}
            </span>
          </div>

          <span className="rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/90">
            {meta.badge}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {chart.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{chart.description}</p>
        </div>
      </figcaption>

      {/* Main Chart Body */}
      <div className={`mt-5 w-full ${height}`} role="img" aria-label={chart.title}>
        {chart.kind === "donut" ? (
          <DonutBody chart={chart} />
        ) : chart.kind === "radar" ? (
          <RadarBody chart={chart} />
        ) : (
          <BarBody chart={chart} />
        )}
      </div>

      {/* Bottom Metadata & Educational Callout */}
      <div className="mt-5 space-y-2.5 border-t border-border/60 pt-3.5">
        {/* Legends for Bar Charts with tones */}
        {isBarOrPh && chart.data.some((d) => d.tone) && (
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-xs font-semibold text-foreground">
            <span className="text-[11px] font-medium text-muted-foreground mr-1">Status:</span>
            {(["safe", "warn", "danger"] as const)
              .filter((t) => (chart as BarWaterChart).data.some((d) => d.tone === t))
              .map((t) => {
                const colorMap = {
                  safe: "bg-emerald-500",
                  warn: "bg-amber-500",
                  danger: "bg-rose-500",
                };
                return (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className={`size-2 rounded-full shrink-0 ${colorMap[t]}`} />
                    {(chart as BarWaterChart).legend?.[t] ??
                      (t === "safe" ? "Aman" : t === "warn" ? "Batas / waspada" : "Berisiko")}
                  </span>
                );
              })}
          </div>
        )}

        {/* Quick Insight Accordion Pill */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-2.5 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-foreground/90 font-medium">
                <strong className="text-foreground font-semibold">Intisari: </strong>
                {meta.quickTakeaway}
              </p>
            </div>
          </div>
        </div>

        {/* Source citation */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Info className="size-3 shrink-0" aria-hidden="true" />
            {chart.source}
          </span>
        </div>
      </div>
    </figure>
  );
}
