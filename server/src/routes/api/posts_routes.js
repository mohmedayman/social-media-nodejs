import express from "express";
import { Router } from "express";
import CheckAuthenticated from "../../middlewares/check_authenticated.js";
import PostsController from "./../../controllers/posts_controller.js";
import LikesController from "./../../controllers/likes_controller.js";

const PostsRoutes = Router();

PostsRoutes.route("/").get(PostsController.getAllPosts);
PostsRoutes.route("/show/:postId").get(PostsController.getPost);
PostsRoutes.use(CheckAuthenticated())
  .route("/like/:postId")
  .patch(LikesController.likePost);

PostsRoutes.use(CheckAuthenticated())
  .route("/:postId")
  .delete(PostsController.deletePost)
  .patch(PostsController.updatePost);

PostsRoutes.use(CheckAuthenticated()).route("/").post(PostsController.addPost);

export { PostsRoutes };
