import { connectToDatabase } from "@/lib/database";
import Todo from "@/lib/models/todo-model";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params }: Params) {
  const newStatus = request.nextUrl.searchParams.get("status");

  try {
    await connectToDatabase();

    await Todo.findByIdAndUpdate(params.id, { status: newStatus });

    return NextResponse.json(
      { message: "Task status updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
