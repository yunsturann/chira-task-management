"use server";

// ** Db Connection
import { connectToDatabase } from "../database";

// ** Model Imports
import Todo from "../models/todo-model";

// CREATE FIRST TODO
export async function createTodoWithFormData(
  prevState: FormState,
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

// Read By UserId
export async function getTodosByUserId(userId: string) {
  const todo: any[] = [],
    in_progress: any[] = [],
    done: any[] = [];

  try {
    await connectToDatabase();

    const todos = await Todo.find({ user: userId });

    todos.forEach((todoItem) => {
      switch (todoItem.status) {
        case "todo":
          todo.push(todoItem);
          break;
        case "in_progress":
          in_progress.push(todoItem);
          break;
        case "done":
          done.push(todoItem);
          break;
        default:
          break;
      }
    });

    return JSON.parse(
      JSON.stringify({ todo, in_progress, done, length: todos.length })
    );
  } catch (error) {
    console.error(error);
  }
}
