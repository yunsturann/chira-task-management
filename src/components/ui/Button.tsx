"use client";
// ** React Imports
import React, { forwardRef } from "react";

// ** Utils
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "gray" | "blue";
}

const colors = {
  gray: "bg-gray-100 border-gray-300 text-black hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:hover:bg-gray-600",
  blue: "bg-blue-500 border-blue-500 text-white",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, color = "gray", ...rest } = props;

  const { pending } = useFormStatus();

  return (
    <button
      ref={ref}
      disabled={pending}
      {...rest}
      className={cn(
        "w-full py-2 px-4 border rounded-lg tracking-wide transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed ",
        {},
        colors[color],
        className
      )}
    />
  );
});

Button.displayName = "Button";

export default Button;
