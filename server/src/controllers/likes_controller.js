import Post from "../models/post_model.js";

class LikesController {
  static async likePost(req, res, next) {
    const postId = req.params.postId;
    const element = req.user.id;
    try {
      const user = await Post.updateOne({ _id: postId }, [
        {
          $set: {
            likes: {
              $cond: [
                { $in: [element, "$likes"] },
                { $setDifference: ["$likes", [element]] },
                { $concatArrays: ["$likes", [element]] },
              ],
            },
          },
        },
      ]);
      res.status(200).json({ message: "Like Toggled" });
    } catch (err) {
      res.status(419).json({
        status: "error",
        message: err,
      });
    }
  }
}

export default LikesController;
