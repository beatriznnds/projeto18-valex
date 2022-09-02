import { Request, Response } from 'express';
import * as rechargeServices from '../services/rechargeService';

export async function rechargeCard (req: Request, res: Response) {
    const { id, amount } = req.body;
    await rechargeServices.rechargeCard(id, amount);
    res.status(200).send({ message: `Recharge successful!` });
}