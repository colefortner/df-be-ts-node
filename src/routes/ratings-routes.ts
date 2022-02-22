import { Router } from "express";

import { createRating } from "../controllers/ratings-controller";

const router = Router();

router.post("/", createRating);

router.get("/");

router.patch("/:id");

router.delete("/:id");

export default router;
