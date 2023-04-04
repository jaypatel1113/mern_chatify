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
            var initialStatus = await Status.findOne({
                user: user._id,
                chatId,
            });

            if(initialStatus) {
                await Status.findByIdAndUpdate({_id: initialStatus._id},{status: "sent"},{new: true});
            } else {
                await Status.create({
                    user: user._id,
                    chatId,
                    status: "sent",
                });
            }
        });
        res.status(200).json({ success: true, message: "Status Created" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const deliverStatus = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                    success: false,
                    message: "Invalid data passed into request 🫤",
                });
        }
        let initialStatus = await Status.find({
            user: userId
        });


        initialStatus.forEach(async (statusOne) => {
            if(statusOne.status === "seen") {
                return;
            }
            await Status.findByIdAndUpdate(
                    { _id: statusOne._id },
                    { status: "delivered" },
                    { new: true }
                ) 
        });
            
        res.status(200).json({ success: true, message: "status delivered" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const seenStatus = async (req, res) => {
    try {
        const { userId, chatId } = req.body;
        
        if (!userId || !chatId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data passed into request 🫤",
            });
        }
        let initialStatus = await Status.find({
            user: userId, 
            chatId
        });
        initialStatus = initialStatus[0];

        const seenItem = await Status.findByIdAndUpdate(
            { _id: initialStatus._id },
            { status: "seen" },
            { new: true }
        ) 

        res.status(200).json({ success: true, message: "status seen", status: seenItem });
        
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const getStatus = async (req, res) => {
    try {
        // const {chatId} = req?.query?.chatId;
        // console.log(chatId);
        var statusItems = await Status.find({chatId: req.query.chatId})
            .populate("user", "name avtar")
            .populate("chatId", "chatName isGroupChat")
            .find({ user: { $ne: req.user._id } });

        res.status(200).json({ success: true, status: statusItems });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};