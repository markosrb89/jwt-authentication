import Joi from "joi";

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .trim(true)
    .min(8)
    .regex(/[a-zA-Z]/)
    .regex(/\d/)
    .required(),
});

export const userRegisterSchema = Joi.object({
  full_name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .trim(true)
    .min(8)
    .regex(/[a-zA-Z]/)
    .regex(/\d/)
    .required(),
});
