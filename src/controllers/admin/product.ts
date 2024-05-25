import ProductService from '../../services/admin/product';
import { Product } from '../../interfaces/product';
import { Request, Response } from 'express';
import dispatcher from '../../utils/dispatcher';
import { Category } from '../../interfaces/category';
export default class ProductController {
  static async addCategory(req: Request, res: Response) {
    const { body } = req;
    const categoryData: Category ={
        category:body.service;
    }
    try{
const category = await ProductService.addCategory(categoryData)
dispatcher.DispatchSuccessMessage(
    res,
    'Category added sucessfully',
    category,
  );
    }catch(err:any){
        dispatcher.DispatchErrorMessage(res, err);
    }
  }
  static async addProduct(req: Request, res: Response) {
    const { body } = req;
    const productData: Product = {
      product_name: body.product_name,
      category: body.category,
      description: body.description,
      price: body.price,
      colors: body.colors,
      size: body.size,
    };
    try {
      const product = await ProductService.addProduct(productData);
      dispatcher.DispatchSuccessMessage(
        res,
        'Product added sucessfully',
        product,
      );
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err);
    }
  }
}
