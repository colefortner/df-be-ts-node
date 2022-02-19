import { Router } from "express";

import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/users-controller";

const router = Router();

router.post("/", createUser);

router.get("/", getUsers);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
