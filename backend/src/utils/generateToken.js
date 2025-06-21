import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const generateToken = (id, res, tokenName = "token") => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return token;
};
