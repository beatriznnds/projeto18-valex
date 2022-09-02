import { Request, Response } from 'express';
import * as saleService from '../services/saleService';

export async function newPOSSale (req: Request, res: Response) {
    const { cardId, password, businessId, amount } : { cardId: number, password: string, businessId: number, amount: number } = req.body;
    await saleService.newPosSale(cardId, password, businessId, amount);
    res.status(200).send({ message: 'Successful sale!'})
}