import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price must be a positive number']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description']
  },
  image: {
    type: String,
    default: '/placeholder.svg?height=400&width=400'
  },
  category: {
    type: String,
    required: [true, 'Please specify a category']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);