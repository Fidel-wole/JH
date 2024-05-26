import { Router } from "express";
import ProductController from "../../controllers/user/product.controller";

const userProductRoute = Router();

// Route to get all categories
userProductRoute.get("/user/category", ProductController.getCategory);

// Route to get all products
userProductRoute.get("/user/products", ProductController.getProduct);

// Route to get products by category
userProductRoute.get("/user/products/:categoryId", ProductController.getProductByCategory);

export default userProductRoute;
