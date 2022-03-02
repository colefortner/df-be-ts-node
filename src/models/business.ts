import mongoose, { Schema, model } from "mongoose";
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
    userId: string;
    comment: string;
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
    },
  ],
  users: [{ type: String, required: true }],
});

export const BusinessModel = model<IBusiness>("Business", businessSchema);

// export class Business {
//   constructor(public id: string, public name: string) {}
// }
