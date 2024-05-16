// ** React Imports
import React from "react";

// ** Utils
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  paddingVertical?: boolean;
  className?: string;
}

const Container = (props: ContainerProps) => {
  const { children, className, paddingVertical = false } = props;

  return (
    <div
      className={cn(
        "max-w-7xl w-full mx-auto px-4 lg:px-8",
        {
          " py-6 lg:py-12": paddingVertical,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
