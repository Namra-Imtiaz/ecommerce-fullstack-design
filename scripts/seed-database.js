// This script migrates mock data to MongoDB
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

// Mock data
const products = [
  {
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    description: "A comfortable, casual fit t-shirt made from 100% premium cotton. Perfect for everyday wear.",
    category: "headphones",
    stock: 25
  },
  {
    name: "Slim Fit Jeans",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    description: "Modern slim fit jeans with a touch of stretch for comfort. Versatile and stylish for any occasion.",
    category: "camera",
    stock: 15
  },
  // Add all your products here
];

const categories = [
  { id: "headphones", name: "headphones", image: "/placeholder.svg?height=300&width=300" },
  { id: "camera", name: "camera", image: "/placeholder.svg?height=300&width=300" },
  { id: "usb", name: "usb", image: "/placeholder.svg?height=300&width=300" },
  { id: "earpods", name: "earpods", image: "/placeholder.svg?height=300&width=300" }
];

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin"
  },
  {
    name: "Regular User",
    email: "user@example.com",
    password: "user123", // In a real app, this would be hashed
    role: "user"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await Product.insertMany(products);
    await Category.insertMany(categories);
    await User.insertMany(users);
    console.log('Inserted new data');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();