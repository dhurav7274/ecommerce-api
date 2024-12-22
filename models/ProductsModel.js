import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'], 
        trim: true, 
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: { 
        type: String, 
        maxlength: [500, 'Description cannot exceed 500 characters'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'], 
        min: [0, 'Price cannot be negative']
    },
    stock: { 
        type: Number, 
        required: [true, 'Stock is required'], 
        min: [0, 'Stock cannot be negative']
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: [true, 'Category reference is required']
    },
    imageUrl: { 
        type: String, 
        match: [/^https?:\/\/.+/, 'Please enter a valid URL']
    }
}, { timestamps: true });

const Product = mongoose.model("Products", productSchema);
export { Product };
