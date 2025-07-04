export function isAuthenticated(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Giriş tələb olunur" });
  }
  next();
}
