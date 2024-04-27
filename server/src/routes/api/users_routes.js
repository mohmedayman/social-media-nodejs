import express from "express";
import { Router } from "express";
const UsersRoutes = Router();

import userController from "./../../controllers/users_controller.js";

UsersRoutes.route("/:id")
  .get(userController.getUserById);

UsersRoutes.route("/")
  .get(userController.getAllUsers);


  

UsersRoutes.route("/addUser")
  .post(userController.createNewUser);





export { UsersRoutes };
