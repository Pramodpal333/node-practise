import jwt from "jsonwebtoken";
import { tokenValidationSchema } from "../validation/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function createUserToken(payload) {
  const validationResult = await tokenValidationSchema.safeParseAsync(payload);

  if (validationResult.error) throw new Error(validationResult.error.format());

  const validatedPayload = validationResult.data;

  const token = jwt.sign(validatedPayload, JWT_SECRET);

  return token;
}

export function validateUserToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (e) {
    return null;
  }
}
