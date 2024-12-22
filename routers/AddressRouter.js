// routes/addressRouter.js
import express from 'express'
import { createAddress, getUserAddresses, updateAddress, deleteAddress } from '../controllers/AddressContoller.js'

const AddressRouter = express.Router();

// Create a new address
AddressRouter.post('/', createAddress);

// Get all addresses for a user
AddressRouter.get('/:userId', getUserAddresses);

// Update an address
AddressRouter.put('/:addressId',updateAddress);

// Delete an address
AddressRouter.delete('/:addressId',deleteAddress);

export default AddressRouter;
