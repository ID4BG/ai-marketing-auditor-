import type React from "react";

export function ReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f8fafc] py-16">
      <div className="mx-auto max-w-6xl px-6 space-y-12">{children}</div>
    </main>
  );
}

