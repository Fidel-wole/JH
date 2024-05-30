import { Request, Response } from 'express';
import OrderService from '../../services/user/order.service';
import { CustomRequest } from '../../interfaces/custom-request';
import dispatcher from '../../utils/dispatcher';

export default class OrderController {
  static async createOrder(req: Request, res: Response) {
    const userId = (req as CustomRequest).userId;
    const { shippingAddress } = req.body;
    try {
      const order = await OrderService.createOrder(userId, shippingAddress);
      dispatcher.DispatchSuccessMessage(res, 'Order placed sucessfully', order);
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err);
    }
  }
}
