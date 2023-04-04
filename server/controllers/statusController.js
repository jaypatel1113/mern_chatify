import { Chat } from "../model/chatModel.js";
import { Status } from "../model/statusModel.js";

export const initialStatus = async (req, res) => {
    try {
        const { chatId } = req.body;

        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data passed into request 🫤",
            });
        }

        let users = await Chat.find({ _id: chatId }, "users");
        users = users[0].users;

        users.forEach(async (user) => {
            if (user._id.equals(req.user._id)) {
                return;
            }
            var initialStatus = await Status.create({
                user: user._id,
                chatId,
                status: "sent",
            });
            initialStatus = await initialStatus.populate("user", "name avtar");
        });
        res.status(200).json({ success: true, message: "Status Created" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const getStatus = async (req, res) => {
    try {
        var statusItems = await Status.find({chatId: req.query.chatId,})
            .populate("user", "name")
            .populate("chatId", "chatName");

        res.status(200).json({ success: true, status: statusItems });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status, chatId, userId } = req.body;

        if (!status || !chatId || !userId) {
            return res.status(400).json({
                    success: false,
                    message: "Invalid data passed into request 🫤",
                });
        }
        let initialStatus = await Status.find({
            user: userId,
            chatId,
        });
        // res.status(200).json({ success: true, status: initialStatus,});
        initialStatus = initialStatus[0];

        var statusItem = await Status.findByIdAndUpdate(
            { _id: initialStatus._id },
            { status },
            { new: true }
        )
            .populate("user", "name")
            .populate("chatId", "chatName");
            
        res.status(200).json({ success: true, status: statusItem });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
