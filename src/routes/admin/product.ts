import { Router } from "express";
import ProductController from "../../controllers/admin/product";
import { uploadImages } from "../../utils/upload";
const adminProductRoute = Router();

adminProductRoute.post("/admin/add-product", uploadImages, ProductController.addProduct);
adminProductRoute.post("/admin/category", ProductController.addCategory);
adminProductRoute.get("/admin/category", ProductController.getCategory);
adminProductRoute.get("/admin/product", ProductController.getProduct)
export default adminProductRoute;