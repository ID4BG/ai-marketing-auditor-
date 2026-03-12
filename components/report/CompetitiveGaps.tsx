export function CompetitiveGaps({ gaps }: { gaps: string[] }) {
  if (!gaps || gaps.length === 0) return null;

  return (
    <div className="rounded-xl border bg-white p-8">
      <div className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
        Competitive Gaps
      </div>

      <h3 className="mb-6 text-lg font-semibold">
        Key weaknesses vs competitors
      </h3>

      <ul className="space-y-3">
        {gaps.map((gap, i) => (
          <li key={i} className="flex gap-3 text-muted-foreground">
            <div className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
            {gap}
          </li>
        ))}
      </ul>
    </div>
  );
}

