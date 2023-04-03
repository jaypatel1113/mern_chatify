import express from "express";
const notificationRoutes = express.Router();

import { addNewNotification, deleteNotification, fetchNotifications } from "../controllers/notificationControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

notificationRoutes.route("/").get(isAuthenticated, fetchNotifications);
notificationRoutes.route("/add").post(isAuthenticated, addNewNotification);
notificationRoutes.route("/del/:chatId").delete(isAuthenticated, deleteNotification);

export { notificationRoutes };