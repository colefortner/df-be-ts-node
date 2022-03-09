import mongoose, { Schema, model, ObjectId } from "mongoose";
import { IUser } from "./user";

export interface IBusiness extends mongoose.Document {
  name: string;
  image: string;
  rating: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: number;
  };
  website: string;
  phone: string;
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  type: String[];
  location: {
    lat: number;
    lng: number;
  };
  comments: {
    // _id: mongoose.Types.ObjectId;
    userId: string;
    avatar: string | undefined;
    comment: string | null;
    commentDate: Date;
    rating: number | null;
    username: string | undefined;
  }[];
  users: String[];
}

export const businessSchema = new Schema<IBusiness>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
  },
  website: { type: String, required: true },
  phone: { type: String, required: true },
  hours: [
    {
      day: { type: String, required: true },
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
  ],

  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  comments: [
    {
      userId: { type: String, required: true },
      avatar: { type: String, required: true },
      comment: { type: String, required: true },
      commentDate: { type: Date, required: true },
      rating: { type: Number, required: true },
      username: { type: String, required: true },
    },
  ],
  users: [{ type: String, required: true }],
});

export const BusinessModel = model<IBusiness>("Business", businessSchema);

// export class Business {
//   constructor(public id: string, public name: string) {}
// }
