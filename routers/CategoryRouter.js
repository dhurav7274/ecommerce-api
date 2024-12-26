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
router.post('/', createCategory);

// Get all categories
router.get('/', getCategories);

// Get a single category by ID
router.get('/:categoryId', getCategoryById);

// Update a category
router.put('/:categoryId', updateCategory);

// Delete a category
router.delete('/:categoryId', deleteCategory);

export default CategoryRouter;
