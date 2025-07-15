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

import {
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/verifyController.js";

import {
  registerSchema,
  loginSchema,
  resendVerifySchema,
} from "../schemas/authSchemas.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validateBody(resendVerifySchema), resendVerifyEmail);

router.post("/login", validateBody(loginSchema), login);

router.post("/logout", auth, logout);

router.get("/current", auth, current);

router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

export default router;
