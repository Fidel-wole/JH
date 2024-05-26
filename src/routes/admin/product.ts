import { Router } from "express";
import ProductController from "../../controllers/admin/product";
const productRoute = Router();

productRoute.post("/admin/add-product", ProductController.addProduct);
productRoute.post("/admin/category", ProductController.addCategory);
productRoute.get("/admin/category", ProductController.getCategory);
productRoute.get("/admin/product", ProductController.getProduct)
export default productRoute;