import { cn } from "../../lib/utils"; // Asume que tienes cn en lib/utils.ts
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        variant === "primary" &&
          "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transform hover:-translate-y-0.5",
        variant === "secondary" &&
          "bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";