// routes/cartRouter.js
import express from 'express';
import {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from "../controllers/CartController.js";
import authenticateUser from "../middlewares/AuthenticateMiddleware.js"

const CartRouter = express.Router();

// Add item to cart
router.post('/', authenticateUser, addToCart);

// Get user cart
router.get('/', authenticateUser, getCart);

// Update cart item quantity
router.put('/', authenticateUser, updateCartItem);

// Remove item from cart
router.delete('/', authenticateUser, removeFromCart);

// Clear the cart
router.delete('/clear', authenticateUser, clearCart);

export default CartRouter;
