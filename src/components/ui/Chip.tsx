import React, { forwardRef } from "react";

// ** Utils
import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "low" | "medium" | "high" | "gray";
}

const colors = {
  low: "bg-green-200",
  medium: "bg-yellow-200",
  high: "bg-red-300 ",
  gray: "bg-gray-200",
};

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const { className, color = "gray", ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      draggable
      className={cn(
        "py-1 px-2.5 rounded-full text-black text-sm tracking-tighter",
        className,
        colors[color]
      )}
    />
  );
});

Chip.displayName = "Chip";

export default Chip;
