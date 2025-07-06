import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": `"name" має бути рядком`,
    "string.empty": `"name" не може бути порожнім`,
    "string.min": `"name" має містити не менше {#limit} символів`,
    "any.required": `"name" є обов'язковим полем`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `"email" має бути валідним`,
    "any.required": `"email" є обов'язковим полем`,
  }),
  phone: Joi.string()
    .pattern(/^\+?\d{7,15}$/)
    .required()
    .messages({
      "string.pattern.base": `"phone" має бути рядком цифр (7–15 символів), може починатися з "+"`,
      "any.required": `"phone" є обов'язковим полем`,
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.base": `"name" має бути рядком`,
    "string.empty": `"name" не може бути порожнім`,
    "string.min": `"name" має містити не менше {#limit} символів`,
  }),
  email: Joi.string().email().messages({
    "string.email": `"email" має бути валідним`,
  }),
  phone: Joi.string()
    .pattern(/^\+?\d{7,15}$/)
    .messages({
      "string.pattern.base": `"phone" має бути рядком цифр (7–15 символів), може починатися з "+"`,
    }),
})
  .or("name", "email", "phone") 
  .messages({
    "object.missing": "Body must have at least one field",
  });
