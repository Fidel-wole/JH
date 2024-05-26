import Category from '../../models/admin/category';
import Product from '../../models/admin/product';

export default class ProductService {
  static async addCategory(data: any) {
    try {
      return await Category.create(data);
    } catch (err: any) {
      throw err;
    }
  }
  static async addProduct(data: any) {
    try {
      return await Product.create(data);
    } catch (err: any) {
      throw err;
    }
  }

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
