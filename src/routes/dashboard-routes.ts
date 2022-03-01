import { Router } from "express";

import {
  saveBusinessToDashboard,
  deleteBusinessFromDashboard,
} from "../controllers/dashboard-controller";

const router = Router();

router.post("/save-business", saveBusinessToDashboard);

router.delete("/delete-business/:id", deleteBusinessFromDashboard);

export default router;
