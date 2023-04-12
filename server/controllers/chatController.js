import crypto from "crypto";

import { Chat } from "../model/chatModel.js";
import { User } from "../model/userModel.js";

// create or fetch one on one chat
export const createChat = async (req, res) => {
    try {
        const {userId} = req.body;

        if(!userId) {
            return res.status(400).json({ success: false, message: "UserId not found ❌" });
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users", "name email avtar")
            .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name email avtar",
        });


        if(isChat.length > 0) {
            return res.status(200).json({ success: true, message: "Chat Fetched ✅", chat: isChat[0] });
        } else {
            const sharedSecketKey = crypto.randomBytes(32).toString('hex');

            var chatData = {
                chatName: "OneOnOne",
                isGroupChat: false,
                users: [req.user._id, userId],
                sharedSecketKey
            }
            const chatCreate = await Chat.create(chatData);

            const fullChat = await Chat.findById(chatCreate._id).populate("users", "name email avtar");

            res.status(201).json({ success: true, message: "Chat Created ✅", chat: fullChat });
        }
        
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

// fetch all chats with particular id
export const fetchChat = async (req, res) => {
    try {
        let chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } },
        })
            .populate("users", "name email avtar")
            .populate("groupAdmin", "name email avtar")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        chats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name email avtar",
        });

        res.status(200).json({ success: true, message: "All chats fetched ✅", chat: chats });
        
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const createGroupChat = async (req, res) => {
    try {
        if (!req.body.users || !req.body.name) {
            return res.status(400).json({ success: false, message: "Please Fill all the fields 🫤" });
        }
        const grpName = req.body.name; 
        var chatName = grpName[0].toUpperCase() + grpName.substring(1);
        var users = JSON.parse(req.body.users);

        if (users.length < 2) {
            return res.status(400).json({ success: false, message: "Atleast 2 users are required to create a group chat! ✌🏻" });
        }

        users.push(req.user);

        const sharedSecketKey = crypto.randomBytes(32).toString('hex');

        const groupChat = await Chat.create({
            chatName,
            users,
            isGroupChat: true,
            groupAdmin: req.user,
            sharedSecketKey
        });

        const fullGroupChat = await Chat.findById(groupChat._id)
            .populate("users", "name email avtar")
            .populate("groupAdmin", "name email avtar");
        
        res.status(201).json({ success: true, message: "Group Created ✅", chat: fullGroupChat });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}
export const renameGroup = async (req, res) => {
    try {
        const { chatId, chatName } = req.body;
        
        const updatedChat = await Chat.findByIdAndUpdate(chatId,{chatName},{new: true,})
                                        .populate("users", "name email avtar")
                                        .populate("groupAdmin", "name email avtar");

        if(!updatedChat) {
            return res.status(400).json({ success: false, message: "Chat Not Found ❌" });
        } else {
            res.status(201).json({ success: true, message: "Group Renamed ✅", chat: updatedChat });
        }

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}
export const addToGroup = async (req, res) => {
    try {
        const { chatId, userId  } = req.body;
        
        const addMember = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { users: userId },
            },
            { new: true }
        )
            .populate("users", "name email avtar")
            .populate("groupAdmin", "name email avtar");

        if(!addMember) {
            return res.status(400).json({ success: false, message: "Chat Not Found ❌" });
        } else {
            res.status(201).json({ success: true, message: "Added to Group ✅", chat: addMember });
        }

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}
export const removeFromGroup = async (req, res) => {
    try {
        const { chatId, userId  } = req.body;
        
        const removeMember = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: { users: userId },
            },
            { new: true }
        )
            .populate("users", "name email avtar")
            .populate("groupAdmin", "name email avtar");

        if(!removeMember) {
            return res.status(400).json({ success: false, message: "Chat Not Found ❌" });
        } else if(userId == removeMember?.groupAdmin?._id) {
            return res.status(201).json({ success: true, message: "Left from Group 👈🏻", chat: removeMember });
        } else {
            res.status(201).json({ success: true, message: "Removed from Group ✅", chat: removeMember });
        }

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}