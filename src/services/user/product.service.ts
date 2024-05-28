import Category from '../../models/category';
import Product from '../../models/product';

export default class ProductService {
  static async getCategory() {
    try {
      return await Category.find();
    } catch (err: any) {
      throw err;
    }
  }

  static async getProduct() {
    try {
      return await Product.find();
    } catch (err: any) {
      throw err;
    }
  }

  static async getProductByCategory(categoryId: any) {
    try {
      return await Product.find({ categories: { $in: [categoryId] } });
    } catch (err: any) {
      throw err;
    }
  }

  static async addRating(productId: any, userId: any, rating: number) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }


    // Check if user has already rated the product
    const existingRating = product.ratings!.find((r:any) => r.userId.toString() === userId);

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add a new rating
      product.ratings!.push({ userId, rating });
    }

    // Calculate the average rating
    const totalRatings = product.ratings!.length;
    const sumRatings = product.ratings!.reduce((sum, r) => sum + r.rating, 0);
    product.averageRating = sumRatings / totalRatings;

    await product.save();

    return product;
  }

}
