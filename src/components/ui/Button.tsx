"use client";
// ** React Imports
import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";

// ** Utils
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "gray" | "blue";
}

const colors = {
  gray: "bg-gray-100 border-gray-300 text-black hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-500 dark:text-white dark:hover:bg-gray-600 focus:ring-gray-500 dark:focus:ring-gray-500",
  blue: "bg-blue-500 border-blue-600 text-white hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-500 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-500",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, disabled, color = "gray", ...rest } = props;

  const { pending } = useFormStatus();

  return (
    <button
      ref={ref}
      disabled={pending || disabled}
      {...rest}
      className={cn(
        "w-full py-2 px-4 border rounded-lg tracking-wide transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-opacity-50",
        {},
        colors[color],
        className
      )}
    />
  );
});

Button.displayName = "Button";

export default Button;
