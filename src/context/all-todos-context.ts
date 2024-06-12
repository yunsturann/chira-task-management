import React, { createContext } from "react";

// ** Types
import { ITodoResponse } from "@/types/model.types";

export interface ITodoContext {
  todos: ITodoResponse;
  setTodos: React.Dispatch<React.SetStateAction<ITodoResponse>>;
  userId: string;
}

const initialState: ITodoContext = {
  todos: { done: [], in_progress: [], todo: [], length: 0 },
  setTodos: () => {},
  userId: "",
};

export const TodoContext = createContext<ITodoContext>(initialState);
