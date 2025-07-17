import { Request, Response } from "express";
const { sendOtp, verifyOtp } = require("../controllers/otp");

exports.sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const sent = await sendOtp(email);
  if (sent) res.json({ success: true });
  else res.status(500).json({ success: false });
};
exports.verifyOtp = (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP required" });

  const valid = verifyOtp(email, otp);
  res.json({ success: valid });
};
