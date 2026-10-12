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
  LabelList,
  PieChart,
  Pie,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import type {
  BarWaterChart,
  DonutWaterChart,
  RadarWaterChart,
  Tone,
  WaterChart,
} from "@/lib/water-data";

const MUTED = "var(--muted-foreground)";
const PRIMARY = "var(--primary)";
const toneColor: Record<Tone, string> = {
  safe: "var(--tone-safe)",
  warn: "var(--tone-warn)",
  danger: "var(--tone-danger)",
  neutral: PRIMARY,
};
const seriesColors = ["var(--tone-warn)", "var(--primary)", "var(--water)"];
const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  fontSize: 12,
};
const fmt = (v: unknown) => String(v ?? "").replace(".", ",");

function BarBody({ chart }: { chart: BarWaterChart }) {
  const isPh = chart.kind === "ph";
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chart.data}
        layout="vertical"
        margin={{ top: 4, right: 44, bottom: 4, left: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
        <XAxis
          type="number"
          scale={chart.scale ?? "linear"}
          domain={[0, "auto"]}
          tick={{ fontSize: 11, fill: MUTED }}
          tickFormatter={fmt}
        />
        <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fill: MUTED }} />
        <Tooltip
          cursor={{ fill: "var(--secondary)" }}
          formatter={(value) => [`${fmt(value)} ${chart.unit}`, "Nilai"]}
          contentStyle={tooltipStyle}
        />
        {chart.referenceX?.map((r) => (
          <ReferenceLine
            key={r.label}
            x={r.value}
            stroke={MUTED}
            strokeDasharray="4 4"
            label={{ value: r.label, fontSize: 10, fill: MUTED }}
          />
        ))}
        <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={22}>
          {chart.data.map((d) => {
            const outOfRange = isPh && (d.value < 6.5 || d.value > 8.5);
            return (
              <Cell
                key={d.name}
                fill={toneColor[d.tone ?? "neutral"]}
                fillOpacity={outOfRange ? 0.4 : 1}
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
                  x={Number(x) + Number(width) + 6}
                  y={Number(y) + Number(height) / 2}
                  dominantBaseline="middle"
                  style={{ fontSize: 11, fill: "var(--foreground)", fontWeight: 600 }}
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
  const palette = ["var(--primary)", "var(--water)", "var(--chart-3)"];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chart.data}
          dataKey="value"
          nameKey="name"
          innerRadius="58%"
          outerRadius="85%"
          paddingAngle={2}
          stroke="var(--card)"
          strokeWidth={2}
        >
          {chart.data.map((d, i) => (
            <Cell key={d.name} fill={palette[i % palette.length] ?? PRIMARY} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${fmt(value)}${chart.unit}`, String(name)]}
          contentStyle={tooltipStyle}
        />
        <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <text
          x="50%"
          y="46%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 26,
            fontWeight: 700,
            fill: "var(--primary)",
            fontFamily: "var(--font-display)",
          }}
        >
          {chart.centerLabel}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}

function RadarBody({ chart }: { chart: RadarWaterChart }) {
  const rows = chart.axes.map((axis, i) => {
    const row: Record<string, string | number> = { axis };
    chart.series.forEach((s) => {
      row[s.name] = s.values[i] ?? 0;
    });
    return row;
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={rows} outerRadius="72%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: MUTED }} />
        <PolarRadiusAxis
          angle={90}
          domain={[0, chart.max]}
          tickCount={chart.max + 1}
          tick={{ fontSize: 9, fill: MUTED }}
          axisLine={false}
        />
        {chart.series.map((s, i) => (
          <Radar
            key={s.name}
            name={s.name}
            dataKey={s.name}
            stroke={seriesColors[i % seriesColors.length]}
            fill={seriesColors[i % seriesColors.length]}
            fillOpacity={0.18}
            strokeWidth={2}
          />
        ))}
        <Tooltip contentStyle={tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function WaterChartCard({ chart }: { chart: WaterChart }) {
  const height = chart.kind === "bar" || chart.kind === "ph" ? "h-72" : "h-80";
  return (
    <figure className="h-full rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <figcaption>
        <h3 className="text-lg font-bold text-foreground">{chart.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">{chart.description}</p>
      </figcaption>
      <div className={`mt-5 w-full ${height}`} role="img" aria-label={chart.title}>
        {chart.kind === "donut" ? (
          <DonutBody chart={chart} />
        ) : chart.kind === "radar" ? (
          <RadarBody chart={chart} />
        ) : (
          <BarBody chart={chart} />
        )}
      </div>
      {(chart.kind === "bar" || chart.kind === "ph") && chart.data.some((d) => d.tone) && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 rounded-xl border border-border/60 bg-muted/30 p-2.5 text-xs font-semibold text-foreground">
          {(["safe", "warn", "danger"] as const)
            .filter((t) => (chart as BarWaterChart).data.some((d) => d.tone === t))
            .map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full shrink-0"
                  style={{ background: toneColor[t] }}
                />
                {(chart as BarWaterChart).legend?.[t] ??
                  (t === "safe" ? "Aman" : t === "warn" ? "Batas / waspada" : "Berisiko")}
              </span>
            ))}
        </div>
      )}
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{chart.source}</p>
    </figure>
  );
}
