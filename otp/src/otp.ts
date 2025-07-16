import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables first!

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!); // now it's defined ✅

const otpStore = new Map<string, string>();

export async function sendOtp(email: string): Promise<boolean> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    });
    return true;
  } catch (err) {
    console.error("Failed to send OTP", err);
    return false;
  }
}

export function verifyOtp(email: string, otp: string): boolean {
  const stored = otpStore.get(email);
  return stored === otp;
}
