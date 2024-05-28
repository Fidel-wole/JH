import { Router } from "express";
import ProductController from "../../controllers/user/product.controller";
import authMiddleWare from "../../middlewares/jwtverify";

const userProductRoute = Router();

// Route to get all categories
userProductRoute.get("/user/category", ProductController.getCategory);

// Route to get all products
userProductRoute.get("/user/products", ProductController.getProduct);

// Route to get products by category
userProductRoute.get("/user/products/:categoryId", ProductController.getProductByCategory);

// Route to add ratong;
userProductRoute.post("/user/product/rate", authMiddleWare, ProductController.rateProduct)

export default userProductRoute;
