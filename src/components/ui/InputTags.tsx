"use client";
// ** React Imports
import React, { forwardRef, useEffect, useRef, useState } from "react";

// ** Utils
import { cn } from "@/lib/utils";

// ** Icons
import { FaX } from "react-icons/fa6";

// ** Third Party Imports
import toast from "react-hot-toast";
import { UseFormSetValue } from "react-hook-form";

// ** Custom Components
import Chip from "./Chip";

interface ITag {
  tag: string;
  color: string;
}

interface InputTagsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;

  setValue: UseFormSetValue<ITodoByModal>;
  initialTags?: ITag[];
}

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>((props, ref) => {
  const {
    className,
    error,
    setValue,
    initialTags,

    ...rest
  } = props;

  const [tags, setTags] = useState<ITag[]>([]);
  const [tag, setTag] = useState<string>("");
  const [color, setColor] = useState<string>("#fefefe");

  const handleAddTag = () => {
    if (tag === "") return toast.error("Tag is required!");
    setTags([...tags, { tag, color }]);
  };

  // const handleOnInputTags = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputEl = document.getElementById(
  //     "my_tags_input"
  //   ) as HTMLInputElement;

  //   const lastChar = e.target.value.slice(-1);

  //   if (lastChar === " ") {
  //     let enteredWord = e.target.value.trimStart();
  //     e.target.value = enteredWord;

  //     if (enteredWord === "") return;

  //     if (enteredWord?.[0] !== "#") {
  //       enteredWord = "#" + enteredWord.trimEnd();
  //     } else {
  //       enteredWord = enteredWord.trimEnd();
  //     }

  //     if (tags.find((tag) => tag === enteredWord)) {
  //       e.target.value = e.target.value.trim();
  //       return toast.error("It has already this tag!");
  //     }

  //     setTags([...tags, enteredWord]);
  //     inputEl.value += enteredWord + " ";
  //     setValue("tags", inputEl.value);

  //     e.target.value = "";
  //   }
  // };

  // const handleDeleteTag = (deletedTag: string) => {
  //   const inputEl = document.getElementById(
  //     "my_tags_input"
  //   ) as HTMLInputElement;

  //   const updatedTags = tags.filter((tag) => tag !== deletedTag);

  //   setTags(updatedTags);

  //   inputEl.value = "";

  //   for (let i = 0; i < updatedTags.length; i++) {
  //     inputEl.value += updatedTags[i] + " ";
  //   }
  //   setValue("tags", inputEl.value);
  // };

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2 items-end">
      {/* Tag */}
      <div className="col-span-1">
        {props.label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
            {props.label}
            <span className="text-red-500"> *</span>
          </label>
        )}

        <input
          type="text"
          {...rest}
          className={cn(
            "outline-none py-2 block w-full transition duration-300 ease-in-out text-black dark:text-white dark:bg-gray-600 px-4 rounded-md border border-gray-300 dark:border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50",
            className
          )}
          value={tag}
          onChange={(e) => setTag(e.target.value)}

          // onInput={handleOnInputTags}
        />
      </div>
      {/* Color */}
      <div className="col-span-1 flex flex-col justify-between h-full">
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Select Color
        </label>
        <input
          type="color"
          title="Color"
          value={color}
          className="w-full h-full bg-blue-100"
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      {/* button */}
      <div className="col-span-1 ">
        <button
          type="button"
          className="w-full ml-auto py-2 px-4 text-sm tracking-tight border rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-opacity-50 bg-gray-800 border-gray-950 text-white hover:bg-gray-700 focus:ring-gray-600 dark:bg-gray-100 dark:border-gray-300 dark:text-black dark:hover:bg-gray-300 dark:focus:ring-gray-500"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
      </div>
      <div className="col-span-3 flex flex-wrap gap-1 mt-2">
        {tags?.map((tag, index) => (
          <div key={index} className="relative p-1.5">
            <Chip
              className="px-3.5 py-1.5 rounded-lg"
              style={{ backgroundColor: tag.color }}
            >
              {tag.tag}
            </Chip>
            <div
              className="z-20 absolute font-bold top-0 right-0 text-xs text-red-500 hover:scale-125 cursor-pointer transition duration-300"
              // onClick={() => handleDeleteTag(tag.tag)}
            >
              <FaX />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

InputTags.displayName = "InputTags";

export default InputTags;
