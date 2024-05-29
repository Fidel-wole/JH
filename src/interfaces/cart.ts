import {Product} from "./product"
import {User} from "./user"
export interface CartItem{
    product:Product | string;
    quantity: number
}

export interface Cart{
    userId: User;
    items:CartItem[]
}