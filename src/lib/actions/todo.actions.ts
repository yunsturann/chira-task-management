"use server";

import { ITodo } from "@/types/model.types";
// ** Db Connection
import { connectToDatabase } from "../database";

// ** Model Imports
import Todo from "../models/todo-model";

// CREATE FIRST TODO
export async function createTodoWithFormData(
  prevState: TFormActionState,
  todo: FormData
) {
  const { userId, priority, title } = Object.fromEntries(todo.entries());

  try {
    await connectToDatabase();

    await Todo.create({
      user: userId,
      priority,
      title,
    });

    return { message: "Todo created successfully", error: false };
  } catch (error: any) {
    return { message: error.message as string, error: true };
  }
}

// Read By boardId
export async function getTodosByBoardId(boardId: string) {
  try {
    await connectToDatabase();

    // Start all queries concurrently
    const [todo, in_progress, done]: ITodo[][] = await Promise.all([
      Todo.find({ boardId, status: "todo" }).sort("index"),
      Todo.find({ boardId, status: "in_progress" }).sort("index"),
      Todo.find({ boardId, status: "done" }).sort("index"),
    ]);

    const length = todo.length + in_progress.length + done.length;

    return JSON.parse(JSON.stringify({ todo, in_progress, done, length }));
  } catch (error) {
    console.error(error);
  }
}
