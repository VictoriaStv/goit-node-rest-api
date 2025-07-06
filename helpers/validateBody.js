import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(
        HttpError(400, error.details.map((d) => d.message).join(", "))
      );
    }
    next();
  };
};

export default validateBody;
