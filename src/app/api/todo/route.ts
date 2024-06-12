import { connectToDatabase } from "@/lib/database";
import Todo from "@/lib/models/todo-model";
import { ITodoStatusIndexRequest } from "@/types/model.types";
import { NextRequest, NextResponse } from "next/server";

// Add a new todo to the database from the form modal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await connectToDatabase();

    const newTodo = await Todo.create(body);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Update todo status and index in the database on drag and drop
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const db = await connectToDatabase();

    // start a session for the transaction
    const session = await db.startSession();

    session.startTransaction();

    try {
      // Use Promise.all to update all todos concurrently
      await Promise.all(
        body.map((todo: ITodoStatusIndexRequest) => {
          return Todo.findByIdAndUpdate(todo._id, {
            status: todo.status,
            index: todo.index,
          });
        })
      );
      // commit the transaction if all todos are updated successfully
      await session.commitTransaction();
    } catch (error) {
      // rollback the transaction if any error occurs
      await session.abortTransaction();

      throw new Error("Failed to update todos");
    } finally {
      // end the session
      session.endSession();
    }

    return NextResponse.json(
      { message: "Tasks updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
