import { db } from "../db/index.js";
import { usersTable } from "../models/users.model.js";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email) {
  const [exisitingUser] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return exisitingUser;
}
