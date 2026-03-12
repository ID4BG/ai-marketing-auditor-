import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AuditForm({
  website,
  competitor1,
  competitor2,
  setWebsite,
  setCompetitor1,
  setCompetitor2,
  runAudit,
}: any) {
  return (
    <div className="flex flex-col gap-3 max-w-xl">
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
        className="h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-md mt-2"
        onClick={runAudit}
      >
        Run Diagnostic
      </Button>
    </div>
  );
}

