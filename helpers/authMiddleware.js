import jwt from "jsonwebtoken";
import HttpError from "./HttpError.js";
import { User } from "../models/user.model.js";

export async function auth(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme !== "Bearer" || !token) {
    return next(HttpError(401, "Not authorized"));
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return next(HttpError(401, "Not authorized"));
  }

  const user = await User.findByPk(payload.id);
  if (!user || user.token !== token) {
    return next(HttpError(401, "Not authorized"));
  }

  req.user = user;
  next();
}
