import express from "express";
const statusRoutes = express.Router();

import { getStatus, initialStatus, updateStatus } from "../controllers/statusController.js";
import { isAuthenticated } from "../middlewares/auth.js";

statusRoutes.route("/")
    .post(isAuthenticated, initialStatus)
    .get(isAuthenticated, getStatus)
    .put(isAuthenticated, updateStatus);

export { statusRoutes };
