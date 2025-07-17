import { Router } from "express";
const { sendOtp, verifyOtp } = require("../controllers/otp");

const router = Router();

router.get("/", (_req, res) => {
  res.send("OTP Service is running");
});

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const sent = await sendOtp(email);
  if (sent) res.json({ success: true });
  else res.status(500).json({ success: false });
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP required" });

  const valid = verifyOtp(email, otp);
  res.json({ success: valid });
});

export default router;
