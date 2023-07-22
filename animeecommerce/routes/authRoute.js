import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/authController.js";

import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

// protected routes

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
