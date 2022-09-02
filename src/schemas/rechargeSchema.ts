import Joi from 'joi';

export const rechargeSchema = Joi.object({
  id: Joi.number().required(),
  amount: Joi.number().positive().required(),
});