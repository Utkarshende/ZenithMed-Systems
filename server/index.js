const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db'); // Import the DB function
const productRoutes = require('./routes/productRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');


dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/products', productRoutes);
app.use('/api/inquiry', inquiryRoutes);

app.get('/', (req, res) => {
    res.send('NexusPharma API is running smoothly...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold);
});