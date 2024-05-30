import { Product } from "./product";
import { User } from "./user";
import { ShippingAddress } from "./shippingAddress";
interface OrderItem {
    product: Product;
    quantity: number;
    price: number;
  }
export interface OrderDocument  {
    userId: User;
    items: OrderItem[];
    total: number;
    status: string;
    shippingAddress: ShippingAddress;
    createdAt: Date;
    updatedAt: Date;
  }