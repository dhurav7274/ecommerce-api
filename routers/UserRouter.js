// routes/userRouter.js
import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../controllers/UserController.js";

import {authenticateUser} from "../middlewares/AuthenticateMiddleware.js"
const UserRouter = express.Router();

// Register a new user
UserRouter.post("/register", registerUser);

// Login user
UserRouter.post("/login", loginUser);

// Get user profile (protected route)
UserRouter.get("/profile", authenticateUser, getUserProfile);

// Update user profile (protected route)
UserRouter.put("/profile", authenticateUser, updateUserProfile);

// Delete user account (protected route)
UserRouter.delete("/profile", authenticateUser, deleteUserAccount);

export default UserRouter;
