// models/ProductReview.js
import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product reference is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    comment: {
        type: String,
        trim: true,
        maxlength: [500, 'Comment cannot exceed 500 characters']
    }
}, { timestamps: true });

const ProductReview = mongoose.model('ProductReview', productReviewSchema);
export {ProductReview}
