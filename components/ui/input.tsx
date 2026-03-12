import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`h-11 w-full rounded-lg border border-[#e2e8f0] bg-white px-4 text-sm text-[#0f172a] outline-none placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

