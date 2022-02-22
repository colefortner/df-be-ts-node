import { Schema, model } from "mongoose";

export interface IRating {
  rating: number;
}

const ratingSchema = new Schema<IRating>({
  rating: { type: Number, required: true },
});

export const RatingModel = model<IRating>("Rating", ratingSchema);
