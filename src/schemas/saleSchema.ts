import Joi from "joi";

export const saleSchema = Joi.object({
    cardId: Joi.number()
        .required(),
    password: Joi.string()
        .min(4)
        .max(4)
        .required(),
    businessId: Joi.number()
        .required(),
    amount: Joi.number()
        .positive()
        .required()
})