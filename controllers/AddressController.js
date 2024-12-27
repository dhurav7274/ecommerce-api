// controllers/addressController.js
import { Address } from '../models/AddressModel.js';
import { User } from '../models/UsersModel.js';

// Create a new address
export const createAddress = async (req, res) => {
    try {
        const { userId, houseNo, addressLine, city, state, zipCode, country } = req.body;

        // Validate required fields
        if (!userId || !houseNo|| !addressLine || !city || !state || !zipCode || !country) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the address
        const address = await Address.create({ user: userId, houseNo, addressLine, city, state, zipCode, country });

        // Add address to user's address list
        user.addresses.push(address._id);
        await user.save();

        res.status(201).json({ message: 'Address created successfully', address });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all addresses for a user
export const getUserAddresses = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        const user = await User.findById(userId).populate('addresses');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ addresses: user.addresses });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update an address
export const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const {houseNo, addressLine, city, state, zipCode, country } = req.body;

        // Find and update the address
        const address = await Address.findByIdAndUpdate(
            addressId,
            { houseNo, addressLine, city, state, zipCode, country },
            { new: true, runValidators: true }
        );

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({ message: 'Address updated successfully', address });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete an address
export const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;

        // Find and delete the address
        const address = await Address.findByIdAndDelete(addressId);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Remove address reference from user
        await User.findByIdAndUpdate(address.user, { $pull: { addresses: addressId } });

        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
