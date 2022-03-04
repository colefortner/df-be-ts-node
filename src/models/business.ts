import mongoose, { Schema, model, ObjectId } from "mongoose";
import { IUser } from "./user";

export interface IBusiness extends mongoose.Document {
  name: string;
  image: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
  comments: {
    // _id: mongoose.Types.ObjectId;
    userId: string;
    comment: string | null;
    rating: number | null;
  }[];
  users: String[];
}

export const businessSchema = new Schema<IBusiness>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  comments: [
    {
      userId: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
  users: [{ type: String, required: true }],
});

export const BusinessModel = model<IBusiness>("Business", businessSchema);

// export class Business {
//   constructor(public id: string, public name: string) {}
// }
