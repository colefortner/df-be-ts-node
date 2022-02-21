import { RequestHandler } from "express";
import bcrypt from "bcrypt";

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
  // console.log("REQUEST BODY", req.body);

  const { id, username, email, password } = req.body;

  console.log(req.file);
  if (!req.file) {
    console.log("No file uploaded");
    return;
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(err);
  }

  const createdUser = new UserModel({
    id,
    username,
    email,
    password: hashedPassword,
    image: req.file.path,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(201).json({ message: "Created user", createdUser });
};

export const loginUser: RequestHandler = async (req, res, next) => {
  console.log(req.body);

  res.json({ message: "Login data received" });
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
    await user.remove();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.json({ message: "User deleted!" });
};
