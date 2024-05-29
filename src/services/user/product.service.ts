import Category from '../../models/category';
import Product from '../../models/product';
import Cart from '../../models/cart';
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


    // Check if user has already rated the product
    const existingRating = product!.ratings!.find((r:any) => r.userId.toString() === userId);

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add a new rating
      product!.ratings!.push({ userId, rating });
    }

    // Calculate the average rating
    const totalRatings = product!.ratings!.length;
    const sumRatings = product!.ratings!.reduce((sum, r) => sum + r.rating, 0);
    product!.averageRating = sumRatings / totalRatings;

    await product!.save();

    return product;
  }
   
  static async addProductToCart(userId: string, productId: string, quantity: number){
    try{
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
  
    let cart = await Cart.findOne({ user: userId });
  
    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      cart = await cart.save();
    } else {
      cart = await Cart.create({
        userId: userId,
        items: [{ product: productId, quantity }],
      });
    }
  
    return cart;
  }catch(err:any){
    throw err
  }
  }

  static async getUserCart(userId:any){
    try{
      const cart = await Cart.findOne({userId:userId}).populate('items.product')
     if(!cart){
      throw new Error("Cart not found")
     }
     return cart
    }catch(err:any){
      throw err
    }
  }
}

