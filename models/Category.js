import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please provide a category ID'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  image: {
    type: String,
    default: '/placeholder.svg?height=300&width=300'
  }
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);