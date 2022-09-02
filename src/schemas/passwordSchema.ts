import Joi from "joi";

export const passwordSchema = Joi.object({
    password: Joi.string()
        .min(4)
})