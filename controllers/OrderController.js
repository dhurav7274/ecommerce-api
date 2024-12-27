// controllers/orderController.js
import { Order } from '../models/OrdersModel.js';
import { Cart } from '../models/CartModel.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        if (!shippingAddress || !paymentMethod) {
            return res.status(400).json({ message: 'Shipping address and payment method are required' });
        }

        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product', 'name price');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const totalAmount = cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0);

        const order = await Order.create({
            user: req.user._id,
            products: cart.products.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        // Clear the cart after order is placed
        cart.products = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name price');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('products.product', 'name price');

        if (!order || order.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Order not found or access denied' });
        }

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!['Pending', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
