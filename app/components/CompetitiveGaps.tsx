interface CompetitiveGapsProps {
  gaps: string[];
}

export function CompetitiveGaps({ gaps }: CompetitiveGapsProps) {
  if (!gaps || gaps.length === 0) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm space-y-6">

      {/* HEADER */}
      <div>
        <div className="text-xs uppercase tracking-wide text-zinc-400">
          Competitive Gaps
        </div>

        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
          Key weaknesses vs competitors
        </h3>
      </div>

      {/* GAPS LIST */}
      <div className="space-y-3">
        {gaps.map((gap, i) => (
          <div
            key={i}
            className="border-l-4 border-blue-500 pl-4 py-2"
          >
            <div className="text-xs font-medium text-zinc-400">
              {i + 1}
            </div>
            <div className="text-sm font-medium text-zinc-900">
              {gap}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}