import { Router } from "express";

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comments-controller";

const router = Router();

router.post("/:id", createComment);

router.get("/", getComments);

router.patch("/:id", updateComment);

router.delete("/:id", deleteComment);

export default router;
