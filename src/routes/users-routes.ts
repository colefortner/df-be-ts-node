import { Router } from "express";
import { fileUpload } from "../middleware/file-upload";

import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/users-controller";

const router = Router();

router.post("/", fileUpload.single("image"), createUser);

router.get("/", getUsers);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
