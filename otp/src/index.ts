import express from "express";
import dotenv from "dotenv";
import otpRoutes from "./routes/otp-routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", otpRoutes);

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
