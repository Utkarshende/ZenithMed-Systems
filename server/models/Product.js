const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a medicine name'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Oncology', 'Cardiology', 'Antibiotics', 'Nephrology', 'General', 'Gastroenterology']
    },
    composition: {
      type: String,
      required: [true, 'Please add the salt composition']
    },
    packaging: {
      type: String,
      required: [true, 'Please add packaging details']
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=600'
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;