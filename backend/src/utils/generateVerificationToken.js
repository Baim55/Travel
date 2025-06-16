import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const generateVerificationToken = (id, expiresIn = "1d") => {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn });
  return token;
};
