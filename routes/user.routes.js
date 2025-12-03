import express from "express";
import Users from "../models/users.model.js";
import { createHmac, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { verifyLoginMiddeware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  const exisitingUser = await Users.findOne({ email });

  if (exisitingUser) {
    return res.status(400).json({ message: "User Exist with this email" });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const user = await Users.insertOne({
    name,
    email,
    password: hashedPassword,
    salt,
  });

  return res
    .status(201)
    .json({ message: "User Created Successfuly", userId: user._id });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const exisitingUser = await Users.findOne({ email });

  if (!exisitingUser) {
    return res
      .status(404)
      .json({ success: false, error: `No user exist with email ${email}` });
  }

  const salt = exisitingUser.salt;
  const storedHashedPassword = exisitingUser.password;

  const newHashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (newHashedPassword !== storedHashedPassword) {
    return res
      .status(400)
      .json({ success: false, error: `Incorrect Password` });
  }

  const payload = {
    _id: exisitingUser._id,
    name: exisitingUser.name,
    email: exisitingUser.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.json({ success: true, token });
});

router.patch("/", verifyLoginMiddeware, async (req, res) => {
  const user = req.user;
  const { name } = req.body;

  const updatedUser = await Users.findByIdAndUpdate(
    user._id,
    {
      $set: { name: name },
    },
    { new: true }
  );

  return res.json({
    success: true,
    messgae: "Your name has been updated",
    name: updatedUser.name,
  });
});

export default router;
