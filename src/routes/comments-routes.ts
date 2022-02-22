import { Router } from "express";

import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comments-controller";

const router = Router();

router.post("/", createComment);

router.get("/", getComments);

router.patch("/:id");

router.delete("/:id", deleteComment);

export default router;
