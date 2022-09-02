import { Router } from "express";
import { validateSchema } from '../middlewares/schemaValidation';
import { saleSchema } from "../schemas/saleSchema";
import * as saleController from '../controllers/saleController';

const saleRouter = Router();

saleRouter.post('/sale', validateSchema(saleSchema),saleController.newPOSSale)

export default saleRouter;