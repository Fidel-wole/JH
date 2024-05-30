import mongoose, { Schema } from 'mongoose';
import { ShippingAddress as ShippingAddressInterface } from '../interfaces/shippingAddress';

const AddressSchema = new Schema({
    street: { type: String, required: true },
    building:{type:String},
    landmark:{type:String},
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const shippingAddressSchema = new Schema<ShippingAddressDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address:[AddressSchema]
});

interface ShippingAddressDocument extends ShippingAddressInterface, Document {}
const ShippingAddress = mongoose.model<ShippingAddressDocument>(
  'ShippingAddress',
  shippingAddressSchema,
);
export default ShippingAddress;
