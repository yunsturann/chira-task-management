// ** Third Party Imports
import clsx, { ClassValue } from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestamp = (
  timestamp: number | string,
  hasHourAndMin?: boolean
): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  if (hasHourAndMin) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.hour12 = true;
  }

  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
};

export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const randomColorGenerator = (alpha = 1): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const onInputUserName = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value
    // remove white space
    .replace(/\s+/g, "")
    // remove special characters
    .replace(/[&='_+\-<>[\]{}|;^%*!]/g, "")
    // remove multiple dots
    .replace(/\.{2,}/g, "")
    // remove multiple hyphens
    .replace(/[^a-zA-Z0-9!@#%^()=+`~\\]/g, "");
};

export const onInputRemoveSpace = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/\s+/g, "");
};

export const onInputRemoveSpecialChars = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[&='_+\-<>[\]{}|;^%*!]/g, "");
};

export const onInputRemoveSpaceAndSpecialChars = (
  e: ChangeEvent<HTMLInputElement>
) => {
  e.target.value = e.target.value
    .replace(/\s+/g, "")
    .replace(/[&='_+\-<>[\]{}|;^%*!]/g, "");
};

export const onInputAllowOnlyHex = (e: ChangeEvent<HTMLInputElement>) => {
  // Allow only characters valid in a hex code: 0-9, a-f, A-F, and optionally the # symbol at the start.
  e.target.value = e.target.value
    // First, ensure the # is allowed only at the beginning.
    .replace(/(?!^)#/g, "")
    // Then, remove any character that is not a hex digit.
    .replace(/[^0-9a-fA-F#]+/g, "");
};
