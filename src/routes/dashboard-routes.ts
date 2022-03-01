import { Router } from "express";

import {
  getDashboardBusinesses,
  saveBusinessToDashboard,
  deleteBusinessFromDashboard,
} from "../controllers/dashboard-controller";

const router = Router();

router.get("/:id", getDashboardBusinesses);
router.post("/save-business", saveBusinessToDashboard);

router.delete("/delete-business/:id", deleteBusinessFromDashboard);

export default router;
