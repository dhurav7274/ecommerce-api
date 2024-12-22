// routes/userRouter.js
import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../controllers/UserController.js";
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user profile (protected route)
router.get("/profile", authenticate, getUserProfile);

// Update user profile (protected route)
router.put("/profile", authenticate, updateUserProfile);

// Delete user account (protected route)
router.delete("/profile", authenticate, deleteUserAccount);

module.exports = router;
