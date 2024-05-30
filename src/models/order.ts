import mongoose, { Schema, Document } from 'mongoose';
import { OrderDocument as OrderInterface} from '../interfaces/order';


const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: 'ShippingAddress',
      required: true,
    },
  },
  { timestamps: true },
);
interface OrderDocument extends OrderInterface, Document {}
const Order = mongoose.model<OrderDocument>(
  'orderSchema',
  orderSchema,
);
export default Order;