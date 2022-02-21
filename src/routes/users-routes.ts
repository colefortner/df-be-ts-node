import { Router } from "express";
import { fileUpload } from "../middleware/file-upload";

import {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/users-controller";

const router = Router();

router.post("/", fileUpload.single("image"), createUser);

router.post("/login", loginUser);

router.get("/", getUsers);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
