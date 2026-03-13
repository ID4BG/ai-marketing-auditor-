interface AnalysisCardProps {
  label: string
  title: string
  problem?: string
  why_it_matters?: string
  fix?: string
  content?: string
  severity?: "critical" | "opportunity" | "neutral"
}

function severityStyles(severity: NonNullable<AnalysisCardProps["severity"]>) {
  switch (severity) {
    case "critical":
      return {
        label: "Critical",
        className: "border-red-200 bg-red-50 text-red-700",
      }

    case "opportunity":
      return {
        label: "Opportunity",
        className: "border-amber-200 bg-amber-50 text-amber-700",
      }

    case "neutral":
    default:
      return {
        label: "Neutral",
        className: "border-zinc-200 bg-zinc-50 text-zinc-700",
      }
  }
}

export function AnalysisCard({
  label,
  title,
  problem,
  why_it_matters,
  fix,
  content,
  severity,
}: AnalysisCardProps) {

  const badge = severity ? severityStyles(severity) : null

  return (
    <div
      className={`rounded-xl border bg-white p-8 space-y-6 shadow-sm transition hover:shadow-md ${
        severity === "critical"
          ? "border-l-4 border-l-red-500"
          : severity === "opportunity"
          ? "border-l-4 border-l-amber-500"
          : "border-l-4 border-l-zinc-200"
      }`}
    >

      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">

        <div className="text-xs uppercase tracking-wide text-zinc-400">
          {label}
        </div>

        {badge && (
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-medium ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-zinc-900 leading-snug">
        {title}
      </h3>

      {/* DIVIDER */}
      <div className="h-px bg-zinc-100"></div>

      {/* STRUCTURED CONTENT */}

      {problem && (
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase text-zinc-500">
            Problem
          </div>
          <p className="text-[15px] leading-relaxed text-zinc-700">
            {problem}
          </p>
        </div>
      )}

      {why_it_matters && (
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase text-zinc-500">
            Why it matters
          </div>
          <p className="text-[15px] leading-relaxed text-zinc-700">
            {why_it_matters}
          </p>
        </div>
      )}

      {fix && (
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase text-zinc-500">
            Strategic Fix
          </div>
          <p className="text-[15px] leading-relaxed text-zinc-700">
            {fix}
          </p>
        </div>
      )}

      {/* FALLBACK FOR OLD CONTENT */}
      {!problem && content && (
        <p className="text-[15px] leading-relaxed text-zinc-600">
          {content}
        </p>
      )}

    </div>
  )
}