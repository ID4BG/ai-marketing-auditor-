export function ShareLinkedIn({
  score,
  insight,
}: {
  score: number;
  insight: string;
}) {
  const text = encodeURIComponent(
    `I just ran an AI Marketing Audit on my website.

Marketing Clarity Score: ${score}/100

Key insight:
${insight}

Try the audit here: https://yourtool.com`
  );

  const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://yourtool.com&summary=${text}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-lg bg-[#2563eb] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1d4ed8]"
    >
      Share Insight on LinkedIn
    </a>
  );
}

