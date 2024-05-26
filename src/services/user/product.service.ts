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
}
