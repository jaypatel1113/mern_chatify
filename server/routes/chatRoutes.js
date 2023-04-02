import express from "express";
const chatRoutes = express.Router();

import { createChat, addToGroup, createGroupChat, fetchChat, removeFromGroup, renameGroup } from "../controllers/chatController.js";
import { isAuthenticated } from "../middlewares/auth.js";

chatRoutes.route("/fetch").get(isAuthenticated, fetchChat);
chatRoutes.route("/create").post(isAuthenticated, createChat);
chatRoutes.route("/group/create").post(isAuthenticated, createGroupChat);
chatRoutes.route("/group/add").put(isAuthenticated, addToGroup);
chatRoutes.route("/group/remove").put(isAuthenticated, removeFromGroup);
chatRoutes.route("/group/rename").put(isAuthenticated, renameGroup);

export { chatRoutes };
