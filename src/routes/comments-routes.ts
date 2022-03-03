import { Router } from "express";

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comments-controller";

const router = Router();

router.post("/:id", createComment);

router.get("/:id", getComments);

router.patch("/:id", updateComment);

router.delete("/:bid/:cid", deleteComment);

export default router;
