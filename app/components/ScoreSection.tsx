import { Progress } from "@/components/ui/progress";

type ScoreBreakdown = {
  label: string;
  value: number;
};

type Props = {
  score: number;
  breakdown: ScoreBreakdown[];
};

export function ScoreSection({ score, breakdown }: Props) {

  function scoreStatus(score: number) {
    if (score >= 80) return "Strong marketing clarity";
    if (score >= 60) return "Moderate clarity with improvement opportunities";
    return "Critical marketing clarity issues";
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-10 shadow-sm">

      {/* SCORE HEADER */}
      <div className="flex items-end justify-between">

        <div>

          <p className="text-xs uppercase tracking-wide text-zinc-400">
            Marketing Clarity Score
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-blue-600">
            {score} <span className="text-base text-zinc-400">/100</span>
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            {scoreStatus(score)}
          </p>

        </div>

        <div className="text-sm text-zinc-500">
          Strategic Diagnostic
        </div>

      </div>

      {/* BREAKDOWN */}
      <div className="grid gap-6 md:grid-cols-2">

        {breakdown.map((item) => (

          <div key={item.label} className="space-y-3">

            <div className="flex justify-between text-sm font-medium">

              <span className="text-zinc-700">
                {item.label}
              </span>

              <span className="text-zinc-500">
                {item.value}
              </span>

            </div>

            <Progress value={item.value} className="h-2" />

          </div>

        ))}

      </div>

    </div>
  );
}