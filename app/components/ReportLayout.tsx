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

  const firstTwo = sections?.slice(0, 2);
  const secondTwo = sections?.slice(2, 4);

  function renderCard(section: any, index: number) {

    const severity =
      section.status === "weak"
        ? "critical"
        : section.status === "neutral"
        ? "opportunity"
        : "neutral";

    return (
      <div key={index} className="mb-10">
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
  }

  return (
    <>
      <div className="bg-white max-w-[820px] mx-auto">

        {/* PAGE 1 */}
        <div className="pdf-page p-12">

          <div className="flex flex-col justify-center items-center text-center border-b pb-12 mb-16">

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

          <div className="border-b pb-6 mb-8">
            <h2 className="text-2xl font-semibold">
              Marketing Clarity Score
            </h2>
          </div>

          <ScoreSection score={score} breakdown={breakdown} />

        </div>

        <div className="page-break" />

        {/* PAGE 2 */}
        <div className="pdf-page p-12">

          {firstTwo?.map((section: any, i: number) =>
            renderCard(section, i)
          )}

        </div>

        <div className="page-break" />

        {/* PAGE 3 */}
        <div className="pdf-page p-12">

          {secondTwo?.map((section: any, i: number) =>
            renderCard(section, i)
          )}

        </div>

        <div className="page-break" />

        {/* PAGE 4 */}
        <div className="pdf-page p-12">

          <StrategicInsight insight={insight} />

          <div className="mt-16">
            <CompetitiveGaps gaps={gaps} />
          </div>

        </div>

        <div className="page-break" />

        {/* PAGE 5 */}
        <div className="pdf-page p-12">

          <CompetitorChart
            website={website}
            competitor1={competitor1}
            competitor2={competitor2}
            insight={insight}
          />

        </div>

      </div>

      <style jsx global>{`

        .pdf-page {
          width: 100%;
          display: block;
        }

        .page-break {
          page-break-before: always;
          break-before: page;
        }

      `}</style>
    </>
  );
}