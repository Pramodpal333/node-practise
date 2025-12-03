import "dotenv/config";
import express from "express";
import userRoute from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/users", userRoute);

app.listen(PORT, () => console.log("Server is Up & Running on Port ", PORT));
