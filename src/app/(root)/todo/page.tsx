// ** React
import React from "react";

// ** Nextj Imports
import { redirect } from "next/navigation";

// ** Actions
import { getUserById } from "@/lib/actions/user.actions";
import { getTodosByUserId } from "@/lib/actions/todo.actions";

// ** Types
import { ITodo, IUser } from "@/types/model.types";

// ** Third Party Imports
import { auth } from "@clerk/nextjs";

const TodoPage = async () => {
  const { userId } = auth();

  const user: IUser = await getUserById(userId!);

  if (!user) {
    redirect("/");
  }

  const todos: ITodo[] = await getTodosByUserId(user._id);

  if (todos.length === 0) {
    redirect("/onboarding");
  }

  return <div className="bg-slate-200">TodoPage</div>;
};

export default TodoPage;
