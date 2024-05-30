import { Category } from "./category";
import {User} from "./user"
import { Document } from "mongoose";

export interface Rating{
     userId:User | string;
     rating:number
}
export interface Product extends Document{
     product_name:string;
     categories:Category | string[];
     images:string[];
     description:string;
     ratings?:Rating[];
     averageRating?:number;
     price:number;
     colors?:string[];
     size?:string[]
}

export interface ProductInterface{
     product_name:string;
     categories:Category | string[];
     images:string[];
     description:string;
     ratings?:Rating[];
     averageRating?:number;
     price:number;
     colors?:string[];
     size?:string[]
}