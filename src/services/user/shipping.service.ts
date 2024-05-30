import ShippingAddress from "../../models/shippingAddress";

export default class ShippingService{
    static async addShippingAddress(data:any){
        try{
            return await ShippingAddress.create(data)
        }catch(err:any){
            throw err
        }
    }
}