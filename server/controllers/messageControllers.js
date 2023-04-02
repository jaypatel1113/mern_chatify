import { Chat } from "../model/chatModel.js";
import { Message } from "../model/messageModel.js";
import { User } from "../model/userModel.js";

export const sendMessage = async (req, res) => {
    try {
        const { content, chatId } = req.body;

        if (!content || !chatId) {
            return res.status(400).json({ success: false, message: "Invalid data passed into request 🫤" });
        }

        var newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
        };
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name avtar");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name email avtar",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.status(200).json({ success: true, message});

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const fetchAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name email avtar")
            .populate("chat");
            
        res.status(200).json({ success: true, messages});
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
