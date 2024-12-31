import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/UsersModel.js";
import rateLimit from "express-rate-limit";
import { generateToken } from "../middlewares/Auth.Middleware.js";
// Rate limiter to prevent brute force attacks
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windows
  message: "Too many login attempts. Please try again later.",
});

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
export const loginUser = [
  loginRateLimiter,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const playload = { id: user._id, isAdmin: user.isAdmin };
      const token = generateToken(playload);
      // set
      const cookieOptions = {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: true, // Ensures the cookie is only sent over HTTPS
        maxAge: 1 * 60 * 60 * 1000, // Cookie expiry in milliseconds (e.g., 1 day)
      };

      res.cookie("authToken", token, cookieOptions);
      res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  },
];

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("addresses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find the user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete user account
export const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout user
export const logoutUser = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Optional: Blacklist the token (if blacklisting is implemented)
    await TokenBlacklist.create({ token });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
