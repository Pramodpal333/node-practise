import express from "express";
import {
  restrictedRoleAccess,
  verifyLoginMiddleware,
} from "../middlewares/auth.middleware.js";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";

const router = express.Router();

const adminAccessOnlyValidatorMiddleware = restrictedRoleAccess("admin");

router.get(
  "/users",
  verifyLoginMiddleware,
  adminAccessOnlyValidatorMiddleware,
  async (req, res) => {
    const users = await db.select().from(usersTable);
    return res.json({ users });
  }
);

export default router;
