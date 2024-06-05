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

// ** Todo Types

export enum TodoStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum TodoPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  tags: {
    tag: string;
    color: string;
  }[];
  status: "todo" | "in_progress" | "done";
  user: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  index: number;
  __v: number;
}

export interface ITodoResponse {
  todo: ITodo[];
  in_progress: ITodo[];
  done: ITodo[];
  length: number;
}

export interface ITodoStatusIndexRequest {
  _id: string;
  status: TodoStatus;
  index: number;
}
