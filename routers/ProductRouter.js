// routes/productRouter.js
const express = require('express');
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController.js';

const ProductRouter = express.Router();

// Create a new product
ProductRouter.post('/', createProduct);

// Get all products
ProductRouter.get('/', getProducts);

// Get a single product by ID
ProductRouter.get('/:productId', getProductById);

// Update a product
ProductRouter.put('/:productId', updateProduct);

// Delete a product
ProductRouter.delete('/:productId', deleteProduct);

export default ProductRouter;
