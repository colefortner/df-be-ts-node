import { RequestHandler } from "express";
import { BusinessModel, IBusiness } from "../models/business";
import { UserModel } from "../models/user";

export const getComments: RequestHandler = async (req, res, next) => {
  const businessId = req.params.id;
  // const commentDate = new Date();
  // console.log(date);
  // console.log(date.toLocaleDateString());

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

  const { userId, comment, rating } = req.body;

  let business;
  let user;

  const commentDate = new Date();

  try {
    business = await BusinessModel.findById(businessId);
    user = await UserModel.findById(userId);
  } catch (err) {
    const error = "Could not find business";
    return next(error);
  }

  const createdComment = {
    userId,
    comment,
    commentDate: commentDate,
    rating,
    avatar: user?.image,
    username: user?.username,
  };

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

export const deleteComment: RequestHandler = async (req, res, next) => {
  const businessId = req.params.bid;
  const commentId = req.params.cid;

  let business: (IBusiness & { _id: any }) | null;

  business = await BusinessModel.findById(businessId);

  let filtered_comment = business?.comments.map((comment, index) => {
    if (comment.id === commentId) {
      business?.comments.splice(index, 1);
      return comment;
    }
  });

  business?.save();

  res.json({ message: "Commnet deleted!", comment: filtered_comment });
};

export const updateComment: RequestHandler = async (req, res, next) => {
  const { comment, rating } = req.body;
  const businessId = req.params.bid;
  const commentId = req.params.cid;

  console.log(rating, comment);

  let business: (IBusiness & { _id: any }) | null;

  try {
    business = await BusinessModel.findById(businessId);
  } catch (err) {
    console.log(err);
    return next();
  }

  if (!business) {
    throw new Error("Could not find business");
  }

  let filtered_comment = business?.comments.map((mapcomment, index) => {
    if (mapcomment.id === commentId && business) {
      business.comments[index].comment = comment;
      business.comments[index].rating = rating;
    }
    return comment;
  });

  business?.save();

  res.json({
    message: "Comment updated",
    commentData: { comment, businessId, blah: filtered_comment },
  });

  // res.status(200).json({ business: business.toObject({ getters: true }) });
};
