import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

import { User } from "../models/user.model.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) throw HttpError(409, "Email in use");

    const hash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "200", d: "mp" });
    const user = await User.create({ email, password: hash, avatarURL });

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await user.update({ token });
    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    await req.user.update({ token: null });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const current = (req, res, next) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) throw HttpError(400, "Avatar file is required");
    const { path: tmpPath, filename } = req.file;
    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(tmpPath, newPath);

    const avatarURL = `/avatars/${filename}`;
    await req.user.update({ avatarURL });
    res.status(200).json({ avatarURL });
  } catch (err) {
    next(err);
  }
};
