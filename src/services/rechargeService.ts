import * as rechargeRepository from '../repositories/rechargeRepository';
import * as cardServices from './cardService';

export async function rechargeCard(id: number, amount: number) {
    await cardServices.validateCardId(id);
    await cardServices.validExpirationDate(id);
    await cardServices.cardIsInactive(id);
    await rechargeRepository.insert({ cardId: id, amount });
}