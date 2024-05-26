import ProductService from '../../services/user/product.service';
import { Request, Response } from 'express';
import dispatcher from '../../utils/dispatcher';

export default class ProductController {
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

  static async getProductByCategory(req: Request, res: Response) {
    const { categoryId } = req.params;
    try {
      const product = await ProductService.getProductByCategory(categoryId);
      if (product.length === 0) {
        dispatcher.DispatchErrorMessage(res, 'No product found');
      } else {
        dispatcher.DispatchSuccessMessage(
          res,
          'Product fetched successfully',
          product,
        );
      }
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err);
    }
  }
}
