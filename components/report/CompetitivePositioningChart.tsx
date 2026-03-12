import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Point = {
  name: string;
  x: number;
  y: number;
  color?: string;
};

export type CompetitivePositioningPoint = Point;

const DEFAULT_DATA: Point[] = [
  { name: "Your Company", x: 50, y: 55, color: "#2563EB" },
  { name: "Competitor A", x: 65, y: 75, color: "#94A3B8" },
  { name: "Competitor B", x: 45, y: 80, color: "#94A3B8" },
  { name: "Competitor C", x: 75, y: 50, color: "#94A3B8" },
  { name: "Competitor D", x: 35, y: 40, color: "#94A3B8" },
];

type Props = {
  data?: Point[];
};

export function CompetitivePositioningChart({ data }: Props) {
  const chartData = (data && data.length > 0 ? data : DEFAULT_DATA).map(
    (point) => ({
      ...point,
      color:
        point.color ||
        (point.name === "Your Company" ? "#2563EB" : "#94A3B8"),
    })
  );

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-8">
      <div className="mb-2 text-xs uppercase tracking-wide text-zinc-400">
        Market Analysis
      </div>

      <h3 className="mb-6 text-lg font-semibold text-zinc-900">
        Competitive Positioning Map
      </h3>

      <div className="h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />

            <XAxis
              type="number"
              dataKey="x"
              name="Market Maturity"
              domain={[0, 100]}
              label={{
                value: "Market Maturity →",
                position: "bottom",
                offset: 10,
              }}
            />

            <YAxis
              type="number"
              dataKey="y"
              name="Brand Recognition"
              domain={[0, 100]}
              label={{
                value: "Brand Recognition ↑",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip cursor={{ strokeDasharray: "3 3" }} />

            <Scatter data={chartData}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        Your positioning places you in a crowded mid-market segment. Consider
        increasing brand recognition through thought leadership or targeting
        less mature market segments.
      </p>
    </div>
  );
}

