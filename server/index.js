const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

const app = express();

// 3. Middlewares
app.use(cors()); // Allows your React frontend to talk to this server
app.use(express.json()); // Allows server to accept JSON data (for Add/Edit product)

// 4. API Routes
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);

// 5. Root Route (For Testing)
app.get('/', (req, res) => {
  res.send('Nexus Pharma API is running...');
});

// 6. Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});