/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

import { validateUserToken } from "../utils/token.js";

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
