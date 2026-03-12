export function StrategicInsight({ insight }: { insight: string }) {
  if (!insight?.trim()) return null;

  return (
    <div className="rounded-xl border-2 border-blue-500 bg-blue-50 p-8">
      <div className="mb-2 text-xs font-medium uppercase text-blue-600">
        Key Recommendation
      </div>

      <h3 className="mb-4 text-xl font-semibold">Strategic Insight</h3>

      <p className="leading-relaxed text-muted-foreground">{insight}</p>
    </div>
  );
}

