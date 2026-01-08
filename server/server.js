const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING');

// 2. Define Medicine Schema
const medicineSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String
});

const Medicine = mongoose.model('Medicine', medicineSchema);

// 3. Search API Route (Crucial for 10k items)
app.get('/api/medicines', async (req, res) => {
  const { query } = req.query;
  try {
    // This performs a "Fuzzy Search" in the database
    const results = await Medicine.find({
      name: { $regex: query, $options: 'i' }
    }).limit(20); // Only return 20 items to keep it fast
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));