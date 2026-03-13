"use client";

import { useRef, useState } from "react";
import { usePDF } from "react-to-pdf";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CTASection } from "./components/CTASection";
import { ReportLayout } from "./components/ReportLayout";

import { runDiagnostic } from "../lib/api";

export default function Page() {

  const [website, setWebsite] = useState("");
  const [competitor1, setCompetitor1] = useState("");
  const [competitor2, setCompetitor2] = useState("");

  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const [language, setLanguage] = useState("en");

  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reportRef = useRef<HTMLDivElement | null>(null);

  const domain = website
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];

  const { toPDF, targetRef } = usePDF({
    filename: `${domain}-marketing-audit-report.pdf`,
  });

  function downloadReport() {
    toPDF();
  }

  async function runAudit() {

    setError("");

    if (!website) {
      setError("Website is required");
      return;
    }

    if (!position) {
      setError("Please enter your position");
      return;
    }

    if (!linkedin && !email) {
      setError("Please provide LinkedIn or Email");
      return;
    }

    setLoading(true);

    try {

      const analysis = await runDiagnostic({
        website,
        competitors: [competitor1, competitor2].filter(Boolean),
        language,
        linkedin,
        email,
        position
      });

      setResult(analysis);

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const scores = result?.scores ?? {};
  const score = result?.score ?? 0;

  const breakdownArray = Object.entries(scores).map(([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value: Number(value) || 0
  }));

  const gaps = result?.competitive_gaps ?? [];
  const insight = result?.strategic_insight ?? "";

  const shareUrl =
    "https://www.linkedin.com/sharing/share-offsite/?url=https://yourtool.com";

  return (
    <>
      <div className="min-h-screen bg-zinc-50 py-10">
        <div className="max-w-6xl mx-auto px-6 space-y-10">

          {/* HEADER */}
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              AI Marketing Clarity Diagnostic
            </h1>

            <p className="text-base text-zinc-500">
              Strategic marketing analysis for your website
            </p>
          </div>

          {/* INPUT PANEL */}
          <div className="max-w-xl space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">

            <Input
              placeholder="Website URL *"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            <Input
              placeholder="Your Position (Founder, CEO, Marketing Lead) *"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />

            <Input
              placeholder="LinkedIn profile (or email)"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />

            <Input
              placeholder="Email (optional if LinkedIn provided)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Competitor Website 1"
              value={competitor1}
              onChange={(e) => setCompetitor1(e.target.value)}
            />

            <Input
              placeholder="Competitor Website 2"
              value={competitor2}
              onChange={(e) => setCompetitor2(e.target.value)}
            />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-zinc-300 rounded-md p-2 w-full text-sm"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="es">Español</option>
              <option value="hy">Հայերեն</option>
            </select>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-5 rounded-md"
              onClick={runAudit}
            >
              Run Diagnostic
            </Button>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {loading && (
              <p className="text-sm text-zinc-500 animate-pulse">
                Running marketing diagnostic...
              </p>
            )}

          </div>

          {/* REPORT */}
          {result && (
            <div className="space-y-8">

              {/* DOWNLOAD BUTTON */}
              <div className="flex justify-start">
                <Button
                  disabled={loading}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white h-11 px-6 rounded-md"
                  onClick={downloadReport}
                >
                  Download Strategic Report (PDF)
                </Button>
              </div>

              {/* CLEAN REPORT LAYOUT */}
              <div ref={targetRef}>
                <ReportLayout
                  website={website}
                  competitor1={competitor1}
                  competitor2={competitor2}
                  score={score}
                  breakdown={breakdownArray}
                  sections={result.sections}
                  gaps={gaps}
                  insight={insight}
                />
              </div>

              {/* CTA */}
              <CTASection
                onDownload={downloadReport}
                shareUrl={shareUrl}
              />

            </div>
          )}

          <div className="text-center text-sm text-zinc-500 pt-12">
            Built by <span className="font-medium text-zinc-700">Arnela</span> for founders — with love.
          </div>

        </div>
      </div>

      <style jsx global>{`
        @media print {

          body {
            background: white !important;
          }

          .max-w-xl {
            display: none !important;
          }

          button {
            display: none !important;
          }

        }
      `}</style>

    </>
  );
}