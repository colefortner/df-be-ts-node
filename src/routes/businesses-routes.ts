import { Router } from "express";

import {
  createBusiness,
  getBusinesses,
  updateBusiness,
  deleteBusiness,
} from "../controllers/businsesses-controller";

const router = Router();

router.post("/", createBusiness);

router.get("/", getBusinesses);

router.patch("/:id", updateBusiness);

router.delete("/:id", deleteBusiness);

export default router;
