const mongoose = require('mongoose');
require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`); // Removed .cyan.underline
  } catch (error) {
    console.error(`❌ Error: ${error.message}`); // Removed .red.bold
    process.exit(1);
  }
};