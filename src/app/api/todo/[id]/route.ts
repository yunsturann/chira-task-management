import { connectToDatabase } from "@/lib/database";
import Todo from "@/lib/models/todo-model";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, { params }: Params) {
  console.log(params.id);
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
