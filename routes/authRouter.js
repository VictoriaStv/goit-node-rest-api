import express from "express";
import validateBody from "../helpers/validateBody.js";
import { upload } from "../helpers/upload.js";
import { auth } from "../helpers/authMiddleware.js";
import {
  register,
  login,
  logout,
  current,
  updateAvatar,
} from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", auth, logout);
router.get("/current", auth, current);

router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

export default router;
