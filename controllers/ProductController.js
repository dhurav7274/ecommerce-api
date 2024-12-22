// controllers/productController.js
import { Product } from "../models/ProductsModel.js";
import { Category } from "../models/CategorisModel.js";

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    // Validate required fields
    if (!name || !price || !stock || !category) {
      return res
        .status(400)
        .json({ message: "Name, price, stock, and category are required" });
    }

    // Check if the category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Create the product
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate(
      "category",
      "name"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;

    // Validate if the category exists
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, stock, category, imageUrl },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
