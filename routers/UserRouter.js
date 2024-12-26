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

const UserRouter = express.Router();

// Register a new user
UserRouter.post("/register", registerUser);

// Login user
UserRouter.post("/login", loginUser);

// Get user profile (protected route)
UserRouter.get("/profile", authenticate, getUserProfile);

// Update user profile (protected route)
UserRouter.put("/profile", authenticate, updateUserProfile);

// Delete user account (protected route)
UserRouter.delete("/profile", authenticate, deleteUserAccount);

module.exports = router;
