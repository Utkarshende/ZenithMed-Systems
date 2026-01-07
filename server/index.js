const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Allows us to receive JSON data
app.use(cors()); // Allows frontend to talk to backend

// Basic Route for Testing
app.get('/', (req, res) => {
    res.send('NexusPharma API is running smoothly...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.magenta.bold);
});