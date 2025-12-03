import express from "express";
import "dotenv/config";
import { connectMongoDb } from "./connections.js";
const app = express();
import userRoute from "./routes/user.routes.js";
import { authorizeMiddleware } from "./middlewares/auth.middleware.js";

const PORT = process.env.PORT ?? 3000;

connectMongoDb(process.env.MONGODB_URL).then(() =>
  console.log("MondoDB connected!!!!")
);

app.use(express.json());

app.use(authorizeMiddleware);

app.use("/users", userRoute);

app.listen(PORT, () => console.log(`Server is Up & Running on Port ${PORT}`));
