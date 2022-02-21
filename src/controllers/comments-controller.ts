import { RequestHandler } from "express";
import { CommentModel, IComment } from "../models/comment";

export const createComment: RequestHandler = async (req, res, next) => {
  console.log(req.body);

  const { comment } = req.body;

  const createdComment = new CommentModel({
    comment,
  });

  try {
    await createdComment.save();
  } catch (err) {
    const error = Error("Comment creation failed");
    return next(error);
  }

  // res.json({ message: "comment data received" });
  res.status(201).json({ message: "Created comment", createdComment });
};
