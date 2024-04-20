import express from "express";
import { Router } from "express";
const UsersRoutes = Router();

import userController from "./../../controllers/users_controller.js";

UsersRoutes.route("/").post(userController.createNewUser);

export { UsersRoutes };
