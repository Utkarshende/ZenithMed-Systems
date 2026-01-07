const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Added for terminal styling
const connectDB = require('./config/db'); // Ensure this points to your db config
const Product = require('./models/Product'); // Ensure this points to your model

// Load env vars
dotenv.config();

const sampleProducts = [
  {
    name: "Nexium 40mg",
    category: "General",
    composition: "Esomeprazole Magnesium",
    packaging: "10x14 Tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600"
  },
  {
    name: "Taxotere 80mg",
    category: "Oncology",
    composition: "Docetaxel Injection",
    packaging: "Single Vial",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=600"
  },
  {
    name: "Lipitor 20mg",
    category: "Cardiology",
    composition: "Atorvastatin Calcium",
    packaging: "3x10 Tablets",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f159f8a0?q=80&w=600"
  },
  {
    name: "Augmentin 625",
    category: "Antibiotics",
    composition: "Amoxycillin & Potassium Clavulanate",
    packaging: "1x10 Tablets",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=600"
  },
  {
    name: "Zytiga 250mg",
    category: "Oncology",
    composition: "Abiraterone Acetate",
    packaging: "120 Tablets",
    image: "https://images.unsplash.com/photo-1471864190281-ad599f583b33?q=80&w=600"
  },
  {
    name: "Concor 5mg",
    category: "Cardiology",
    composition: "Bisoprolol Fumarate",
    packaging: "10x10 Tablets",
    image: "https://images.unsplash.com/photo-1550572017-ed20015ade0a?q=80&w=600"
  },
  {
    name: "Azithral 500",
    category: "Antibiotics",
    composition: "Azithromycin IP",
    packaging: "1x5 Tablets",
    image: "https://images.unsplash.com/photo-1576071804486-b8bc22106dbf?q=80&w=600"
  },
  {
    name: "Renvela 800",
    category: "Nephrology",
    composition: "Sevelamer Carbonate",
    packaging: "30 Tablets",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=600"
  },
  {
    name: "Herceptin 440",
    category: "Oncology",
    composition: "Trastuzumab Injection",
    packaging: "Multi-dose Vial",
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=600"
  },
  {
    name: "Dolo 650",
    category: "General",
    composition: "Paracetamol IP",
    packaging: "15 Tablets",
    image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=600"
  }
];

const importData = async () => {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Clear existing data to avoid duplicates
    await Product.deleteMany();
    console.log('Existing Data Destroyed...'.red.inverse);

    // 3. Insert Sample Data
    await Product.insertMany(sampleProducts);
    console.log('Database Seeded Successfully! 🌱'.green.inverse);

    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`.red.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Check for command line arguments (e.g., node seeder -d to destroy)
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}