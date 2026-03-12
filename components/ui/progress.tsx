import * as React from "react";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export function Progress({ value = 0, className = "", ...props }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-[#e5e7eb] ${className}`}
      {...props}
    >
      <div
        className="h-full rounded-full bg-[#2563eb] transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

