import { Router } from "express";
import ProductController from "../../controllers/admin/product";
const userProductRoute = Router();

userProductRoute.get("/user/category", ProductController.getCategory);
userProductRoute.get("/user/product", ProductController.getProduct);
export default userProductRoute;