import { Schema } from "mongoose";

export interface IUser {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  photo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITodo extends Document {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  status: "todo" | "in-progress" | "done";
  user: Schema.Types.ObjectId;
}

export enum TodoStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

export enum TodoPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
