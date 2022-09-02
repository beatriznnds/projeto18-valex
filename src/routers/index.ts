import { Router } from "express";
import cardRouter from './cardRouter';
import rechargeRouter from "./rechargeRouter";
import saleRouter from "./saleRouter";

const router = Router();

router.use(cardRouter);
router.use(rechargeRouter);
router.use(saleRouter);

export default router;