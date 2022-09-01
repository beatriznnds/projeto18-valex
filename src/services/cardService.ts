import * as cardRepository from '../repositories/cardRepository';
import * as companyRepository from '../repositories/companyRepository';
import * as employeeRepository from '../repositories/employeeRepository';
import { TransactionTypes } from '../repositories/cardRepository';
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import Cryptr from "cryptr";


const cryptr = new Cryptr("myTotallySecretKey");

export async function createNewCard (apiKey: string, employeeId: number, type: TransactionTypes) {
    const validCompany = await companyRepository.findByApiKey(apiKey);
    if (!validCompany) { throw { type: 'Not Found', message: `ApiKey not found!` }}

    const validEmployee = await employeeRepository.findById(employeeId);
    if (!validEmployee) { throw { type: 'Not Found', message: `Employee not found!` }}

    const validCardForEmployee = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if (validCardForEmployee) { throw { type: 'Conflict', message: `This employee already has a ${type} card` }}

    const number : string = faker.finance.creditCardNumber();

    const fullName : string = validEmployee.fullName.toUpperCase();
    const fullNameArray : any = fullName.split(" "); 
    for (let i = 1; i < fullNameArray.length - 1; i++) {
        fullNameArray[i].length >= 3 ? fullNameArray[i] = fullNameArray[i][0] : fullNameArray.splice(i, 1);
    }
    const cardholderName : any = fullNameArray.join(" ");

    const expirationDate = dayjs().add(5, 'year').format('MM/YYYY');

    const cardCVC : string = faker.finance.creditCardCVV();
    const encryptedCardCVC : string = cryptr.encrypt(cardCVC);

    console.log(employeeId);

    const newCard : cardRepository.CardInsertData = {
        employeeId,
        number,
        cardholderName,
        securityCode: encryptedCardCVC,
        expirationDate,
        isVirtual: false,
        isBlocked: true,
        type
    }

    await cardRepository.insert(newCard);
}
