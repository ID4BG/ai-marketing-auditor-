type StrategicInsightProps = {
  insight?: string;
};

export function StrategicInsight({ insight }: StrategicInsightProps) {
  const hasInsight = insight?.trim();
  const formattedInsight = hasInsight
    ? hasInsight.replace(/\. /g, ".\n\n")
    : "";

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-10 shadow-sm space-y-6 border-l-4 border-l-blue-500">

      {/* HEADER */}
      <div>
        <p className="text-xs uppercase tracking-wide text-blue-600 font-medium">
          Strategic Recommendation
        </p>

        <h3 className="mt-2 text-xl font-semibold text-zinc-900">
          Core Strategic Insight
        </h3>
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-blue-200"></div>

      {/* INSIGHT TEXT */}
      <p className="whitespace-pre-line text-[16px] leading-relaxed text-blue-900">
        {hasInsight
          ? formattedInsight
          : "No strategic insight was generated. Try running the diagnostic again with a clearer competitor set."}
      </p>

    </div>
  );
}