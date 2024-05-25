import mongoose, { Schema, Document } from 'mongoose';
import { Category as CategoryInterface } from '../../interfaces/category';
const category = new Schema<CategoryDocument>({
    category: { type: String, required: true },
});

interface CategoryDocument extends CategoryInterface, Document {}
const Category = mongoose.model<CategoryDocument>('Category', category);

export default Category;
