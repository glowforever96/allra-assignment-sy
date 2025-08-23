import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "h-10 px-3 text-body-3 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-title-4 font-semibold outline-none shrink-0 disabled:cursor-not-allowed cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-label-100 hover:bg-secondary-400 disabled:text-label-100 disabled:bg-status-disable disabled:hover:bg-status-disable",
        outline:
          "border bg-bg-default hover:bg-label-100 border-secondary-300 text-primary disabled:text-status-disable disabled:border-status-disable disabled:hover:bg-bg-default",
        secondary:
          "bg-bg-default text-label-800 hover:bg-label-100 border border-status-disable",
        // ghost:
        //   "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        // link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        responsive:
          "sm:h-12 sm:px-4 sm:text-title-4 md:h-14 md:px-6 md:text-title-4",
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "responsive",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
