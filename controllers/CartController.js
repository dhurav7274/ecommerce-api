// controllers/cartController.js
import { Cart } from "../models/CartModel.js";
import { Product } from "./ProductController.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate product ID and quantity
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if cart exists for user
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Create new cart
      cart = new Cart({ user: req.user._id, products: [] });
    }

    // Check if product is already in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex >= 0) {
      // Update quantity of existing product
      cart.products[productIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "name price"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex >= 0) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        // Remove product if quantity is 0
        cart.products.splice(productIndex, 1);
      }

      await cart.save();
      res.status(200).json({ message: "Cart updated successfully", cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
