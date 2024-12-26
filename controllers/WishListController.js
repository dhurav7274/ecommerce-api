// controllers/wishlistController.js
import { Wishlist } from "../models/WishListModel.js";
import { Product } from "../models/ProductsModel.js";

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (wishlist && wishlist.products.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        if (!wishlist) {
            await Wishlist.create({ user: req.user._id, products: [productId] });
        } else {
            wishlist.products.push(productId);
            await wishlist.save();
        }

        res.status(201).json({ message: 'Product added to wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get user wishlist
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products', 'name price imageUrl');

        if (!wishlist || wishlist.products.length === 0) {
            return res.status(404).json({ message: 'Wishlist is empty' });
        }

        res.status(200).json({ wishlist: wishlist.products });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist || !wishlist.products.includes(productId)) {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }

        wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
        await wishlist.save();

        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
