import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { recieveMail } from "../middleware/mailer/mailer.js";
import jwt from "jsonwebtoken";
import RegisterValidationSchema from "../middleware/validation/RegisterValidation.js";
import LoginValidationSchema from "../middleware/validation/LoginValidation.js";
import ForgotValidationSchema from "../middleware/validation/ForgotValidation.js";
import ResetValidationSchema from "../middleware/validation/ResetValidation.js";

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const { filename } = req.file;

    const imageUrl = `images/${filename}`.replace(/\\/g, "/");

    const { error } = RegisterValidationSchema.validate({ name, username, email, password });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existUser = await user.findOne({ email });
    if (existUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({ image: imageUrl, name, username, email, password: hashedPassword });
    await newUser.save();

    const token = generateVerificationToken(newUser._id, "1d");
    const encodedToken = encodeURIComponent(token);
    const confirmLink = `${process.env.SERVER_LINK}/auth/verify?token=${encodedToken}`;
    await recieveMail(newUser, confirmLink);

    return res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const updatedVerify = await user.findByIdAndUpdate(decoded.id, { isVerified: true });
    if (updatedVerify) return res.redirect(`${process.env.CLIENT_LINK}/login`);
  } catch (error) {
    return res.status(400).json({ message: "Token not valid or expired" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { error } = LoginValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existUser = await user.findOne({ username });
    if (!existUser) return res.status(400).json({ message: "User not found" });
    if (!existUser.isVerified) return res.status(400).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) return res.status(400).json({ message: "Username or Password wrong" });

    generateToken(existUser._id, res);
    return res.status(200).json({ message: "User logged in successfully", existUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const { error } = ForgotValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existUser = await user.findOne({ email });
    if (!existUser) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const encodedResetToken = encodeURIComponent(resetToken);
    const resetLink = `${process.env.CLIENT_LINK}/resetpassword?token=${encodedResetToken}`;
    await recieveMail(existUser, resetLink);

    return res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.query;
    const { error } = ResetValidationSchema.validate({ password });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const existUser = await user.findById(decoded.id);
    if (!existUser) return res.status(400).json({ message: "Token not valid or expired" });

    const hashedPassword = await bcrypt.hash(password, 10);
    existUser.password = hashedPassword;
    await existUser.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
