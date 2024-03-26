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
  
}

export default CommentsController;
