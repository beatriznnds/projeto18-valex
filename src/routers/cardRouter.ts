import { Router } from "express";
import { validateSchema } from '../middlewares/schemaValidation';
import { checkApiKey } from '../middlewares/apiValidation';
import { typeCard } from "../schemas/cardTypeSchema";
import * as cardController from '../controllers/cardController'

const cardRouter = Router();

cardRouter.post('/newcard', checkApiKey, validateSchema(typeCard), cardController.newCard);
cardRouter.post('/activatecard', cardController.activateCard);
cardRouter.get('/viewcards', cardController.viewCards);
cardRouter.get('/extract/:id', cardController.getExtract);
cardRouter.put('/blockcard', cardController.blockCard);

export default cardRouter;