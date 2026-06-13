import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center rounded-xl text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
      outline: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
      ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
    },
    size: { default: "h-10 px-4", sm: "h-9 px-3", lg: "h-12 px-6" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />);
Button.displayName = "Button";
