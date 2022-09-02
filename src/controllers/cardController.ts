import { Request, Response } from 'express';
import * as cardServices from '../services/cardService';

export async function newCard (req: Request, res: Response) {
    const apiKey : any = req.headers['x-api-key'] || "";
    const employeeId : number = Number(req.body.employeeId);
    const { type } = req.body;

    await cardServices.createNewCard(apiKey, employeeId, type);

    return res.sendStatus(201);
}

export async function activateCard (req: Request, res: Response) {
    const { id, securityCode, password } : { id: number, securityCode: string, password: string} = req.body;

    await cardServices.activateCard(id, securityCode, password);

    return res.sendStatus(201);
}

export async function viewCards (req: Request, res: Response) {
    const { id, password } : { id: number, password: string } = req.body;

    const allCardsForUser = await cardServices.viewCards(id, password);

    return res.status(200).send({ cards: allCardsForUser})
}