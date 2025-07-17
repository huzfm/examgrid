import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const otpStore = new Map<string, { otp: string; expiresAt: number }>();

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

exports.sendOtp = async function (email: string): Promise<boolean> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + OTP_EXPIRY_MS;

  otpStore.set(email, { otp, expiresAt });

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${otp}</strong><br/>This OTP will expire in 60 seconds.</p>`,
    });
    return true;
  } catch (err) {
    console.error("Failed to send OTP", err);
    return false;
  }
};

exports.verifyOtp = function (email: string, otp: string): boolean {
  const entry = otpStore.get(email);
  if (!entry) return false;

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(email); // Clean up expired OTP
    return false;
  }

  return entry.otp === otp;
};
