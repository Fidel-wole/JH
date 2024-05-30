import ShippingAddress from '../../models/shippingAddress';

export default class ShippingService {
  static async addShippingAddress(data: any) {
    try {
      let address = await ShippingAddress.findOne({ userId: data.userId });
      if (address) {
        address.address.push({
          street: data.address[0].street,
          building: data.address[0].building,
          landmark: data.address[0].landmark,
          city: data.address[0].city,
          state: data.address[0].state,
          postalCode: data.address[0].postalCode,
          country: data.address[0].country,
        });
        return address;
      } else {
        address = await ShippingAddress.create(data);
      }
      return address;
    } catch (err: any) {
      throw err.message;
    }
  }

  static async getShippingAddress(userId: any) {
    try {
      return await ShippingAddress.findOne({userId:userId});
    } catch (err: any) {
      throw err;
    }
  }
}
