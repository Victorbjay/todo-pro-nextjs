// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@/lib/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none px-4 py-2",
//   {
//     variants: {
//       variant: {
//         default: "bg-blue-600 text-white hover:bg-blue-700",
//         outline: "border border-gray-300 bg-white hover:bg-gray-100",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// );

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp className={cn(buttonVariants({ variant }), className)} ref={ref} {...props} />
//     );
//   }
// );
// Button.displayName = "Button";

// export { Button, buttonVariants };
// import * as React from "react";
// import { cn } from "@/lib/utils";

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, ...props }, ref) => (
//     <button
//       ref={ref}
//       className={cn(
//         "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition",
//         className
//       )}
//       {...props}
//     />
//   )
// );
// Button.displayName = "Button";
// src/components/ui/button.tsx
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "ghost";
  size?: "sm" | "md";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant = "default", size = "md", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none",
          variant === "default" &&
            "bg-indigo-600 text-white hover:bg-indigo-700",
          variant === "outline" &&
            "border border-gray-300 bg-white hover:bg-gray-50",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
          variant === "ghost" && "bg-transparent",
          size === "sm" && "h-8 px-2 text-sm",
          className
        )}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
