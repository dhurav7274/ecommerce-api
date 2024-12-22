// controllers/categoryController.js
import {Category} from '../models/CategorisModel.js'

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category with this name already exists' });
        }

        // Create the category
        const category = await Category.create({ name, description });
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;

        const category = await Category.findByIdAndUpdate(
            categoryId,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
