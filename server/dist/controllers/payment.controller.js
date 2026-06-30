import { env } from "../config/env.config.js";
import { instance } from "../index.js";
import TryCatch from "../middlewares/trycatch.js";
import User from "../models/user.model.js";
import crypto from "crypto";
export const checkOut = TryCatch(async (req, res) => {
    const user_id = req.user?._id;
    if (!user_id) {
        return res.status(400).json({
            message: "No User Id",
        });
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    const subTime = user.subscription ? new Date(user.subscription).getTime() : 0;
    const now = Date.now();
    const isSubscribed = subTime > now;
    if (isSubscribed) {
        return res.status(400).json({
            message: "User Already Subscribed",
        });
    }
    const { duration } = req.body;
    let amount;
    switch (duration) {
        case 1:
            amount = 299 * 100;
            break;
        case 6:
            amount = 1499 * 100;
            break;
        default:
            return res.status(400).json({
                message: "Invalid subscription duration",
            });
    }
    const options = {
        amount,
        currency: "INR",
        notes: {
            user_id: user._id.toString(),
            duration: duration.toString(),
        },
        receipt: `receipt_${Date.now()}`
    };
    const order = await instance.orders.create(options);
    return res.status(201).json({
        order,
        success: true,
    });
});
export const paymentVerification = TryCatch(async (req, res) => {
    const user = req.user;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        const payment = await instance.payments.fetch(razorpay_payment_id);
        if (payment.status !== "captured") {
            return res.status(400).json({
                message: "Payment not captured",
            });
        }
        const order = await instance.orders.fetch(razorpay_order_id);
        const duration = Number(order.notes?.duration);
        const now = new Date();
        let expiryDays = 0;
        switch (duration) {
            case 1:
                expiryDays = 30;
                break;
            case 6:
                expiryDays = 180;
                break;
            default:
                return res.status(400).json({
                    message: "Invalid subscription duration",
                });
        }
        const expiryDate = new Date(now.getTime() + expiryDays * 24 * 60 * 60 * 1000);
        const updatedUser = await User.findByIdAndUpdate(user?._id, {
            subscription: expiryDate,
        }, { new: true });
        return res.status(200).json({
            message: "Subscription Purchased Successfully",
            success: true,
            updatedUser
        });
    }
    else {
        return res.status(400).json({
            message: "Payment Failed",
        });
    }
});
