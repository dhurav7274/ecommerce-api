// routes/productReviewRouter.js
import express from "express";
import {
  addReview,
  getProductReviews,
  deleteReview,
} from "../controllers/ProductReviewController.js";
import { authenticateUser } from "../middlewares/AuthenticateMiddleware.js";

const ProductReviewRouter = express.Router();

// Add a review to a product
ProductReviewRouter.post("/", authenticateUser, addReview);

// Get all reviews for a product
ProductReviewRouter.get("/:productId", getProductReviews);

// Delete a review
ProductReviewRouter.delete("/:reviewId", authenticateUser, deleteReview);

export { router };


