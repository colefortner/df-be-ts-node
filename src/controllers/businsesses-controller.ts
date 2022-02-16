import { RequestHandler } from "express";

import { Business } from "../models/business";

const BUSINESSES: Business[] = [];

export const createBusiness: RequestHandler = (req, res, next) => {
  const text = (req.body as { name: string }).name;
  let id = 0;
  const newBusiness = new Business(Math.random().toString(), text);

  BUSINESSES.push(newBusiness);

  res
    .status(201)
    .json({ message: "Created business", createdBusiness: newBusiness });
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

  BUSINESSES[businessIndex] = new Business(
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
