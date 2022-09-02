import { Router } from "express";

import { moneySchema } from "../schemas/moneySchema";
import { validateSchema } from "../middlewares/schemaValidation";
import { checkApiKey } from "../middlewares/apiValidation";

import * as rechargeController from '../controllers/rechargeController'

const rechargeRouter = Router();

rechargeRouter.post('/recharge', checkApiKey, validateSchema(moneySchema), rechargeController.rechargeCard)

export default rechargeRouter;