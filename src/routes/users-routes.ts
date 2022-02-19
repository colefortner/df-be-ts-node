import { Router } from "express";

import {
  createUser,
  getUsers,
  deleteUser,
} from "../controllers/users-controller";

const router = Router();

router.post("/", createUser);

router.get("/", getUsers);

router.patch("/:id");

router.delete("/:id", deleteUser);

export default router;
