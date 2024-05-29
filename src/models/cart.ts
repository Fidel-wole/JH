import mongoose, { Schema, Document } from 'mongoose';
import { Cart as CartInterface } from '../interfaces/cart';
import { CartItem as CartItemInterface } from '../interfaces/cart';
const CartItemSchema = new Schema<CartItemDocument>({
    product:{type:Schema.Types.ObjectId, ref:"Product"},
    quantity:{type:Number, required:true}
})
const cart = new Schema<CartDocument>({
    userId: { type: String, required: true },
    items:[CartItemSchema]
});

interface CartItemDocument extends CartItemInterface, Document {}
interface CartDocument extends CartInterface, Document {}
const Cart = mongoose.model<CartDocument>('Cart', cart);

export default Cart;
