import { validateUserToken } from "../utils/token.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const authenticateMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return next();

  if (!authHeader.startsWith("Bearer"))
    return res.status(400).json({ message: "Only Bearer token is accepted" });

  const [_, token] = authHeader.split(" ");

  const payload = validateUserToken(token);

  req.user = payload;

  next();
};

export const ensureAuthenticated = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Please login to use this feature" });
  }
  next();
};
