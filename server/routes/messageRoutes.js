import express from "express";
const messageRoutes = express.Router();

import { fetchAllMessages, sendMessage } from "../controllers/messageControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

messageRoutes.route("/").post(isAuthenticated, sendMessage);
messageRoutes.route("/:chatId").get(isAuthenticated, fetchAllMessages);

export { messageRoutes };