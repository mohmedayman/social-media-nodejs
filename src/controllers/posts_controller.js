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
}

export default PostsController;
