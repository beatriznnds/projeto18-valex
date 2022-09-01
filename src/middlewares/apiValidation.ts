import { Request, Response, NextFunction } from "express";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey: any = req.headers['x-api-key'];
    if(!apiKey) throw { type: "Not Found" };

    res.locals.apiKey = apiKey;

    next();
}