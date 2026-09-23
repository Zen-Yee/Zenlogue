import express from "express";
import * as authController from "./auth.controller.js";

const router = express.Router();

router.post("/signup", authController.signupSubmit); //Submit sign up credentials
router.post("/login", authController.loginSubmit); // Submit login in credentials
router.post("/logout", authController.logout); //logout & clear session

export default router;
