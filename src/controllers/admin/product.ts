import ProductService from '../../services/admin/product';
import { ProductInterface } from '../../interfaces/product';
import { Request, Response } from 'express';
import dispatcher from '../../utils/dispatcher';
import { Category } from '../../interfaces/category';
export default class ProductController {
  static async addCategory(req: Request, res: Response) {
    const { body } = req;
    const categoryData: Category = {
      category: body.category,
    };
    try {
      const category = await ProductService.addCategory(categoryData);
      dispatcher.DispatchSuccessMessage(
        res,
        'Category added sucessfully',
        category,
      );
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err);
    }
  }
  static async addProduct(req: Request, res: Response) {
    const { body, files } = req;
    const imageUrls = files
      ? (files as Express.MulterS3.File[]).map((file) => file.location)
      : [];

    const productData: ProductInterface = {
      product_name: body.product_name,
      categories: body.categories,
      images: imageUrls,
      description: body.description,
      price: body.price,
      colors: body.colors,
      size: body.size,
    };

    try {
      const product = await ProductService.addProduct(productData);
      dispatcher.DispatchSuccessMessage(
        res,
        'Product added successfully',
        product,
      );
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err);
    }
  }
  static async getCategory(req: Request, res: Response) {
    try {
      const category = await ProductService.getCategory();
      dispatcher.DispatchSuccessMessage(
        res,
        'Category fetched successfully',
        category,
      );
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err);
    }
  }

  static async getProduct(req: Request, res: Response) {
    try {
      const product = await ProductService.getProduct();
      dispatcher.DispatchSuccessMessage(
        res,
        'Product fetched successfully',
        product,
      );
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err);
    }
  }
}
