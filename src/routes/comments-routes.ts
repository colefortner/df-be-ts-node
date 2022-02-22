import { Router } from "express";

import { createComment, getComments } from "../controllers/comments-controller";

const router = Router();

router.post("/", createComment);

router.get("/", getComments);

router.patch("/:id");

router.delete("/:id");

export default router;
