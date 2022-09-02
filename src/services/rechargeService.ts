import * as rechargeRepository from '../repositories/rechargeRepository';
import * as cardRepository from '../repositories/cardRepository';
import dayjs from 'dayjs';

export async function rechargeCard(id: number, amount: number) {
    const validCard = await cardRepository.findById(id);
    if (!validCard) { throw { type: 'Not found', message: `This card was not found!` }};
    if(!validCard.password) { throw { type: 'Unauthorized', message: `This card needs to be activated!` }};
    if(validCard.expirationDate >= dayjs().format('MM/YY')) { throw { type: 'Unauthorized', message: `This card is already expired!` }};
    
    await rechargeRepository.insert({ cardId: id, amount });
}