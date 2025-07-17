import { Router } from "express";
const { sendOtp, verifyOtp } = require("../controllers/otp-functions");

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.get("/", (_req, res) => {
  res.send("OTP Service is running");
});

export default router;
