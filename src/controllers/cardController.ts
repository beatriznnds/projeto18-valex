import { Request, Response } from 'express';
import * as cardServices from '../services/cardService';

export async function newCard (req: Request, res: Response) {
    const apiKey : any = req.headers['x-api-key'] || "";
    const employeeId : number = Number(req.body.employeeId);
    const { type } = req.body;

    await cardServices.createNewCard(apiKey, employeeId, type);

    return res.status(201).send({ message: `Card created!`});
}

export async function activateCard (req: Request, res: Response) {
    const { id, securityCode, password } : { id: number, securityCode: string, password: string} = req.body;

    await cardServices.activateCard(id, securityCode, password);

    return res.status(201).send({ message: `Card activated!` });
}

export async function viewCards (req: Request, res: Response) {
    const { id, password } : { id: number, password: string } = req.body;

    const allCardsForUser = await cardServices.viewCards(id, password);

    return res.status(200).send({ cards: allCardsForUser})
}

export async function getExtract (req: Request, res: Response) {
    const cardId : number = Number(req.params.id);

    const extract = await cardServices.getExtract(cardId);

    return res.status(200).send(extract);
}

export async function blockCard (req: Request, res: Response) {
    const { id, password } : { id: number, password: string } = req.body;

    await cardServices.blockCard(id, password);

    return res.status(200).send({ message: `Card blocked!` });
}

export async function unblockCard (req: Request, res: Response) {
    const { id, password } : { id: number, password: string } = req.body;

    await cardServices.unblockCard(id, password);

    return res.status(200).send({ message: `Card unblocked!` });
}