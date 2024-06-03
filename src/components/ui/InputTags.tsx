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

interface InputTagsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  necessary?: boolean;
  setValue: UseFormSetValue<ITodoByModal>;
  initialTags?: string;
}

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>((props, ref) => {
  const {
    className,
    error,
    setValue,
    initialTags,
    necessary = false,
    ...rest
  } = props;

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (initialTags) {
      const arrTags = initialTags.split(" ");
      arrTags.pop();
      setTags(arrTags);
    }
  }, [initialTags]);

  const handleOnInputTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = document.getElementById(
      "my_tags_input"
    ) as HTMLInputElement;

    const lastChar = e.target.value.slice(-1);

    if (lastChar === " ") {
      let enteredWord = e.target.value.trimStart();
      e.target.value = enteredWord;

      if (enteredWord === "") return;

      if (enteredWord?.[0] !== "#") {
        enteredWord = "#" + enteredWord.trimEnd();
      } else {
        enteredWord = enteredWord.trimEnd();
      }

      if (tags.find((tag) => tag === enteredWord)) {
        e.target.value = e.target.value.trim();
        return toast.error("It has already this tag!");
      }

      setTags([...tags, enteredWord]);
      inputEl.value += enteredWord + " ";
      setValue("tags", inputEl.value);

      e.target.value = "";
    }
  };

  const handleDeleteTag = (deletedTag: string) => {
    const inputEl = document.getElementById(
      "my_tags_input"
    ) as HTMLInputElement;

    const updatedTags = tags.filter((tag) => tag !== deletedTag);

    setTags(updatedTags);

    inputEl.value = "";

    for (let i = 0; i < updatedTags.length; i++) {
      inputEl.value += updatedTags[i] + " ";
    }
    setValue("tags", inputEl.value);
  };

  return (
    <div className="flex-1">
      {props.label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          {props.label} {necessary && <span className="text-red-500">*</span>}
        </label>
      )}

      <input type="hidden" ref={ref} id="my_tags_input" />
      <input
        type="text"
        {...rest}
        className={cn(
          "outline-none py-2 block w-full transition duration-300 ease-in-out text-black dark:text-white dark:bg-gray-600 px-4 rounded-md border border-gray-300 dark:border-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50",
          className
        )}
        onInput={handleOnInputTags}
      />
      <div className="flex flex-wrap gap-1 mt-2">
        {tags?.map((tag, index) => (
          <div key={index} className="relative p-1.5">
            <Chip className="px-3.5 py-1.5 rounded-lg">{tag}</Chip>
            <div
              className="z-20 absolute font-bold top-0 right-0 text-xs text-red-500 hover:scale-125 cursor-pointer transition duration-300"
              onClick={() => handleDeleteTag(tag)}
            >
              <FaX />
            </div>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

InputTags.displayName = "InputTags";

export default InputTags;
