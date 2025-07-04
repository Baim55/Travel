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


export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Token yoxdur" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const existUser = await user.findById(decoded.id).select("-password");

    if (!existUser) return res.status(404).json({ message: "İstifadəçi tapılmadı" });

    res.status(200).json({ user: existUser });
  } catch (err) {
    res.status(401).json({ message: "Token etibarsızdır" });
  }
};

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
  res.clearCookie("token", {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "None", 
  });
  return res.status(200).json({ message: "User logged out successfully" });
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existUser = await user.findOne({ email });
    if (!existUser) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const encodedResetToken = encodeURIComponent(resetToken);
    const resetLink = `${process.env.CLIENT_LINK}/resetpassword?token=${encodedResetToken}`;

    await recieveMail(existUser, resetLink);

    return res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const existUser = await user.findById(decoded.id);

    const hashedPassword = await bcrypt.hash(password, 10);
    existUser.password = hashedPassword;
    await existUser.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


