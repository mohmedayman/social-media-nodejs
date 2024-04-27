import express from "express";
import { Router } from "express";
const PostsRoutes = Router();

import PostsController from "./../../controllers/posts_controller.js";



PostsRoutes.route("/:userId")
  .post(PostsController.addPost)
  .get(PostsController.getAllPosts);
  

PostsRoutes.route("/:userId/:postId")
   .get(PostsController.getPost)
   .delete(PostsController.deletePost)
   .patch(PostsController.updatePost);
   




export { PostsRoutes };
