import Cart from '../../models/cart';
import Order from '../../models/order';
import { Product } from '../../interfaces/product';

export default class OrderService {
  static async createOrder(userId: string, shippingAddress: string) {
    try {
      const cart = await Cart.findOne({ userId: userId }).populate(
        'items.product',
      );
      if (!cart) {
        throw new Error('Cart not found');
      }

      const items = cart.items.map((item) => {
        const product = item.product as Product; 
        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      });

      const total = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      const order = new Order({
        userId: userId,
        items,
        total,
        status: 'pending',
        shippingAddress,
      });

      await order.save();
      await Cart.findByIdAndDelete(cart._id);

      return order;
    } catch (err: any) {
      throw err.message;
    }
  }
}
