import HttpError from "./HttpError.js";

export default function validateBody(schema) {
  return (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const msg = error.details.map((d) => d.message).join(", ");
      return next(HttpError(400, msg));
    }
    next();
  };
}
