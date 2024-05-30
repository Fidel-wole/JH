import { User } from "./user";
export interface Address {
    street: string;
    building?:string;
    landmark?:string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface ShippingAddress {
    userId:User | string;
    address:[Address];
  }
  