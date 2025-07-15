import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

import { User } from "../models/user.model.js";
import HttpError from "../helpers/HttpError.js";
import { transporter } from "../helpers/email.js";

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    if (await User.findOne({ where: { email } })) {
      throw HttpError(409, "Email in use");
    }

    const hash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "200", d: "mp" });
    const verificationToken = nanoid();

    const user = await User.create({
      email,
      password: hash,
      avatarURL,
      verificationToken,
    });

    const verifyLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      html: `<a href="${verifyLink}">Натисніть для верифікації</a>`,
    });

    res.status(201).json({
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (
      !user ||
      !user.verify ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw HttpError(401, "Email or password is wrong");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
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
}

export async function logout(req, res, next) {
  try {
    await req.user.update({ token: null });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

export function current(req, res) {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
}

export async function updateAvatar(req, res, next) {
  try {
    if (!req.file) throw HttpError(400, "Avatar file is required");
    const { path: tmpPath, filename } = req.file;
    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(tmpPath, newPath);

    const avatarURL = `/avatars/${filename}`;
    await req.user.update({ avatarURL });
    res.json({ avatarURL });
  } catch (err) {
    next(err);
  }
}
