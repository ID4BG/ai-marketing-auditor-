import { Button } from "@/components/ui/button";

type ReportActionsProps = {
  score: number;
  onDownload?: () => void;
};

export function ReportActions({ score, onDownload }: ReportActionsProps) {
  const shareText = encodeURIComponent(
    `I just ran an AI Marketing Audit on my website.

Marketing Clarity Score: ${score}/100

Try the audit here:
https://yourtool.com`
  );

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://yourtool.com&summary=${shareText}`;

  return (
    <div className="flex gap-4">
      <Button type="button" onClick={onDownload}>
        Download PDF
      </Button>

      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
        <Button type="button" variant="outline">
          Share Insight
        </Button>
      </a>
    </div>
  );
}

