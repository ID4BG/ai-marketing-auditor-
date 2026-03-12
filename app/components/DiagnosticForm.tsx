 "use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  onRun: (data: {
    website: string;
    competitors: string[];
  }) => void;
}

export default function DiagnosticForm({ onRun }: Props) {
  const [website, setWebsite] = useState("");
  const [competitor1, setCompetitor1] = useState("");
  const [competitor2, setCompetitor2] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onRun({
      website,
      competitors: [competitor1, competitor2].filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl">
      <Input
        placeholder="Website URL"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="h-11 rounded-md border-slate-200"
      />

      <Input
        placeholder="Competitor Website 1"
        value={competitor1}
        onChange={(e) => setCompetitor1(e.target.value)}
        className="h-11 rounded-md border-slate-200"
      />

      <Input
        placeholder="Competitor Website 2"
        value={competitor2}
        onChange={(e) => setCompetitor2(e.target.value)}
        className="h-11 rounded-md border-slate-200"
      />

      <Button
        type="submit"
        className="h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-md mt-2"
      >
        Run Diagnostic
      </Button>
    </form>
  );
}