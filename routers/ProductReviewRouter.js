// routes/productReviewRouter.js
import express from "express";
import {
  addReview,
  getProductReviews,
  deleteReview,
} from "../controllers/ProductReviewController.js";
import { authenticateUser } from "../middlewares/AuthenticateMiddleware.js";

const router = express.Router();

// Add a review to a product
router.post("/", authenticateUser, addReview);

// Get all reviews for a product
router.get("/:productId", getProductReviews);

// Delete a review
router.delete("/:reviewId", authenticateUser, deleteReview);

export { router };
