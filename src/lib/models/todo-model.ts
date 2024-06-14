import { ITodo } from "@/types/model.types";
import mongoose, { Model, Schema } from "mongoose";

interface ITodoModel extends Model<ITodo> {}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    tags: [
      {
        _id: false,
        tag: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
      required: true,
    },
    index: {
      type: Number,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TodoSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastTodo = await (this.constructor as ITodoModel)
      .findOne({ boardId: this.boardId, status: this.status })
      .sort("-index");
    if (lastTodo) {
      this.index = lastTodo.index + 1;
    } else {
      this.index = 0;
    }
  }
  next();
});

const Todo = mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
