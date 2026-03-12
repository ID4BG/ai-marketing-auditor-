type ScoreBadgeProps = {
  score: number;
};

export function ScoreBadge({ score }: ScoreBadgeProps) {
  return (
    <div className="rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-textSecondary">
        Marketing Clarity Score
      </div>

      <div className="mt-3 flex items-end gap-2">
        <div className="text-5xl font-semibold leading-none text-primary">
          {score}
        </div>
        <div className="pb-1 text-lg text-textSecondary">/ 100</div>
      </div>
    </div>
  );
}

