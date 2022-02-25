import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./user";

export interface IBusiness {
  name: string;
  image: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
  users: IUser[];
}

const businessSchema = new Schema<IBusiness>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  users: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
});

export const BusinessModel = model<IBusiness>("Business", businessSchema);

// export class Business {
//   constructor(public id: string, public name: string) {}
// }
