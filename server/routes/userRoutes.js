import express from "express";
const userRoutes = express.Router();

import { isAuthenticated } from "../middlewares/auth.js";
import { loginUser, logoutUser, myProfile, registerUser, getAllUsers } from "../controllers/userController.js";

userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/logout").get(isAuthenticated, logoutUser);
userRoutes.route("/getusers").get(isAuthenticated, getAllUsers);
userRoutes.route("/me").get(isAuthenticated, myProfile);

export { userRoutes };
