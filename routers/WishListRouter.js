// routes/wishlistRouter.js
import express from 'express';
import {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} from '../controllers/WishListController.js';
import{ authenticateUser } from '../middlewares/AuthenticateMiddleware.js';

const router = express.Router();

// Add product to wishlist
router.post('/', authenticateUser, addToWishlist);

// Get user wishlist
router.get('/', authenticateUser, getWishlist);

// Remove product from wishlist
router.delete('/:productId', authenticateUser, removeFromWishlist);

module.exports = router;
