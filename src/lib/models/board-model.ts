import { IBoard } from "@/types/model.types";
import { Schema, model, models } from "mongoose";

const BoardSchema = new Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure that the board name is unique for each user
BoardSchema.index({ userId: 1, name: 1 }, { unique: true });

const Board = models.Board || model("Board", BoardSchema);

export default Board;
