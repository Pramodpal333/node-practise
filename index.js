import "dotenv/config";
import express from "express";
import userRoute from "./routes/user.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { authenticateMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(authenticateMiddleware);

app.use("/users", userRoute);
app.use(urlRoutes);

app.listen(PORT, () => console.log("Server is Up & Running on Port ", PORT));
