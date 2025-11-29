import express from "express";
import "dotenv/config";
import { connectMongoDb } from "./connections.js";
const app = express();

const PORT = process.env.PORT ?? 3000;

connectMongoDb(process.env.MONGODB_URL).then(() =>
  console.log("MondoDB connected")
);

app.listen(PORT, () => console.log(`Server is Up & Running on Port ${PORT}`));
