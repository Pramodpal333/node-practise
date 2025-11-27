import express from "express";
import userRouter from "./route/user.routes.js";
import db from "./db/index.js";
import { userSessionsTable, usersTable } from "./db/schema.js";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    console.log(req.headers);
    const sessionId = req.headers["authorization"];

    console.log(sessionId);
    if (!sessionId) {
      return next();
    }

    if (!sessionId.includes("Bearer")) {
      return res.status(400).json({ error: "Token does not contains Bearer" });
    }

    const token = sessionId.split(" ")[1];

    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log("This is the data in Middleware", data);
    req.user = data;
    return next();
  } catch (e) {
    console.log("Auth Failed Error: ", e.toString());
    return next();
  }
});

app.get("/", (req, res) => {
  return res.json({ status: `The server is Running on Port: ${PORT}` });
});

app.use("/users", userRouter);

app.listen(PORT, () => console.log("Server is Running on Port", PORT));
