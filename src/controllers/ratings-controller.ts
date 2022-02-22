import { RequestHandler } from "express";
import { RatingModel, IRating } from "../models/rating";

export const createRating: RequestHandler = async (req, res, next) => {
  console.log(req.body);

  const { rating } = req.body;

  const createdRating = new RatingModel({
    rating,
  });

  try {
    await createdRating.save();
  } catch (err) {
    const error = Error("Comment creation failed");
    return next(error);
  }

  // res.json({ message: "comment data received" });
  res.status(201).json({ message: "Rating data recieved", createdRating });
};
