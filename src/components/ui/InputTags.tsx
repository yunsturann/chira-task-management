"use client";

import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  forwardRef,
  useState,
} from "react";

// ** Custom Components
import Chip from "./Chip";
import Button from "./Button";
import ColorPicker from "./ColorPicker";
import Input from "./Input";
import { FaX } from "react-icons/fa6";
import toast from "react-hot-toast";

export interface ITag {
  tag: string;
  color: string;
}

interface InputTagsProps {
  tags: ITag[];
  setTags: Dispatch<SetStateAction<ITag[]>>;
}

const InputTags = forwardRef<HTMLInputElement, InputTagsProps>((props, ref) => {
  const { tags, setTags } = props;

  const [tag, setTag] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const handleAddTag = () => {
    if (tag === "") return toast.error("Tag is required to add!");

    const isTagExists = tags.some((t) => t.tag === tag);
    if (isTagExists) return toast.error("Tag already exists!");

    setTags([...tags, { tag, color: color || "#e2e8f0" }]);
    setTag("");
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t.tag !== tag));
  };

  return (
    <div className="flex flex-col gap-y-3">
      <Input
        placeholder="e.g. web, mobile, design"
        label="Add Tags with color"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      {/* Tag Input  & Color & Add Button */}
      <div className="grid sm:grid-cols-2 items-end gap-x-4 gap-y-3">
        <ColorPicker className="col-span-1" color={color} setColor={setColor} />
        <Button type="button" color="gray" onClick={handleAddTag}>
          Add Tag
        </Button>
      </div>

      {/* Chips entered */}
      <div className="flex flex-wrap gap-1">
        {tags?.map(({ color, tag }, index) => (
          <div key={index} className="relative p-1.5">
            <Chip
              className="px-3.5 py-1.5 rounded-lg"
              style={{ background: color }}
            >
              {tag}
            </Chip>
            <div
              className="z-20 absolute  top-0 right-0 hover:scale-125 cursor-pointer transition duration-300 rounded-lg bg-red-400 size-4 text-white flex items-center justify-center"
              onClick={() => handleDeleteTag(tag)}
            >
              <FaX size={8} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

InputTags.displayName = "InputTags";

export default InputTags;
