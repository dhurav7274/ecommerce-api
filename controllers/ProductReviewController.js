// controllers/productReviewController.js
import ProductReview from "../models/ProductReviewModel.js";
import product from "../models/ProductsModel.js";

// Add a review to a product
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating) {
      return res
        .status(400)
        .json({ message: "Product ID and rating are required" });
    }

    const existingReview = await ProductReview.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    const review = await ProductReview.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ product: productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await ProductReview.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own reviews" });
    }

    await review.remove();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
