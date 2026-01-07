const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please add a medicine name'],
        trim: true,
        index: true // Fast search by name
    },
    composition: { 
        type: String, 
        required: true 
    },
    dosageForm: { 
        type: String, 
        required: true,
        enum: ['Tablet', 'Capsule', 'Injection', 'Syrup', 'Gel', 'Cream', 'Other']
    },
    packaging: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true,
        index: true // Fast filtering by category
    },
    description: { 
        type: String 
    },
    image: { 
        type: String, 
        default: 'no-photo.jpg' 
    },
    isVerified: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Add a Text Index for global search (Name + Composition)
productSchema.index({ name: 'text', composition: 'text' });

module.exports = mongoose.model('Product', productSchema);