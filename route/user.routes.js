import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "crypto";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("User route is working");
  return res.json({ message: "User route is working" });
});

router.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  const [existingUser] = await db.select({
    email: usersTable.email
  }).from(usersTable).where((e) => eq(e.email, email));

  if (existingUser) {
    return res.status(400).json({ error: `User exist with email ${email}` });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");

  const [user] = await db.insert(usersTable).values({
    name, email, password: hashedPassword, salt
  }).returning({ id: usersTable.id });

  return res.status(201).json({ success: true, message: "New user Created", id: user.id });
});

router.post("/login", async (req, res) => {});

export default router;
