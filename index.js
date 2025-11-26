import express from "express";
import userRouter from "./route/user.routes.js";
import db from "./db/index.js";
import { userSessionsTable, usersTable } from "./db/schema.js";

import { eq } from "drizzle-orm";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(async (req, res, next) => {
  const sessionId = req.headers["session-id"];

  if (!sessionId) {
    return next();
  }

  const [data] = await db
    .select({
      id: userSessionsTable.id,
      userId: usersTable.id,
      name: usersTable.name,
      email: usersTable.id,
    })
    .from(userSessionsTable)
    .rightJoin(usersTable, eq(usersTable.id, userSessionsTable.userId))
    .where((table) => eq(table.id, sessionId));

  if (!data) {
    return next();
  }

  req.user = data;

  return next();
});

app.get("/", (req, res) => {
  return res.json({ status: `The server is Running on Port: ${PORT}` });
});

app.use("/users", userRouter);

app.listen(PORT, () => console.log("Server is Running on Port", PORT));
