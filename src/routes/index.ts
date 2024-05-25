import { Router } from 'express'
import MiscController from '../controllers/misc';
import routeConf from '../configs/routes';
import authRoute from './v1/auth';
import productRoute from './admin/product';

const testRouter = Router();

testRouter.all(routeConf.home, MiscController.home);

const invalidRoutes = Router();
invalidRoutes.all(routeConf.wildCard, MiscController.invalidRoute)

const v1Router: Router[] = [testRouter, authRoute, productRoute, invalidRoutes];
export default v1Router;