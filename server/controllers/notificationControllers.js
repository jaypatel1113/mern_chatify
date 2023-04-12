import { Notification } from "../model/notificationModel.js";
import { Chat } from "../model/chatModel.js";
import { User } from "../model/userModel.js";

export const addNewNotification = async (req, res) => {
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

            const alreadyExist = await Notification.findOne({
                chatId,
                user: user._id,
            });

            if (!alreadyExist) {
                var newNotification = await Notification.create({
                    user: user._id,
                    chatId,
                });
                newNotification = await newNotification.populate(
                    "user",
                    "name avtar"
                );

            } else if (alreadyExist) {
                await Notification.findByIdAndUpdate(
                    { _id: alreadyExist._id },
                    {
                        $inc: { count: 1 },
                    },
                    { new: true }
                ).populate("user", "name avtar");
            }
        });

        res.status(200).json({success: true, message: "Notification Created" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteNotification = async (req, res) => {
    const { chatId } = req.params;
    try {
        await Notification.findOneAndDelete({
            chatId,
            user: req.user._id
        });
        res.status(200).json({
            success: true,
            message: "Notication Deleted",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const fetchNotifications = async (req, res) => {
    try {
        var notificationItems = await Notification.find({
            user: req.user._id,
        }).populate("chatId", "chatName isGroupChat users sharedSecketKey");

        notificationItems = await User.populate(notificationItems, {
            path: "chatId.users",
            select: "name",
        });
        // .populate("chatId");

        if(notificationItems.length>0) {
            res.status(200).json({
                success: true,
                notification: notificationItems,
            });
        } else {
            res.status(200).json({
                success: true,
                notification: "You dont have any Notifications",
            });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
