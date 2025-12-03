import express from "express";
import "dotenv/config";
import {
  signUpPostRequestBodySchema,
  loginPostRequestBodySchema,
} from "../validation/request.validation.js";
import db from "../db/index.js";
import { usersTable } from "../models/users.model.js";

import { hashPassword } from "../utils/hash.js";
import { getUserByEmail } from "../services/user.services.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  const validationResult = await signUpPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ errors: validationResult.error.format() });
  }

  const { firstName, lastName, email, password } = validationResult.data;

  const exisitingUser = await getUserByEmail(email);

  if (exisitingUser) {
    res.status(400).json({ message: "A user already exist with this mail id" });
  }

  const { salt, password: hashedPassword } = hashPassword(password);

  const [user] = await db
    .insert(usersTable)
    .values({ firstName, lastName, email, salt, password: hashedPassword })
    .returning({ id: usersTable.id });

  res.status(201).json({
    success: true,
    message: "Congrats! your account has been created",
    id: user.id,
  });
});

router.post("/login", async (req, res) => {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { email, password } = validationResult.data;

  console.log(email);
  console.log(password);

  const exisitingUser = await getUserByEmail(email);

  console.log(exisitingUser);

  if (!exisitingUser) {
    return res
      .status(404)
      .json({ message: `No user found with ${email} email` });
  }

  const { password: hashedPassword } = hashPassword(
    password,
    exisitingUser.salt
  );

  if (hashedPassword !== exisitingUser.password) {
    return res.status(400).json({ error: "Incorrect Password" });
  }

  const token = jwt.sign(
    {
      id: exisitingUser.id,
      email: exisitingUser.email,
      firstName: exisitingUser.firstName,
      lastName: exisitingUser.lastName,
    },
    process.env.JWT_SECRET_KEY
  );

  return res.status(200).json({ success: true, token });
});

export default router;
