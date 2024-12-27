// routes/orderRouter.js
// const express = require('express');
import express from "express";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/AuthenticateMiddleware.js";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/OrderController.js";
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const OrderRouter = express.Router();

// Create a new order
OrderRouter.post("/", authenticateUser, createOrder);

// Get all orders for the authenticated user
OrderRouter.get("/", authenticateUser, getUserOrders);

// Get order details by ID for the authenticated user
OrderRouter.get("/:orderId", authenticateUser, getOrderById);

// Update order status (Admin only)
OrderRouter.put(
  "/:orderId/status",
  authenticateUser,
  authorizeAdmin,
  updateOrderStatus
);


export default OrderRouter;
