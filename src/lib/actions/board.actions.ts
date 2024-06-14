"use server";

import { IBoard, IUser } from "@/types/model.types";
import { connectToDatabase } from "../database";
import Board from "../models/board-model";
import User from "../models/user-model";

// CREATE FIRST BOARD
export async function createBoardWithFormData(
  prevState: TFormActionState,
  formData: FormData
) {
  const { userId, name } = Object.fromEntries(formData.entries());

  try {
    await connectToDatabase();

    await Board.create({
      name,
      userId,
    });

    return { message: "Board created successfully", error: false };
  } catch (error: any) {
    return { message: error.message as string, error: true };
  }
}

export async function getAllBoardsByUserId(userId: string) {
  try {
    await connectToDatabase();

    const boards: IBoard[] = (await Board.find({ userId })) || [];

    return JSON.parse(JSON.stringify(boards));
  } catch (error) {
    console.error("Something went wrong!");
  }
}

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
