import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import {
  register,
  login,
  logout,
  current,
} from "../controllers/authController.js";
import { auth } from "../helpers/authMiddleware.js";

const router = express.Router();
router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", auth, logout);
router.get("/current", auth, current);
export default router;
