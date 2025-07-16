import express from "express";
import dotenv from "dotenv";
import { sendOtp, verifyOtp } from "./otp";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const sent = await sendOtp(email);
  if (sent) res.json({ success: true });
  else res.status(500).json({ success: false });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP required" });

  const valid = verifyOtp(email, otp);
  res.json({ success: valid });
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
