import React from "react";

// ** Nextjs Imports
import { redirect } from "next/navigation";

// ** Custom Components
import Container from "@/components/shared/container";
import Board from "@/components/todo/board";

// ** Actions
import { getUserAndBoard } from "@/lib/actions/board.actions";

// ** Types
import { IBoard, ITodoResponse } from "@/types/model.types";

// ** Clerk
import { auth } from "@clerk/nextjs";
import { getTodosByBoardId } from "@/lib/actions/todo.actions";

type BoardPageProps = {
  params: {
    board: string;
  };
};

const BoardPage = async ({ params }: BoardPageProps) => {
  let { board } = params;
  board = decodeURIComponent(board);

  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const boardData: IBoard = await getUserAndBoard(userId, board);

  // if (!boardData) {
  //   throw new Error("Board not found");
  // }

  const todos: ITodoResponse = await getTodosByBoardId(boardData._id);

  return (
    <Container paddingVertical>
      <Board board={boardData} tasks={todos} />
    </Container>
  );
};

export default BoardPage;

export const generateMetadata = async ({ params }: BoardPageProps) => {
  const { board } = params;
  return {
    title: board,
  };
};
