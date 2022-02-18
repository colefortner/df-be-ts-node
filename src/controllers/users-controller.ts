import { RequestHandler } from "express";
import mongoose from "mongoose";

import { UserModel, IUser } from "../models/user";

export const createUser: RequestHandler = async (req, res, next) => {
  const { id, username, email, password, image } = req.body;

  const createdUser = new UserModel({
    id,
    username,
    email,
    password,
    image,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(201).json({ message: "Created user", createdUser });
};
