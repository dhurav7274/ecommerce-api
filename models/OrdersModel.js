const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'User reference is required'] 
    },
    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: [true, 'Product reference is required'] 
            },
            quantity: { 
                type: Number, 
                required: [true, 'Quantity is required'], 
                min: [1, 'Quantity must be at least 1']
            }
        }
    ],
    totalAmount: { 
        type: Number, 
        required: [true, 'Total amount is required'], 
        min: [0, 'Total amount cannot be negative']
    },
    status: { 
        type: String, 
        default: 'Pending', 
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled']
    },
    shippingAddress: { 
        type: String, 
        required: [true, 'Shipping address is required'], 
        trim: true, 
        maxlength: [100, 'Shipping address cannot exceed 100 characters']
    },
    paymentMethod: { 
        type: String, 
        required: [true, 'Payment method is required'], 
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery']
    }
}, { timestamps: true });