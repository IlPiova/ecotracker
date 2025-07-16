import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Varianti personalizzate
        red: "border-transparent bg-red-100 text-red-800 [a&]:hover:bg-red-200 dark:bg-red-900/20 dark:text-red-200",
        orange:
          "border-transparent bg-orange-100 text-orange-800 [a&]:hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-200",
        amber:
          "border-transparent bg-amber-100 text-amber-800 [a&]:hover:bg-amber-200 dark:bg-amber-900/20 dark:text-amber-200",
        yellow:
          "border-transparent bg-yellow-100 text-yellow-800 [a&]:hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-200",
        green:
          "border-transparent bg-green-100 text-green-800 [a&]:hover:bg-green-200 dark:bg-green-900/20 dark:text-green-200",
        blue: "border-transparent bg-blue-100 text-blue-800 [a&]:hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-200",
        purple:
          "border-transparent bg-purple-100 text-purple-800 [a&]:hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-200",
        pink: "border-transparent bg-pink-100 text-pink-800 [a&]:hover:bg-pink-200 dark:bg-pink-900/20 dark:text-pink-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
