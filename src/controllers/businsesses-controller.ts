import { RequestHandler } from "express";
import mongoose from "mongoose";

import { BusinessModel, IBusiness } from "../models/business";

const BUSINESSES: IBusiness[] = [];

export const createBusiness: RequestHandler = async (req, res, next) => {
  // const text = (req.body as { name: string }).name;
  // let id = 0;
  // const newBusiness = new BusinessModel(Math.random().toString(), text);

  // BUSINESSES.push(newBusiness);
  const { id, name, image, rating, location } = req.body;

  const createdBusiness = new BusinessModel({
    id,
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

export const getBusinesses: RequestHandler = (req, res, next) => {
  res.json({ businesses: BUSINESSES });
};

export const updateBusiness: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const businessId = req.params.id;
  const updatedName = (req.body as { name: string }).name;

  const businessIndex = BUSINESSES.findIndex(
    (business) => business.id === businessId
  );

  if (businessIndex < 0) {
    throw new Error("Could not find business");
  }

  BUSINESSES[businessIndex] = new BusinessModel(
    BUSINESSES[businessIndex].id,
    updatedName
  );

  res.json({ message: "Updated", updatedBusiness: BUSINESSES[businessIndex] });
};

export const deleteBusiness: RequestHandler = (req, res, next) => {
  const businessId = req.params.id;

  const businessIndex = BUSINESSES.findIndex(
    (business) => business.id === businessId
  );

  if (businessIndex < 0) {
    throw new Error("Could not find business");
  }
  BUSINESSES.splice(businessIndex, 1);

  res.json({ message: "Business deleted!" });
};
