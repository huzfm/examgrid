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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { sendOtp, verifyOtp } = require("../controllers/otp");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.send("OTP Service is running");
});
router.post("/send-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ error: "Email required" });
    const sent = yield sendOtp(email);
    if (sent)
        res.json({ success: true });
    else
        res.status(500).json({ success: false });
}));
router.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp)
        return res.status(400).json({ error: "Email and OTP required" });
    const valid = verifyOtp(email, otp);
    res.json({ success: valid });
});
exports.default = router;
