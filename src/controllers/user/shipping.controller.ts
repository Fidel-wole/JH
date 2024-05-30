import { Request, Response } from 'express';
import ShippingService from '../../services/user/shipping.service';
import { ShippingAddress, Address } from '../../interfaces/shippingAddress';
import { CustomRequest } from '../../interfaces/custom-request';
import dispatcher from '../../utils/dispatcher';
export default class ShippingController {
  static async addShippingAddress(req: Request, res: Response) {
    const userId = (req as CustomRequest).userId;
    const { street, building, landmark, city, state, postalCode, country } =
      req.body;
    const address: Address = {
      street,
      building,
      landmark,
      city,
      state,
      postalCode,
      country,
    };

    const shippingAddressData: ShippingAddress = {
      userId,
      address: [address],
    };

    try {
      const shippingAddress =
        await ShippingService.addShippingAddress(shippingAddressData);
      dispatcher.DispatchSuccessMessage(
        res,
        'Shipping address added',
        shippingAddress,
      );
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err);
    }
  }

  static async getShippingAddress(req:Request, res:Response){
    const userId = (req as CustomRequest).userId;
    try{
    const shippingAddress = await ShippingService.getShippingAddress(userId);
    dispatcher.DispatchSuccessMessage(res, "Shipping address fetched sucessfully", shippingAddress)
    }catch(err:any){
   dispatcher.DispatchErrorMessage(res, err);
    }
  }
}
