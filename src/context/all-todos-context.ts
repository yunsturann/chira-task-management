import React, { createContext } from "react";

// ** Types
import { ITodoResponse } from "@/types/model.types";

export interface ITodoContext {
  todos: ITodoResponse;
  setTodos: React.Dispatch<React.SetStateAction<ITodoResponse>>;
  boardId: string;
}

const initialState: ITodoContext = {
  todos: { done: [], in_progress: [], todo: [], length: 0 },
  setTodos: () => {},
  boardId: "",
};

export const TodoContext = createContext<ITodoContext>(initialState);
