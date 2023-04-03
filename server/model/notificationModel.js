import mongoose from "mongoose";

const notificationModel = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        },
        count: {
            type: Number,
            default: 1,
        }
    },
    { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationModel);
