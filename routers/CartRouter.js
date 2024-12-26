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
CartRouter.post('/', authenticateUser, addToCart);

// Get user cart
CartRouter.get('/', authenticateUser, getCart);

// Update cart item quantity
CartRouter.put('/', authenticateUser, updateCartItem);

// Remove item from cart
CartRouter.delete('/', authenticateUser, removeFromCart);

// Clear the cart
CartRouter.delete('/clear', authenticateUser, clearCart);

export default CartRouter;
