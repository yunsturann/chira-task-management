"use client";
// ** React Imports
import { Dispatch, SetStateAction, useRef, useState } from "react";

// ** Hooks
import useClickOutside from "@/hooks/use-click-outside";

// ** Utils
import { cn, onInputAllowOnlyHex } from "@/lib/utils";

interface ColorPickerProps {
  colorList: string[][];
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  className?: string;
  position?: "top" | "bottom";
  label?: string;
}

const ColorPicker = (props: ColorPickerProps) => {
  const {
    colorList,
    color,
    setColor,
    className,
    position = "top",
    label,
  } = props;
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setShowColorPicker(false);
  });

  const handleOnChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setColor("");
      return;
    }
    let value = e.target.value;
    if (value[0] !== "#") value = "#" + value;

    setColor(value);
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <p className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          {label}
        </p>
      )}
      {/* Input & Color Trigger */}
      <div
        className="flex justify-between border border-gray-300 dark:border-gray-500 rounded-md cursor-pointer focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 focus-within:ring-opacity-50 transition duration-300 ease-in-out"
        onClick={() => setShowColorPicker((prev) => !prev)}
        ref={dropdownRef}
      >
        <input
          className="outline-none py-2 block w-full text-black dark:text-white dark:bg-gray-600 px-4 rounded-l-md "
          value={color}
          placeholder="e.g. #ffffff"
          maxLength={7}
          onChange={handleOnChangeColor}
          onInput={onInputAllowOnlyHex}
        />

        <div className="px-6 py-2 flex items-center justify-center rounded-r-md cursor-pointer bg-gray-600 dark:bg-gray-500 hover:opacity-70 transition  ">
          <div
            className="size-4 rounded-sm bg-[#e2e8f0]"
            style={{ background: color }}
          />
        </div>
      </div>

      {/* Color Picker dropwdown */}
      {showColorPicker && (
        <div
          className={cn(
            "z-50 absolute right-0 flex gap-1.5 rounded-md bg-gray-600 py-1.5 px-2 shadow-lg border border-gray-400",
            {
              "bottom-full mb-1": position === "top",
              "top-full mt-1": position === "bottom",
            }
          )}
        >
          {colorList.map((_, index) => (
            <ul key={index} className="flex flex-col gap-1">
              {colorList[index].map((color, index) => (
                <li
                  key={index}
                  title={color}
                  className="size-5 rounded-sm cursor-pointer hover:scale-125 transition duration-300 ease-in-out"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setColor(color);
                    setShowColorPicker(false);
                  }}
                />
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
