import * as cardRepository from '../repositories/cardRepository';
import * as companyRepository from '../repositories/companyRepository';
import * as employeeRepository from '../repositories/employeeRepository';
import { TransactionTypes } from '../repositories/cardRepository';
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import Cryptr from "cryptr";
import { passwordSchema } from '../schemas/passwordSchema';


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
    console.log(cardCVC);
    const encryptedCardCVC : string = cryptr.encrypt(cardCVC);

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

export async function activateCard (id: number, securityCode: string, password: string) {
    const validCard = await cardRepository.findById(id);
    if(!validCard) { throw { type: 'Not Found', message: `Card not found!`}}

    if(validCard.expirationDate >= dayjs().format('MM/YY')) { throw { type: 'Unauthorized', message: `This card is already expired!` }};

    if(validCard.password !== null) { throw { type: 'Conflict', message: `This card is already activated!`}};

    const decryptedCVV = cryptr.decrypt(validCard.securityCode);
    console.log(decryptedCVV);
    if(securityCode !== decryptedCVV) { throw { type: 'Unauthorized', message: `Invalid CVV!`}};

    const { error } =  passwordSchema.validate({ password });

    if(error) { throw { type: 'Unauthorized', message: 'Password too short!'}};

    const encryptedPassword = cryptr.encrypt(password);

    await cardRepository.update(id, {password: encryptedPassword});
}