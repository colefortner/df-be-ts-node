import { Router } from "express";

import { createComment } from "../controllers/comments-controller";

const router = Router();

router.post("/", createComment);

router.get("/");

router.patch("/:id");

router.delete("/:id");

export default router;
