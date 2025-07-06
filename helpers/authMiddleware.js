import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import HttpError from "./HttpError.js";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    throw HttpError(401, "Not authorized");
  }
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw HttpError(401, "Not authorized");
  }
  const user = await User.findByPk(payload.id);
  if (!user || user.token !== token) {
    throw HttpError(401, "Not authorized");
  }
  req.user = user;
  next();
};
