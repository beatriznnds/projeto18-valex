import { Request, Response } from 'express';
import * as cardServices from '../services/cardService';

export async function newCard (req: Request, res: Response) {
    const apiKey : any = req.headers['x-api-key'] || "";
    const employeeId : number = Number(req.body.employeeId);
    const { type } = req.body;

    await cardServices.createNewCard(apiKey, employeeId, type);

    return res.sendStatus(201);
}