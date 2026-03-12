import { Progress } from "@/components/ui/progress";

export function ScoreCard({
  score,
  positioning,
  messaging,
  icp,
  funnel,
}: any) {
  return (
    <div className="space-y-8 rounded-xl border border-border bg-white p-8">
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Marketing Clarity Score
        </div>

        <div className="mt-2 text-5xl font-semibold text-blue-600">
          {score} <span className="text-xl text-muted-foreground">/100</span>
        </div>
      </div>

      <ScoreBar label="Positioning" value={positioning} />
      <ScoreBar label="Messaging" value={messaging} />
      <ScoreBar label="ICP Clarity" value={icp} />
      <ScoreBar label="Conversion Funnel" value={funnel} />
    </div>
  );
}

function ScoreBar({ label, value }: any) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>

      <Progress value={value} />
    </div>
  );
}

