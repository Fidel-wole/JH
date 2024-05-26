import { Router } from "express";
import ProductController from "../../controllers/admin/product";
const adminProductRoute = Router();

adminProductRoute.post("/admin/add-product", ProductController.addProduct);
adminProductRoute.post("/admin/category", ProductController.addCategory);
adminProductRoute.get("/admin/category", ProductController.getCategory);
adminProductRoute.get("/admin/product", ProductController.getProduct)
export default adminProductRoute;