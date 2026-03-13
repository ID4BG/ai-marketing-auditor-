import type { FC } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

export type CompetitorPoint = {
  name: string;
  x: number | string;
  y: number | string;
  color?: string;
};

type CompetitorChartProps = {
  data?: CompetitorPoint[] | null;
  website?: string;
  competitor1?: string;
  competitor2?: string;
  insight?: string;
};

const fallbackCompetitorData: CompetitorPoint[] = [
  { name: "Your Company", x: 50, y: 55, color: "#2563eb" },
  { name: "Competitor A", x: 65, y: 75, color: "#f59e0b" },
  { name: "Competitor B", x: 45, y: 80, color: "#10b981" },
];

function getDomain(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const hostname = new URL(trimmed).hostname || trimmed;
    return hostname.replace(/^www\./, "");
  } catch {
    return trimmed;
  }
}

function coerceFiniteNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

export const CompetitorChart: FC<CompetitorChartProps> = ({
  data,
  website,
  competitor1,
  competitor2,
  insight,
}) => {
  let pointsSource: CompetitorPoint[] | null = null;

  if (Array.isArray(data) && data.length > 0) {
    pointsSource = data;
  } else {
    const websiteDomain = getDomain(website);
    const competitor1Domain = getDomain(competitor1);
    const competitor2Domain = getDomain(competitor2);

    const derived: CompetitorPoint[] = [];

    if (websiteDomain) {
      derived.push({ name: websiteDomain, x: 50, y: 55, color: "#2563eb" });
    }
    if (competitor1Domain) {
      derived.push({ name: competitor1Domain, x: 65, y: 75, color: "#f59e0b" });
    }
    if (competitor2Domain) {
      derived.push({ name: competitor2Domain, x: 45, y: 80, color: "#10b981" });
    }

    pointsSource =
      derived.length > 0 ? derived : fallbackCompetitorData;
  }

  const pointsRaw = pointsSource;

  const points = pointsRaw.map((p, idx) => ({
    name: p.name,
    x: coerceFiniteNumber(p.x),
    y: coerceFiniteNumber(p.y),
    color: p.color ?? (idx === 0 ? "#2563eb" : "#94a3b8"),
  }));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm space-y-6">

      {/* HEADER */}
      <div>
        <div className="text-xs uppercase tracking-wide text-zinc-400">
          Market Analysis
        </div>

        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
          Competitive Positioning Map
        </h3>
      </div>

      {/* ANALYZED COMPANIES */}
      <div className="flex flex-wrap gap-4 text-sm text-zinc-600 mb-4">
        <span className="font-medium text-blue-600">
          {getDomain(website)}
        </span>
        <span>{getDomain(competitor1)}</span>
        <span>{getDomain(competitor2)}</span>
      </div>

      {/* CHART */}
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#f1f5f9"
            />

            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              stroke="#e4e4e7"
              label={{
                value: "Market Sophistication →",
                position: "bottom",
                offset: 10,
                style: { fontSize: 13, fill: "#71717a" },
              }}
            />

            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              stroke="#e4e4e7"
              label={{
                value: "Brand Authority →",
                angle: -90,
                position: "left",
                offset: 10,
                style: { fontSize: 13, fill: "#71717a" },
              }}
            />

            <Scatter data={points} shape="circle">

              {points.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke={index === 0 ? "#1e40af" : "none"}
                  strokeWidth={index === 0 ? 2 : 0}
                />
              ))}

            </Scatter>

          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="flex gap-6 mt-4 text-sm text-zinc-600 flex-wrap">
        {points.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="truncate max-w-[180px]">
              {getDomain(p.name)}
            </span>
          </div>
        ))}
      </div>

      {/* INSIGHT */}
      {insight && (
  <div className="pt-4 border-t border-zinc-100">

    <div className="text-xs uppercase tracking-wide text-zinc-400 mb-2">
      Strategic Insight
    </div>

    <p className="text-sm leading-relaxed text-zinc-600">
      {insight}
    </p>

  </div>
)}

    </div>
  );
};