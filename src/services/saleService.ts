import * as businessRepository from "../repositories/businessRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as cardService from './cardService';

export async function newPosSale (cardId: number, password: string, businessId: number, amount: number) {
    const validCard = await cardService.validateCardId(cardId);
    await cardService.validExpirationDate(cardId);
    await cardService.cardIsInactive(cardId);
    if(validCard.isBlocked === true) { throw { type: 'Unauthorized', message: `This card is blocked!` }};
    const decryptedPassword = await cardService.decryptPassword(cardId);
    if (password !== decryptedPassword) { throw { type: 'Unauthorized', message: `Password unauthorized!`}};
    const validBusiness = await businessRepository.findById(businessId);
    if(!validBusiness) { throw { type: 'Not Found', message: 'This business was not found!'}};
    if(validCard.type !== validBusiness.type) { throw { type: 'Unauthorized', message: `Sale unauthorized!`}};
    const balance : any = await cardService.getExtract(cardId);
    if(balance.balance < amount ) { throw { type: 'Unauthorized', message: 'Insufficient balance!' }};

    await paymentRepository.insert({ cardId, businessId, amount });
}