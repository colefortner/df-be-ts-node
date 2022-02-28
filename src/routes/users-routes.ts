import { Router } from "express";
import { fileUpload } from "../middleware/file-upload";

import {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser,
  saveBusinessToDashboard,
  deleteBusinessFromDashboard,
} from "../controllers/users-controller";

const router = Router();

router.post("/", fileUpload.single("image"), createUser);

router.post("/login", loginUser);

router.post("/save-business", saveBusinessToDashboard);

router.get("/", getUsers);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.delete("/delete-business/:id", deleteBusinessFromDashboard);

export default router;
