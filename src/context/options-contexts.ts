import { createContext } from "react";

export interface IOptionsContext {
  bgColor: string;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: IOptionsContext = {
  bgColor: "bg-white dark:bg-gray-800",
  setBgColor: () => {},
  textColor: "text-black dark:text-white",
  setTextColor: () => {},
};

export const OptionsContext = createContext<IOptionsContext>(initialState);
