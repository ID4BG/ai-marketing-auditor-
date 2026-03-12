import type React from "react";

export function ReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl px-6 space-y-16">{children}</div>
    </main>
  );
}

