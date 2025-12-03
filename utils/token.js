import jwt from "jsonwebtoken";
import { tokenValidationSchema } from "../validation/token.validation.js";

export async function createUserToken(payload) {
  const validationResult = await tokenValidationSchema.safeParseAsync(payload);

  if (validationResult.error) throw new Error(validationResult.error.format());

  const validatedPayload = validationResult.data;

  const token = jwt.sign(validatedPayload, process.env.JWT_SECRET_KEY);

  return token;
}
