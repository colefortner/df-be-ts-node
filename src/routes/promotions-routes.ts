import { Router } from "express";

import {
  createPromotion,
  deletePromotion,
  getPromotions,
  updatePromotion,
} from "../controllers/promotions-controller";

const router = Router();

router.post("/:id", createPromotion);

router.get("/:id", getPromotions);

router.patch("/:bid/:pid", updatePromotion);

router.delete("/:bid/:pid", deletePromotion);

export default router;
