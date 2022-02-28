import mongoose, { Schema, model } from "mongoose";
import { IBusiness } from "./business";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  image: string;
  businessRelationships: [String];
  businesses: String[];
}

export const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  businessRelationships: [{ type: String, required: true }],
  businesses: [{ type: String, required: true }],
});

export const UserModel = model<IUser>("User", userSchema);
