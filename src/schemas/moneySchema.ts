import Joi from 'joi';

export const moneySchema = Joi.object({
  id: Joi.number().required(),
  amount: Joi.number().positive().required(),
});