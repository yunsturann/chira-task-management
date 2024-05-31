// ** React
import React from "react";

// ** Nextj Imports
import { redirect } from "next/navigation";

// ** Actions
import { getUserById } from "@/lib/actions/user.actions";
import { getTodosByUserId } from "@/lib/actions/todo.actions";

// ** Types
import { ITodoResponse, IUser } from "@/types/model.types";

// ** Third Party Imports
import { auth } from "@clerk/nextjs";

// ** Custom Components
import Board from "@/components/todo/board";
import Container from "@/components/shared/container";

const TodoPage = async () => {
  const { userId } = auth();

  const user: IUser = await getUserById(userId!);

  if (!user) {
    redirect("/");
  }

  const todos: ITodoResponse = await getTodosByUserId(user._id);

  if (todos.length === 0) {
    redirect("/onboarding");
  }

  return (
    <Container paddingVertical>
      <Board boardTitle="Todo" tasks={todos} userId={user._id} />
    </Container>
  );
};

export default TodoPage;
