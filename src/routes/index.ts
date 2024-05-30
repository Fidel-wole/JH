import { Router } from 'express'
import MiscController from '../controllers/misc';
import routeConf from '../configs/routes';
import authRoute from './user/auth';
import adminProductRoute from './admin/product';
import userProductRoute from './user/product';
import orderRoute from './user/order';
import shippingRoute from './user/shipping';

const testRouter = Router();

testRouter.all(routeConf.home, MiscController.home);

const invalidRoutes = Router();
invalidRoutes.all(routeConf.wildCard, MiscController.invalidRoute)

const v1Router: Router[] = [testRouter, authRoute, adminProductRoute, userProductRoute, orderRoute, shippingRoute, invalidRoutes];
export default v1Router;