import express from "express";
import db from "../db/index.js";
import { userSessionsTable, usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "crypto";
import jwt from "jsonwebtoken";

const router = express.Router();

router.patch("/", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }

  const { name } = req.body;

  // Add validation to prevent "No values to set" error
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  await db
    .update(usersTable)
    .set({ name: name })
    .where(eq(usersTable.id, user.userId));

  return res.json({ message: "Details Updated!" });
});

router.get("/", (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ success: false, message: "No user found" });
  }

  return res.json({ user });
});

router.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  const [existingUser] = await db
    .select({
      email: usersTable.email,
    })
    .from(usersTable)
    .where((e) => eq(e.email, email));

  if (existingUser) {
    return res.status(400).json({ error: `User exist with email ${email}` });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({ id: usersTable.id });

  return res
    .status(201)
    .json({ success: true, message: "New user Created", id: user.id });
});

router.post("/login", async (req, res) => {
  //Recieved data from request
  const { email, password } = req.body;

  /// Query if user exist
  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where((e) => eq(e.email, email));

  ///If user does not exist
  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: "User does not exist with the mail",
      email,
    });
  }

  ///Get salt of exisiting user
  const salt = existingUser.salt;

  ///Get Hashesh password
  const storedHashedPassword = existingUser.password;

  ///Create a new hashed from the password recieved from request
  const newHashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  ///comare stored hashed password and the new hashed password created from password received from request
  if (newHashedPassword !== storedHashedPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Incorrect Password" });
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.status(200).json({ success: true, token });
});

export default router;
