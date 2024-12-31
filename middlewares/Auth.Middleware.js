// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { User } from "../models/UsersModel.js";

// Authenticate user middleware
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        success: false,
        message: "Authentication failed",
        error: error.message,
      });
  }
};

// Authorize admin middleware
export const authorizeAdmin = (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const generateToken = (payLoad) => {
  const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });

  return token;
};
