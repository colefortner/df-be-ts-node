import { RequestHandler } from "express";
import mongoose from "mongoose";

import { UserModel, IUser } from "../models/user";

export const getUsers: RequestHandler = async (req, res, next) => {
  let users;
  try {
    users = await UserModel.find({});
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

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

export const updateUser: RequestHandler<IUser> = async (req, res, next) => {
  const { id, username, email, password, image } = req.body;
  const userId = req.params.id;

  let user;

  try {
    user = await UserModel.findById(userId);
  } catch (err) {
    console.log(err);
    return next();
  }

  if (!user) {
    throw new Error("Could not find user");
  }

  user.id = id;
  user.username = username;
  user.email = email;

  try {
    await user.save();
  } catch (err) {
    console.log(err);
    return next();
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.id;

  let user;

  try {
    user = await UserModel.findById(userId);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  if (!user) {
    throw new Error("Could not find user");
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.json({ message: "User deleted!" });
};
