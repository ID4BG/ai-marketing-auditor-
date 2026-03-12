import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Marketing Auditor",
  description: "Quickly audit your positioning, messaging, ICP, and funnel."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8fafc] text-[#18181b] antialiased">
        {children}
      </body>
    </html>
  );
}

