import * as businessRepository from "../repositories/businessRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as cardRepository from '../repositories/cardRepository';
import * as cardService from './cardService';
import dayjs from "dayjs";
import Cryptr from "cryptr";

const cryptr = new Cryptr("myTotallySecretKey");

export async function newPosSale (cardId: number, password: string, businessId: number, amount: number) {
    const validCard : any = await cardRepository.findById(cardId);
    if(!validCard) { throw { type: 'Not Found', message: 'This card was not found.'}};
    if(!validCard.password) { throw { type: 'Unauthorized', message: 'This card was not activated!' }};
    if(validCard.expirationDate >= dayjs().format('MM/YY')) { throw { type: 'Unauthorized', message: `This card is already expired!` }};
    if(validCard.isBlocked === true) { throw { type: 'Unauthorized', message: `This card is blocked!` }};
    const decryptedPassword : any = cryptr.decrypt(validCard.password);
    if (password !== decryptedPassword) { throw { type: 'Unauthorized', message: `Password unauthorized!`}};
    const validBusiness = await businessRepository.findById(businessId);
    if(!validBusiness) { throw { type: 'Not Found', message: 'This business was not found!'}};
    if(validCard.type !== validBusiness.type) { throw { type: 'Unauthorized', message: `Sale unauthorized!`}};
    const balance : any = await cardService.getExtract(cardId);
    if(balance.balance < amount ) { throw { type: 'Unauthorized', message: 'Insufficient balance!' }};

    await paymentRepository.insert({ cardId, businessId, amount });
}