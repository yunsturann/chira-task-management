import { connectToDatabase } from "@/lib/database";
import Todo from "@/lib/models/todo-model";
import { ITodo } from "@/types/model.types";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

function validateBody(body: any) {
  const requiredFields = [
    "id",
    "title",
    "priority",
    "status",
    "description",
    "tags",
  ];

  for (const field of requiredFields) {
    if (!body.hasOwnProperty(field)) {
      throw new Error("Invalid request body");
    }
  }
}

// DELETE ONE TODO
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();

    await Todo.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// UPDATE ONE TODO
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json();

    // Validate the body
    validateBody(body);

    await connectToDatabase();

    body.tags = body.tags.trim() !== "" ? body.tags.trim().split(" ") : [];

    const todo = (await Todo.findById(params.id)) as ITodo;

    // if the status is the same, update the task
    if (todo.status === body.status) {
      const updatedTodo = await Todo.findByIdAndUpdate(params.id, body, {
        new: true,
      });

      return NextResponse.json(
        { message: "Task updated successfully", updatedTodo },
        { status: 200 }
      );
    }

    // find the todos bigger than the current index and decrement them

    await Todo.updateMany(
      { user: todo.user, status: todo.status, index: { $gt: todo.index } },
      { $inc: { index: -1 } }
    );

    // Find the count of todos in the new status
    const count = await Todo.countDocuments({
      user: todo.user,
      status: body.status,
    });

    // Update the todo with the new status and index
    const updatedTodo = await Todo.findByIdAndUpdate(
      body.id,
      {
        ...body,
        index: count,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Task updated successfully", updatedTodo },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
