import { RequestHandler } from "express";

import { Business } from "../models/business";

const businesses: Business[] = [];

export const createBusiness: RequestHandler = (req, res, next) => {
  const text = (req.body as { name: string }).name;
  const newBusiness = new Business(Math.random().toString(), text);

  businesses.push(newBusiness);

  res
    .status(201)
    .json({ message: "Created business", createdBusiness: newBusiness });
};
