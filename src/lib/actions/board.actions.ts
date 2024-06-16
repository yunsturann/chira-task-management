"use server";

// ** Next Imports
import { revalidatePath } from "next/cache";

// ** Types
import { IBoard, IUser } from "@/types/model.types";

// ** Models & Database
import { connectToDatabase } from "../database";
import Board from "../models/board-model";
import User from "../models/user-model";

// CREATE FIRST BOARD
export async function createBoardWithModal(userId: string, name: string) {
  try {
    await connectToDatabase();

    await Board.create({
      name,
      userId,
    });

    revalidatePath("/todo");

    return { message: "Board created successfully", error: false };
  } catch (error: any) {
    return { message: error.message as string, error: true };
  }
}

// DELETE A BOARD
export async function deleteBoardById(boardId: string) {
  try {
    await connectToDatabase();

    await Board.findByIdAndDelete(boardId);

    revalidatePath("/todo");
    return { message: "Board deleted successfully", error: false };
  } catch (error) {
    return { message: (error as Error).message, error: true };
  }
}

// UPDATE A BOARD
export async function updateBoardById(boardId: string, name: string) {
  try {
    await connectToDatabase();

    await Board.findByIdAndUpdate(boardId, { name });

    revalidatePath("/todo");
    return { message: "Board updated successfully", error: false };
  } catch (error) {
    return { message: (error as Error).message, error: true };
  }
}

// GET ALL BOARDS BY USER ID FOR TODO PAGE
export async function getAllBoardsByUserId(userId: string) {
  try {
    await connectToDatabase();

    const boards: IBoard[] = (await Board.find({ userId })) || [];

    return JSON.parse(JSON.stringify(boards));
  } catch (error) {
    console.error("Something went wrong!");
  }
}

// GET A BOARD BY USER ID AND BOARD NAME FOR [BOARD] PAGE
export async function getUserAndBoard(userId: string, boardName: string) {
  try {
    await connectToDatabase();

    const user: IUser | null = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const board = await Board.findOne({
      userId: user._id,
      name: boardName,
    });

    return JSON.parse(JSON.stringify(board));
  } catch (error) {
    console.error(error);
  }
}
