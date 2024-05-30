import { Router } from "express";
import ShippingController from "../../controllers/user/shipping.controller";
import authMiddleWare from "../../middlewares/jwtverify";

const shippingRoute = Router();
shippingRoute.post("/user/shipping-address", authMiddleWare, ShippingController.addShippingAddress);
shippingRoute.get("/user/shipping-address", authMiddleWare, ShippingController.getShippingAddress);
export default shippingRoute;