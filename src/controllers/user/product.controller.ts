import ProductService from '../../services/user/product.service';
import { Request, Response } from 'express';
import dispatcher from '../../utils/dispatcher';
import { CustomRequest } from '../../interfaces/custom-request';

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
  static async rateProduct(req: Request, res: Response) {
    const { productId, rating } = req.body;
    const userId = (req as CustomRequest).userId; // Assuming you have user authentication and user ID is available in req.user


    if (!productId || typeof rating !== 'number') {
   dispatcher.DispatchBadRequestMessage(res, "Product ID and rating are required")
    }else{
    try {
      const product = await ProductService.addRating(productId, userId, rating);
      dispatcher.DispatchSuccessMessage(
        res,
        'Rating added successfully',
        product,
      );
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err);
    }
  }
  }

  static async addProductToCart(req:Request, res:Response){
    const {productId, quantity } = req.body;
    const userId =(req as CustomRequest).userId;
    try {
      const cart = await ProductService.addProductToCart(userId, productId, quantity);
    dispatcher.DispatchSuccessMessage(res, "Product added to cart", cart)
    } catch (error:any) {
     dispatcher.DispatchErrorMessage(res, error.message)
    }
  }

  static async getUserCart(req:Request, res:Response){
    const userId = (req as CustomRequest).userId;
    try{
     const cart = await ProductService.getUserCart(userId);

      dispatcher.DispatchSuccessMessage(res, "Cart fetched sucessfully", cart)
     
    }catch(err:any){
      dispatcher.DispatchErrorMessage(res, err.message)
    }
  }
}
