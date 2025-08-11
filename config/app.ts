import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { dbConnect } from "./dbConnect";
import { authRoute } from "../routes/authRoute";
import cookieParser from "cookie-parser";
import { adminRoute } from "../routes/adminRoute";
import { userRoute } from "../routes/userRoute";
import { tripRoute } from "../routes/tripRoute";
dotenv.config();
dbConnect();

const port = process.env.PORT! || 7000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:
      process.env.CLIENT_URL || "https://tripnest-backend-xnse.onrender.com",
    credentials: true,
  })
);
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
  res.send("Server working");
});

app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.use("/trip", tripRoute);

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
