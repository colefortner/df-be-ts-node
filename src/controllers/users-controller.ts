import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import { UserModel, IUser } from "../models/user";
import { BusinessModel } from "../models/business";
import mongoose from "mongoose";

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

  let user;

  try {
    user = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = Error("Signup failed");
    return next(error);
  }

  if (user) {
    const error = Error("User already exists");
    return next(error);
  }

  console.log(req.file);
  if (!req.file) {
    const error = Error("No file uploaded");
    return next(error);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = Error("Password hash failed");
    return next(error);
  }

  const createdUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    image: req.file.path,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = Error("User creation failed");
    return next(error);
  }

  let token;
  try {
    token = jsonwebtoken.sign(
      { userId: createdUser.id, email: createdUser.email },
      "hello world",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = "User creation failed";
    return next(error);
  }

  res.status(201).json({ message: "Created user", createdUser, token: token });
};

export const loginUser: RequestHandler = async (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;

  let user;

  try {
    user = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = "Could not find user email";
    return next(error);
  }

  if (!user) {
    const error = "Could not find user email";
    return next(error);
  }

  let isPasswordValid = false;

  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = "Incorrect password";
    return next(error);
  }

  let token;

  try {
    token = jsonwebtoken.sign(
      { userId: user.id, email: user.email },
      "hello world",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = "Token generation failed during login attempt";
    return next(error);
  }

  // res.json({ message: "Login data received" });
  res.json({
    userId: user.id,
    email: user.email,
    token: token,
  });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { username, email, password, image } = req.body;
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

// export const saveBusiness: RequestHandler = async (req, res, next) => {
//   const { businessId, userId } = req.body;

//   if (!businessId || !userId) {
//     const error = "No data to process";
//     return next(error);
//   }

//   let business;

//   try {
//     business = await BusinessModel.findById(businessId);
//   } catch (err) {
//     const error = "Could not find business";
//     return next(error);
//   }

//   let user;

//   try {
//     user = await UserModel.findById(userId);
//   } catch (err) {
//     const error = "Could not find user";
//     return next(error);
//   }

//   try {
//     user?.businesses.push(businessId);
//     business?.users.push(userId);
//     user?.save();
//     business?.save();
//   } catch (err) {
//     const error = "Could not add business";
//     return next(error);
//   }

//   res.json({ message: "Business saved to dashboard" });
// };
