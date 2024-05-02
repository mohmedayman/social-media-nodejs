//
import express from "express";
import { Router } from "express";
import CheckAuthenticated from "../../middlewares/check_authenticated.js";
const CommentsRoutes = Router();

import CommentsController from './../../controllers/comments_controller.js';
import check_authenticated from "../../middlewares/check_authenticated.js";


 

CommentsRoutes.use(CheckAuthenticated()).route("/:postId")
    .post(CommentsController.addComment)


CommentsRoutes.route("/:postId")
    .get(CommentsController.getAllCommentsForPost);

CommentsRoutes.use(CheckAuthenticated()).route("/:commentId")
    .delete(CommentsController.deleteComment)
    .patch(CommentsController.updateComment);



export { CommentsRoutes };
