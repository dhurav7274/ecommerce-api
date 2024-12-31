// routes/addressRouter.js
import express from "express";
import {
  createAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/AddressController.js";
import { authenticateUser } from "../middlewares/AuthenticateMiddleware.js";
const AddressRouter = express.Router();

// Create a new address
AddressRouter.post("/", createAddress);

// Get all addresses for a user
AddressRouter.get("/:userId", authenticateUser, getUserAddresses);

// Update an address
AddressRouter.put("/:addressId", authenticateUser, updateAddress);

// Delete an address
AddressRouter.delete("/:addressId", authenticateUser, deleteAddress);

export { AddressRouter };
