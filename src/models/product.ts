import mongoose, { Schema, Document } from 'mongoose';
import { Product as ProductInterface } from '../interfaces/product';

// Define the schema using the User interface
const product = new Schema<ProductDocument>({
  product_name: { type: String, required: true },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: 'Category',
    required: true,
  },
  images: { type: [String], required: true },
  description: { type: String, required: true },
  rating: { type: String },
  price: { type: String },
  colors: { type: [String] },
  size: { type: [String] },
});

interface ProductDocument extends ProductInterface, Document {}
const Product = mongoose.model<ProductDocument>('Product', product);

export default Product;
