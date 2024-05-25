import { Router } from "express";
import { AuthController } from "../../controllers/v1/auth.controller";
import { validateUser } from "../../validation/auth.validation";
const authRoute = Router();

authRoute.post("/auth/signup", validateUser, AuthController.addUser);
authRoute.post("/auth/login", AuthController.signIn)
export default authRoute;