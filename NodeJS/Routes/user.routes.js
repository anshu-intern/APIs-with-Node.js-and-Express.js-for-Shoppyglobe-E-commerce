import express from "express";
import { checkExistingUser, errorHandler, invalidRoute, validateLoginInput, validateRegisterInput } from "../Middleware/user.middleware.js";
import { loginUser, registerUser } from "../Controller/user.controller.js";

const router = express.Router();

//user routes
router.post("/register", validateRegisterInput, checkExistingUser, registerUser);
router.post("/login", validateLoginInput, loginUser);

// Catch undefined routes
router.use(invalidRoute);

// Global error handler
router.use(errorHandler);

export default router;