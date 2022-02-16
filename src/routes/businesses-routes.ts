import { Router } from "express";

import { createBusiness } from "../controllers/businsesses-controller";

const router = Router();

router.post("/", createBusiness);

router.get("/");

router.patch("/:id");

router.delete("/:id");

export default router;
