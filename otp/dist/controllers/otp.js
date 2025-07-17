"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ✅ Load environment variables first!
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY); // now it's defined ✅
const otpStore = new Map();
exports.sendOtp = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(email, otp);
        try {
            yield resend.emails.send({
                from: process.env.FROM_EMAIL,
                to: email,
                subject: "Your OTP Code",
                html: `<p>Your OTP is <strong>${otp}</strong></p>`,
            });
            return true;
        }
        catch (err) {
            console.error("Failed to send OTP", err);
            return false;
        }
    });
};
exports.verifyOtp = function (email, otp) {
    const stored = otpStore.get(email);
    return stored === otp;
};
