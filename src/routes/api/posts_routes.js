import express from "express";
import { Router } from "express";
const PostsRoutes = Router();

import PostsController from "./../../controllers/posts_controller.js";

PostsRoutes.route("/")
  .get(PostsController.getAllPosts)
  .post(PostsController.createNewPost);

PostsRoutes.route("/:id")
  .get(PostsController.getOnePost)
  .delete(PostsController.deletePost)
  .patch(PostsController.updatePost);


export { PostsRoutes };
