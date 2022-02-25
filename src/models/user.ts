import mongoose, { Schema, model } from "mongoose";
import { IBusiness } from "./business";

export interface IUser {
  username: string;
  email: string;
  password: string;
  image: string;
  businesses: IBusiness[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  businesses: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Business" },
  ],
});

export const UserModel = model<IUser>("User", userSchema);
