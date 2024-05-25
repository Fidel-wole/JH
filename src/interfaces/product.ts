import { Category } from "./category";

export interface Product {
     product_name:string;
     category:Category | string;
     description:string;
     rating?:string;
     price:string;
     colors?:string[];
     size?:string[]
}