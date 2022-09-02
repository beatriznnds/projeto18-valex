import { Router } from "express";

import { rechargeSchema } from "../schemas/rechargeSchema";
import { validateSchema } from "../middlewares/schemaValidation";
import { checkApiKey } from "../middlewares/apiValidation";

import * as rechargeController from '../controllers/rechargeController'

const rechargeRouter = Router();

rechargeRouter.post('/recharge', checkApiKey, validateSchema(rechargeSchema), rechargeController.rechargeCard)

export default rechargeRouter;