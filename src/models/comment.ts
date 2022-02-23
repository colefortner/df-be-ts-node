import { Schema, model } from "mongoose";

export interface IComment {
  id: string;
  comment: string;
}

const commentSchema = new Schema<IComment>({
  comment: { type: String, required: true },
});

export const CommentModel = model<IComment>("Comment", commentSchema);
