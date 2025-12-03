import express from "express";
import { signUpPostValidationSchema } from "../validation/request.validation.js";
import db from "../db/index.js";
import { usersTable } from "../models/users.model.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "crypto";

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  const validationResult = await signUpPostValidationSchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ errors: validationResult.error.format() });
  }

  const { firstName, lastName, email, password } = validationResult.data;

  const [exisitingUser] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (exisitingUser) {
    res.status(400).json({ message: "A user already exist with this mail id" });
  }

  const salt = randomBytes(256).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

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

export default router;
