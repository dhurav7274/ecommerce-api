// routes/wishlistRouter.js
import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/WishListController.js";
import { authenticateUser } from "../middlewares/AuthenticateMiddleware.js";

const WishListRouter = express.Router();

// Add product to wishlist
WishListRouter.post("/", authenticateUser, addToWishlist);

// Get user wishlist
WishListRouter.get("/", authenticateUser, getWishlist);

// Remove product from wishlist
WishListRouter.delete("/:productId", authenticateUser, removeFromWishlist);

export default WishListRouter;
