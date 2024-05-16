// ** React Imports
import React, { forwardRef } from "react";

// ** Utils
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isUnderlined?: boolean;
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, error, isUnderlined = false, ...rest } = props;

  return (
    <div>
      {props.label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {props.label}
        </label>
      )}
      <input
        ref={ref}
        {...rest}
        className={cn(
          "outline-none py-2 block w-full transition duration-300 ease-in-out text-black dark:text-white",
          {
            "border-b border-gray-400 bg-transparent": isUnderlined,
            "px-4 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 ":
              !isUnderlined,
          },
          className
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
