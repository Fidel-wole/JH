import { Category } from "./category";

export interface Product {
     product_name:string;
     categories:Category | string[];
     images:string[];
     description:string;
     rating?:string;
     price:string;
     colors?:string[];
     size?:string[]
}