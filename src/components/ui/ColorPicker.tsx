"use client";

import { colorPickerColors } from "@/constants";
import useClickOutside from "@/hooks/use-click-outside";
import { cn, onInputAllowOnlyHex } from "@/lib/utils";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface ColorPickerProps {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  className?: string;
}

const ColorPicker = (props: ColorPickerProps) => {
  const { color, setColor, className } = props;
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

        <div className="px-6 flex items-center justify-center rounded-r-md cursor-pointer bg-gray-600 dark:bg-gray-500 hover:opacity-70 transition  ">
          <div
            className="size-4 rounded-sm bg-[#e2e8f0]"
            style={{ background: color }}
          />
        </div>
      </div>

      {/* Color Picker dropwdown */}
      {showColorPicker && (
        <div className="absolute bottom-full mb-1 right-0 flex gap-1 rounded-md bg-gray-200 dark:bg-gray-600 py-1.5 px-2 shadow-lg border border-gray-400">
          {colorPickerColors.map((_, index) => (
            <ul key={index} className="flex flex-col gap-1">
              {colorPickerColors[index].map((color, index) => (
                <li
                  key={index}
                  className="size-5 rounded-sm cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setColor(color);
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
