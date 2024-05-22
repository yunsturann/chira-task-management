import { connectToDatabase } from "@/lib/database";
import Todo from "@/lib/models/todo-model";
import { NextRequest, NextResponse } from "next/server";

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
