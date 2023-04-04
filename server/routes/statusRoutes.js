import express from "express";
const statusRoutes = express.Router();

import { deliverStatus, getStatus, initialStatus, seenStatus } from "../controllers/statusController.js";
import { isAuthenticated } from "../middlewares/auth.js";

statusRoutes.route("/")
    .post(isAuthenticated, initialStatus)
    .get(isAuthenticated, getStatus);

statusRoutes.route("/deliver").put(isAuthenticated, deliverStatus);
statusRoutes.route("/seen").put(isAuthenticated, seenStatus);

export { statusRoutes };
