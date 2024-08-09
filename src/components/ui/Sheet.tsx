"use client";
// ** React Imports
import React from "react";

// ** Utils
import { cn } from "@/lib/utils";

// ** React Icons
import { FaX } from "react-icons/fa6";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  hasOverlay?: boolean;
}

const Sheet = (props: SheetProps) => {
  const {
    isOpen,
    onClose,
    className,
    header,
    children,
    hasOverlay = true,
  } = props;

  return (
    <>
      {/* overlay */}
      {isOpen ? (
        <div
          className={cn("z-10 fixed top-0 left-0 w-full h-screen ", {
            "bg-black bg-opacity-50": hasOverlay,
          })}
          onClick={onClose}
        ></div>
      ) : null}

      {/* content */}
      <nav
        className={cn(
          "z-20 fixed h-screen top-0 bottom-0 right-0 w-[70%] sm:w-[360px] bg-white dark:bg-gray-800 p-6 flex flex-col gap-y-8 shadow-md shadow-purple-200/50 transform translate-x-full transition-transform duration-300",
          {
            "translate-x-0": isOpen,
          },
          className
        )}
        // onClick={(e) => e.stopPropagation()}
      >
        {/* Head */}
        <div className="flex justify-between items-center">
          {header}
          <div
            className=" text-lg cursor-pointer hover:opacity-50 transition duration-300"
            onClick={onClose}
          >
            <FaX />
          </div>
        </div>
        {/* Body */}
        {children}
      </nav>
    </>
  );
};

export default Sheet;
