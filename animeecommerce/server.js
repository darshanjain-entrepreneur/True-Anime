import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/authRoute.js";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

connectDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", router);

app.get("/", (req, res) => {
  res.send({
    message: "welcome to ecommerce website",
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`.bgCyan);
});
