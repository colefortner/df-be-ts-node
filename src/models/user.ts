import { Schema, model } from "mongoose";

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  image: string;
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
});

export const UserModel = model<IUser>("User", userSchema);
