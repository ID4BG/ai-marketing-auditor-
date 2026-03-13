"use client";

import { ScoreSection } from "./ScoreSection";
import { AnalysisCard } from "./AnalysisCard";
import { CompetitiveGaps } from "./CompetitiveGaps";
import { StrategicInsight } from "./StrategicInsight";
import { CompetitorChart } from "./CompetitorChart";

type Props = {
  website: string;
  competitor1?: string;
  competitor2?: string;
  score: number;
  breakdown: any[];
  sections: any[];
  gaps: string[];
  insight: string;
};

export function ReportLayout({
  website,
  competitor1,
  competitor2,
  score,
  breakdown,
  sections,
  gaps,
  insight,
}: Props) {

  const domain = website
    ?.replace(/^https?:\/\//, "")
    ?.replace(/^www\./, "")
    ?.split("/")[0];

  return (
    <>
      <div className="bg-white p-12 max-w-[820px] mx-auto">

        {/* COVER */}
        <div className="min-h-[420px] flex flex-col justify-center items-center text-center border-b pb-12 mb-16">

          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
            Marketing Strategy Audit
          </h1>

          <p className="mt-4 text-lg text-zinc-500">
            {domain}
          </p>

          <div className="mt-12 text-sm text-zinc-400">
            Prepared by
          </div>

          <div className="text-sm text-zinc-400">
            AI Marketing Diagnostic
          </div>

        </div>

        {/* SCORE */}
        <div className="border-b pb-6 mb-8">
          <h2 className="text-2xl font-semibold">
            Marketing Clarity Score
          </h2>
        </div>

        <div className="avoid-break mb-12">
          <ScoreSection score={score} breakdown={breakdown} />
        </div>

        {/* FORCE NEW PAGE AFTER SCORE */}
        <div className="page-break"></div>

        {/* ANALYSIS */}
        <div>

          {sections?.map((section: any, index: number) => {

            const severity =
              section.status === "weak"
                ? "critical"
                : section.status === "neutral"
                ? "opportunity"
                : "neutral";

            return (
              <div key={index} className="avoid-break mb-10">

                <AnalysisCard
                  label={section.category || "Analysis"}
                  title={section.problem || "Strategic insight"}
                  problem={section.problem}
                  why_it_matters={section.why_it_matters}
                  fix={section.fix}
                  severity={severity}
                />

              </div>
            );
          })}

        </div>

        {/* STRATEGIC INSIGHT */}
        <div className="avoid-break mb-16">
          <StrategicInsight insight={insight} />
        </div>

        {/* GAPS */}
        <div className="avoid-break mb-16">
          <CompetitiveGaps gaps={gaps} />
        </div>

        {/* CHART */}
        <div className="page-break">

          <CompetitorChart
            website={website}
            competitor1={competitor1}
            competitor2={competitor2}
            insight={insight}
          />

        </div>

      </div>

      <style jsx global>{`

        .avoid-break {
          display: block;
          break-inside: avoid;
          page-break-inside: avoid;
        }

        .page-break {
          page-break-before: always;
          break-before: page;
        }

      `}</style>
    </>
  );
}