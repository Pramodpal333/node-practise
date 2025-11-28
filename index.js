import express from "express";
import userRouter from "./route/user.routes.js";
import adminRouter from "./route/admin.routes.js";
import { authorizeMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(authorizeMiddleware);

app.get("/", (req, res) => {
  return res.json({ status: `The server is Running on Port: ${PORT}` });
});

app.use("/users", userRouter);

app.use("/admin", adminRouter);

app.listen(PORT, () => console.log("Server is Running on Port", PORT));
