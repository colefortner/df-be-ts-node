import { RequestHandler } from "express";
import mongoose from "mongoose";

import { BusinessModel, IBusiness } from "../models/business";

const BUSINESSES: IBusiness[] = [];

export const createBusiness: RequestHandler = async (req, res, next) => {
  const { name, image, rating, location } = req.body;

  const createdBusiness = new BusinessModel({
    name,
    image,
    rating,
    location,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdBusiness.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(201).json({ message: "Created business", createdBusiness });
};

export const getBusinesses: RequestHandler = async (req, res, next) => {
  let businesses;
  try {
    businesses = await BusinessModel.find({});
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.json({
    businesses: businesses.map((business) =>
      business.toObject({ getters: true })
    ),
  });
};

export const updateBusiness: RequestHandler = async (req, res, next) => {
  const { name, image, rating, location } = req.body;
  const businessId = req.params.id;

  let business;

  try {
    business = await BusinessModel.findById(businessId);
  } catch (err) {
    console.log(err);
    return next();
  }

  if (!business) {
    throw new Error("Could not find business");
  }

  business.name = name;
  business.rating = rating;

  try {
    await business?.save();
  } catch (err) {
    console.log(err);
    return next();
  }

  res.status(200).json({ business: business.toObject({ getters: true }) });
};

export const deleteBusiness: RequestHandler = async (req, res, next) => {
  const businessId = req.params.id;

  let business;

  try {
    business = await BusinessModel.findById(businessId);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  if (!business) {
    throw new Error("Could not find business");
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await business.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(err);
  }
  res.json({ message: "Business deleted!" });
};
