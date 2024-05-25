import logger from "../utils/logger";
import routeConf from '../configs/routes'
import dispatcher from "../utils/dispatcher";

export default class MiscController {
    static home(_: any, res: any): void {
        const message = 'Welcome to HR Backend Service'
        logger.info(routeConf.home, message)
      
        dispatcher.DispatchSuccessMessage(res, message)
    }

    static async invalidRoute(req: Request, res: any): Promise<void> {
        logger.error(req.url, null)
        dispatcher.SendNotImplementedError(res)
    }
}