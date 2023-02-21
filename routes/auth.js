import express from "express";
import authController from "../controllers/auth.js";
const router = express.Router()

// CRETAE USER
router.post("/signup",authController.signup)

// SINGIN USER
router.post("/signin", authController.signin)

export default router;