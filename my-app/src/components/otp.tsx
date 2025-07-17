"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0); // seconds left to allow resend

  const sendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/send-otp", {
        email,
      });
      if (res.data.success) {
        setMessage("OTP sent successfully!");
        setStep("otp");
        setTimer(60); // start 60 second timer
      } else {
        setMessage("Failed to send OTP.");
      }
    } catch (err) {
      setMessage("Error sending OTP.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/verify-otp", {
        email,
        otp,
      });
      if (res.data.success) {
        setMessage("OTP verified successfully!");
      } else {
        setMessage("Invalid OTP.");
      }
    } catch (err) {
      setMessage("Error verifying OTP.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h1>OTP Verification</h1>

      {step === "email" ? (
        <>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          />
          <button
            onClick={sendOtp}
            disabled={loading}
            style={{ padding: "10px", width: "100%" }}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
          />
          <button
            onClick={verifyOtp}
            disabled={loading}
            style={{ padding: "10px", width: "100%" }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div style={{ marginTop: "15px" }}>
            <button
              onClick={sendOtp}
              disabled={timer > 0 || loading}
              style={{
                padding: "8px 16px",
                backgroundColor: timer > 0 ? "#ccc" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: timer > 0 ? "not-allowed" : "pointer",
              }}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </div>
        </>
      )}

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}
