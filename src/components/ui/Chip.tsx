import React, { forwardRef } from "react";

// ** Utils
import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  priorityType?: "low" | "medium" | "high";
}

const colors = {
  low: "bg-green-200 text-black/70 dark:bg-green-100 ",
  medium: "bg-yellow-200 text-black/70 ",
  high: "bg-red-200 text-black/70 ",
};

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const { priorityType, className, ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      className={cn(
        "py-1 px-2.5 rounded-full bg-gray-200 text-black text-sm tracking-tighter",
        className,
        colors[priorityType!]
      )}
    />
  );
});

Chip.displayName = "Chip";

export default Chip;
