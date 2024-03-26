
import express from "express";
import { Router } from "express";
const CommentsRoutes = Router();

import CommentsController from './../../controllers/comments_controller.js';
const CommentsRouter = express.Router();


 

CommentsRoutes.route("/:postId/comments")
    .get(CommentsController.getAllComments)
    .post(CommentsController.addComment);

CommentsRoutes.route("/:postId/comments/:commentId")
    .delete(CommentsController.deleteComment)
    .patch(CommentsController.updateComment)




export { CommentsRoutes };
