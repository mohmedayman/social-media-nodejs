import express from "express";
import { Router } from "express";
const PostsRoutes = Router();

import PostsController from "./../../controllers/posts_controller.js";

PostsRoutes.route("/").get(PostsController.getAllPosts);

export { PostsRoutes };
