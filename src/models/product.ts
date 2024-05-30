import mongoose, { Schema, Document } from 'mongoose';
import { ProductInterface } from '../interfaces/product';

// Define the schema using the User interface

const ratingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const product = new Schema<ProductDocument>({
  product_name: { type: String, required: true },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: 'Category',
    required: true,
  },
  images: { type: [String], required: true },
  description: { type: String, required: true },
  ratings: { type: [ratingSchema], default: [] }, // Default to an empty array
  averageRating: { type: Number, default: 0 },
  price: { type: Number },
  colors: { type: [String] },
  size: { type: [String] },
});

interface ProductDocument extends ProductInterface, Document {}
const Product = mongoose.model<ProductDocument>('Product', product);

export default Product;
