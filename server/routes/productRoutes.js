const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productController');

// Define routes
router.route('/').get(getProducts).post(createProduct);

module.exports = router;