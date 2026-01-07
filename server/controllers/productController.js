const Product = require('../models/Product');

// @desc    Fetch all medicines with search & category filter
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        // If user searches for a specific name or salt/composition
        if (search) {
            query.$text = { $search: search };
        }

        // If user filters by category (e.g., Oncology)
        if (category) {
            query.category = category;
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error: Could not fetch products" });
    }
};

// @desc    Add a new medicine (For your Admin testing)
// @route   POST /api/products
// @access  Private/Admin (We will add auth later)
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getProducts, createProduct };