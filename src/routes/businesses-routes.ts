import { Router } from "express";

import {
  createBusiness,
  getBusinesses,
} from "../controllers/businsesses-controller";

const router = Router();

router.post("/", createBusiness);

router.get("/", getBusinesses);

router.patch("/:id");

router.delete("/:id");

export default router;
