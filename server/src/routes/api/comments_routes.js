
import express from "express";
import { Router } from "express";
const CommentsRoutes = Router();

import CommentsController from './../../controllers/comments_controller.js';
const CommentsRouter = express.Router();


 

CommentsRoutes.route("/:userId/:postId")
    .post(CommentsController.addComment)


CommentsRoutes.route("/:postId")
    .get(CommentsController.getAllCommentsForPost);

CommentsRoutes.route("/:commentId")
    .delete(CommentsController.deleteComment)
    .patch(CommentsController.updateComment);



export { CommentsRoutes };
