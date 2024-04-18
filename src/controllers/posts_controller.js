import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let posts = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/posts.json`)
);

class PostsController {
  static getAllPosts(req, res, next) {
    try {
      res.status(200).json({
        status: "success",
        results: posts.length,
        data: {
          posts,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static getOnePost(req, res, next) {
    try {
      const postId = +req.params.id;
      const post = posts.find((p) => p.id === postId);
      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: {
          post,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static createNewPost(req, res, next) {
    try {
      const requiredFields = ["author", "content", "username"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({
            status: "error",
            message: `${field} is required`,
          });
        }
      }

      const newID = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
      const newPost = {
        id: newID,
        comments: [],
        timestamp: new Date().toISOString(),
        ...req.body,
      };

      posts.push(newPost);

      fs.writeFile(
        `${__dirname}/../../dev-data/data/posts.json`,
        JSON.stringify(posts),
        (err) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: "Failed to save post",
            });
          }
          res.status(201).json({
            status: "success",
            data: {
              newPost,
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

  static deletePost(req, res, next) {
    try {
      const postId = +req.params.id;
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }

      posts.splice(postIndex, 1);

      fs.writeFile(
        `${__dirname}/../../dev-data/data/posts.json`,
        JSON.stringify(posts),
        (err) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: "Failed to delete post",
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

  static updatePost(req, res, next) {
    try {
      const postId = +req.params.id;
      const postIndex = posts.findIndex((p) => p.id === postId);
      if (postIndex === -1) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }

      const updatedPost = { ...posts[postIndex], ...req.body };
      posts[postIndex] = updatedPost;

      fs.writeFile(
        `${__dirname}/../../dev-data/data/posts.json`,
        JSON.stringify(posts),
        (err) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: "Failed to update post",
            });
          }
          res.status(200).json({
            status: "success",
            data: {
              post: updatedPost,
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

export default PostsController;
