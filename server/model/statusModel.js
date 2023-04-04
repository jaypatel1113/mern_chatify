import mongoose from "mongoose";

const statusModel = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        },
        status: {
            type: String,
            enum: ['sent', 'delivered', 'seen'],
        }
    },
    { timestamps: true }
);

export const Status = mongoose.model("Status", statusModel);
