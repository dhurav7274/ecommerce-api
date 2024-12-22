// routes/productRouter.js
const express = require('express');
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController.js';

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.get('/', getProducts);

// Get a single product by ID
router.get('/:productId', getProductById);

// Update a product
router.put('/:productId', updateProduct);

// Delete a product
router.delete('/:productId', deleteProduct);

module.exports = router;
