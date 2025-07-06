import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?\d{7,15}$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+?\d{7,15}$/),
})
  .or("name", "email", "phone")
  .messages({
    "object.missing": "Body must have at least one field",
  });

export const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  "any.required": `"favorite" is required`,
  "boolean.base": `"favorite" must be a boolean`,
});
