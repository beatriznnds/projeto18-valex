import Joi from "joi";

export const typeCard = Joi.object({
    type: Joi.string()
        .required()
        .valid('groceries', 'restaurant', 'transport', 'education', 'health'),
    employeeId: Joi.number()
        .required()
})