// routes/categoryRouter.js
const express = require('express');
import{
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../controllers/CategoryController.js';

const CategoryRouter = express.Router();

// Create a new category
CategoryRouter.post('/', createCategory);

// Get all categories
CategoryRouter.get('/', getCategories);

// Get a single category by ID
CategoryRouter.get('/:categoryId', getCategoryById);

// Update a category
CategoryRouter.put('/:categoryId', updateCategory);

// Delete a category
CategoryRouter.delete('/:categoryId', deleteCategory);

export default CategoryRouter;
