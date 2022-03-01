import { RequestHandler } from "express";

import { UserModel } from "../models/user";
import { BusinessModel } from "../models/business";

export const saveBusinessToDashboard: RequestHandler = async (
  req,
  res,
  next
) => {
  const { businessId, userId } = req.body;

  console.log("BUSINESS_ID", businessId);
  console.log(typeof businessId);

  console.log("USER_ID", userId);
  console.log(typeof userId);

  if (!businessId || !userId) {
    const error = "No data to process";
    return next(error);
  }

  let business;

  try {
    business = await BusinessModel.findById(businessId);
  } catch (err) {
    const error = "Could not find business";
    return next(error);
  }

  let user;

  try {
    user = await UserModel.findById(userId);
  } catch (err) {
    const error = "Could not find user";
    return next(error);
  }

  try {
    user?.businesses.push(businessId);
    business?.users.push(userId);
    user?.save();
    business?.save();
  } catch (err) {
    const error = "Could not add business";
    return next(error);
  }

  res.json({ message: "Business saved to dashboard" });
};

export const deleteBusinessFromDashboard: RequestHandler = async (
  req,
  res,
  next
) => {
  const { businessId, userId } = req.body;

  console.log("BUSINESS_ID", businessId);
  console.log(typeof businessId);

  if (!businessId || !userId) {
    const error = "No data to process";
    return next(error);
  }

  let business;

  try {
    business = await BusinessModel.findById(businessId);
  } catch (err) {
    const error = "Could not find business";
    return next(error);
  }

  let user;

  try {
    user = await UserModel.findById(userId);
  } catch (err) {
    const error = "Could not find user";
    return next(error);
  }

  try {
    user?.businesses.splice(user.businesses.indexOf(businessId), 1);
    business?.users.splice(business.users.indexOf(userId), 1);
    user?.save();
    business?.save();
  } catch (err) {
    const error = "Could not delete business";
    return next(error);
  }

  res.json({ message: "Business deleted" });
};
