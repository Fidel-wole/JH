import { Category } from "./category";
import {User} from "./user"
export interface Rating{
     userId:User | string;
     rating:number
}
export interface Product {
     product_name:string;
     categories:Category | string[];
     images:string[];
     description:string;
     ratings?:Rating[];
     averageRating?:number;
     price:string;
     colors?:string[];
     size?:string[]
}