import { Router } from "express";

import { createUser } from "../controllers/users-controller";

const router = Router();

router.post("/", createUser);

router.get("/");

router.patch("/:id");

router.delete("/:id");

export default router;
