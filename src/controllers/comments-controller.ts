import { RequestHandler } from "express";
import { BusinessModel } from "../models/business";
import { CommentModel } from "../models/comment";

export const getComments: RequestHandler = async (req, res, next) => {
  const businessId = req.params.id;

  let business;
  try {
    business = await BusinessModel.findById(businessId);
  } catch (err) {
    const error = "Could not find businesss";
    next(error);
  }

  res.json({
    comments: business?.comments.map((comment) => comment),
  });
};

export const createComment: RequestHandler = async (req, res, next) => {
  console.log(req.body);

  const businessId = req.params.id;

  const { userId, comment } = req.body;

  const createdComment = {
    userId,
    comment,
  };

  let business;

  try {
    business = await BusinessModel.findById(businessId);
  } catch (err) {
    const error = "Could not find business";
    return next(error);
  }

  try {
    business?.comments.push(createdComment);
    await business?.save();
  } catch (err) {
    const error = Error("Comment creation failed");
    return next(error);
  }

  // res.json({ message: "comment data received" });
  res.status(201).json({ message: "Created comment", createdComment });
};

export const updateComment: RequestHandler = async (req, res, next) => {
  const { comment } = req.body;

  const commentId = req.params.id;

  let commentt;

  try {
    commentt = await CommentModel.findById(commentId);
  } catch (err) {
    const error = "Could not find comment";
    return next(error);
  }

  if (!commentt) {
    throw new Error("Could not find comment");
  }

  commentt.comment = comment;

  try {
    await commentt?.save();
  } catch (err) {
    const error = "Could not save comment update";
    return next(error);
  }

  res.status(200).json({ comment: commentt.toObject({ getters: true }) });
};

export const deleteComment: RequestHandler = async (req, res, next) => {
  const commentId = req.params.id;

  let comment;

  try {
    comment = await CommentModel.findById(commentId);
  } catch (err) {
    const error = "Could not find comment";
    return next(error);
  }

  if (!comment) {
    throw new Error("Could not find error");
  }

  try {
    await comment.remove();
  } catch (err) {
    const error = "Could not delete comment";
    return next(error);
  }

  res.json({ message: "Commnet deleted!" });
};
