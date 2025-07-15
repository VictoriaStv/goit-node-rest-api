import Joi from "joi";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.model.js";
import { transporter } from "../helpers/email.js";

export async function verifyEmail(req, res, next) {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ where: { verificationToken } });
    if (!user) {
      throw HttpError(404, "User not found");
    }
    await user.update({ verify: true, verificationToken: null });
    res.json({ message: "Verification successful" });
  } catch (err) {
    next(err);
  }
}

const resendSchema = Joi.object({ email: Joi.string().email().required() });

export async function resendVerifyEmail(req, res, next) {
  try {
    const { error } = resendSchema.validate(req.body);
    if (error) throw HttpError(400, error.details[0].message);

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw HttpError(404, "User not found");
    if (user.verify)
      throw HttpError(400, "Verification has already been passed");

    const verifyLink = `${process.env.BASE_URL}/api/auth/verify/${user.verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      html: `<a href="${verifyLink}">Натисніть для верифікації</a>`,
    });

    res.json({ message: "Verification email sent" });
  } catch (err) {
    next(err);
  }
}
