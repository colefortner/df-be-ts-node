import { RequestHandler } from "express";

import { Business } from "../models/business";

const BUSINESSES: Business[] = [];

export const createBusiness: RequestHandler = (req, res, next) => {
  const text = (req.body as { name: string }).name;
  const newBusiness = new Business(Math.random().toString(), text);

  BUSINESSES.push(newBusiness);

  res
    .status(201)
    .json({ message: "Created business", createdBusiness: newBusiness });
};

export const getBusinesses: RequestHandler = (req, res, next) => {
  res.json({ businesses: BUSINESSES });
};
