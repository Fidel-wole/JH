import { Router } from "express";
import OrderController from "../../controllers/user/order.controller";
import authMiddleWare from "../../middlewares/jwtverify";

const orderRoute = Router();
orderRoute.post("/user/order", authMiddleWare, OrderController.createOrder);
export default orderRoute;