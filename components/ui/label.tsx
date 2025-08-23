import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-label-700 py-0 tracking-body-3 leading-body-3",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export { Label };
