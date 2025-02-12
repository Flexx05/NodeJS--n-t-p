import Joi from "joi";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signupSchema = Joi.object({
  username: Joi.string().min(3).trim(),
  email: Joi.string().email().required().trim(),
  phone: Joi.number().min(10),
  password: Joi.string().min(6).required().trim(),
  confirmPassword: Joi.string()
    .min(6)
    .required()
    .trim()
    .valid(Joi.ref("password")),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required().trim(),
});

export const signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json(errors);
    }
    const userExist = await User.findOne({ email: value.email });
    if (userExist)
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    const hashPassword = await bcrypt.hash(value.password, 10);
    const user = await User.create({ ...value, password: hashPassword });
    user.password = undefined;
    return res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { error, value } = signinSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json(errors);
    }
    const user = await User.findOne({ email: value.email });
    if (!user)
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    const isMatchPassword = await bcrypt.compare(value.password, user.password);
    if (!isMatchPassword)
      return res.status(400).json({ message: "Sai mật khẩu" });
    const token = jwt.sign({ user }, "manhlinh", { expiresIn: "15m" });
    user.password = undefined;
    return res
      .status(200)
      .json({ message: "Đăng nhập thành công", user, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
