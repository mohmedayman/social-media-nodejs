import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let posts = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/posts.json`)
);

class CommentsController {
  static getAllComments(req, res, next) {
    try {
      const postId = +req.params.postId;
      console.log("postId:", postId);
      const post = posts.find((p) => p.id === postId);

      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "Post not mada found",
        });
      }

      const comments = post.comments;

      res.status(200).json({
        status: "success",
        results: comments.length,
        data: {
          comments,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  static addComment(req, res, next) {
    try {
      const postId = +req.params.postId;
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) {
        return res.status(404).json({
          status: "error",
          message: "Post with ID ${postId} not found",
        });
      }

      const requiredFields = ["author", "content", "username"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({
            status: "error",
            message: "${field} is required",
          });
        }
      }

      const newComment = {
        id: posts[postIndex].comments.length + 1, // Generating comment ID
        timestamp: new Date().toISOString(),
        ...req.body,
      };

      posts[postIndex].comments.push(newComment);

      fs.writeFile(
        `${__dirname}/../../dev-data/data/posts.json`,
        JSON.stringify(posts),
        (err) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: "Failed to save comment",
            });
          }
          res.status(201).json({
            status: "success",
            data: {
              comment: newComment,
            },
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static deleteComment(req, res, next) {
    try {
      const postId = +req.params.postId;
      const commentId = +req.params.commentId;
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }

      const commentIndex = posts[postIndex].comments.findIndex(
        (c) => c.id === commentId
      );
      if (commentIndex === -1) {
        return res.status(404).json({
          status: "error",
          message: "Comment not found",
        });
      }

      posts[postIndex].comments.splice(commentIndex, 1);

      fs.writeFile(
        `${__dirname}/../../dev-data/data/posts.json`,
        JSON.stringify(posts),
        (err) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: "Failed to delete comment",
            });
          }
          res.status(204).json({
            status: "success",
            data: null,
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static updateComment(req, res, next) {
    try {
      const postId = +req.params.postId;
      const commentId = +req.params.commentId;
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }

      const commentIndex = posts[postIndex].comments.findIndex(
        (c) => c.id === commentId
      );
      if (commentIndex === -1) {
        return res.status(404).json({
          status: "error",
          message: "Comment not found",
        });
      }

      const updatedComment = {
        ...posts[postIndex].comments[commentIndex],
        ...req.body,
      };
      posts[postIndex].comments[commentIndex] = updatedComment;

      fs.writeFile(
        `${__dirname}/../../dev-data/data/posts.json`,
        JSON.stringify(posts),
        (err) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: "Failed to update comment",
            });
          }
          res.status(200).json({
            status: "success",
            data: {
              comment: updatedComment,
            },
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default CommentsController;
