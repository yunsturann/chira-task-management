"use client";
// ** React Imports
import React, { Dispatch, SetStateAction, useState } from "react";

// ** Utils
import { cn } from "@/lib/utils";

// ** Third Party Components
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import { FaRegFolderOpen, FaTrash } from "react-icons/fa";

interface DropZoneProps {
  label?: string;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  title: string;
  description?: string;
  className?: string;
  maxFileSize?: number;
}

const DropZone = (props: DropZoneProps) => {
  const { label, files, setFiles, title, description, className, maxFileSize } =
    props;

  const handleOnDrop = (droppedFiles: File[]) => {
    // validate file size
    const validFiles = droppedFiles.filter((file) => {
      if (maxFileSize && file.size > maxFileSize) {
        toast.error(
          `File ${file.name} is too large. Max file size is ${
            maxFileSize / 1048576
          } MB`,
          { duration: 5000 }
        );
        return false;
      }
      return true;
    });

    setFiles([...validFiles, ...files]);
  };

  const deleteFile = (index: number) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <Dropzone onDrop={handleOnDrop} multiple={true}>
      {({ getRootProps, getInputProps }) => (
        <section className={cn("text-center pb-2", className)}>
          {label && (
            <label className="block text-sm font-medium text-gray-700 dark:text-white text-left mb-2">
              {label}
            </label>
          )}
          <div
            {...getRootProps()}
            className="py-3 border bg-white dark:bg-gray-600 border-gray-700 dark:border-gray-200 border-dashed rounded-2xl"
          >
            <h4 className="px-2 text-lg text-center font-medium text-navy-700 ">
              {title}
            </h4>
            <input {...getInputProps()} />
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Drag and drop a file here, or click to select a file
            </p>
            <p className="text-gray-400 dark:text-gray-400 mt-1 text-sm">
              {description}
            </p>
          </div>
          {/* Selected File Operations */}
          <div>
            {files.map((file, index) => (
              <div
                key={index}
                className="mt-2 border border-gray-200 dark:border-gray-600 rounded-md flex items-center text-left"
              >
                <div className="bg-gray-300 dark:bg-gray-700 p-4 text-xl rounded-l-md">
                  <FaRegFolderOpen />
                </div>
                <div className="pr-2 flex-grow flex items-center justify-between">
                  {/* File Content */}
                  <div className="ml-2 sm:ml-6">
                    <p className="text-sm sm:text-base line-clamp-2">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  {/* ACTIONS */}
                  <div>
                    <button
                      className="px-3 py-2 text-red-500 text-xl hover:bg-gray-200 rounded-lg transition duration-300"
                      onClick={() => deleteFile(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default DropZone;
