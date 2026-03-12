import { Button } from "@/components/ui/button";

type CTASectionProps = {
  onDownload?: () => void;
  shareUrl?: string;
  strategistUrl?: string;
};

export function CTASection({
  onDownload,
  shareUrl,
  strategistUrl = "https://www.linkedin.com/in/arnelaayvazyan/",
}: CTASectionProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center">
      <h3 className="text-xl font-semibold mb-2">
        Want a deeper strategic audit?
      </h3>
      <p className="text-slate-500 mb-6">
        Connect with Arnela Ayvazyan for a full marketing strategy review.
      </p>

      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        onClick={() =>
          window.open(strategistUrl, "_blank", "noopener,noreferrer")
        }
      >
        Connect on LinkedIn
      </Button>
    </div>
  );
}
