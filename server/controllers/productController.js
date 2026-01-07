const Product = require('../models/Product');

// @desc    Fetch all medicines with search & category filter
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const pageSize = 8; // Products per page
        const page = Number(req.query.pageNumber) || 1;

        const { search, category } = req.query;
        let query = {};

        if (search) {
            query.$text = { $search: search };
        }
        if (category && category !== 'All') {
            query.category = category;
        }

        const count = await Product.countDocuments(query); // Total matching products
        const products = await Product.find(query)
            .limit(pageSize)
            .skip(pageSize * (page - 1)) // Skip products from previous pages
            .sort({ createdAt: -1 });

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
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