import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `"email" має бути валідним`,
    "any.required": `"email" є обов'язковим полем`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": `"password" має містити мінімум {#limit} символів`,
    "any.required": `"password" є обов'язковим полем`,
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `"email" має бути валідним`,
    "any.required": `"email" є обов'язковим полем`,
  }),
  password: Joi.string().required().messages({
    "any.required": `"password" є обов'язковим полем`,
  }),
});
