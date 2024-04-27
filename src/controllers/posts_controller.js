import Post from "../models/post_model.js";
import postCreateValidator from "./../validators/post_create_validator.js";

const postController = {
  // Add a new post for a specific user
  addPost: async (req, res) => {
    const { error, value } = postCreateValidator(req.body);
    if (error)
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    try {
      const newPost = await Post.create({
        userId: req.user.id,
        content: value.content,
      });
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      res
        .status(419)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // Delete a post by post ID for a specific user
  deletePost: async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;
    try {
      const post = await Post.findOneAndDelete({ _id: postId, userId: userId });
      res.json({
        message:
          post == null ? "No Posts To Delete" : "Post deleted successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // Update a post by post ID for a specific user
  updatePost: async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;
    const { error, value } = postCreateValidator(req.body);
    if (error)
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, userId: userId },
        { content: value.content },
        { new: true }
      );
      if (updatedPost == null) {
        res.status(404).json({ message: "Post Not Found" });
      } else {
        res.json({ message: "Post updated successfully", post: updatedPost });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  getPost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findOne({ _id: postId })
        .populate("likes", "_id")
        .populate("comments");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  // Get all posts for a specific user
  getAllPosts: async (req, res) => {
    try {
      const userId = req.query.userId;
      const query = userId ? { userId: userId } : {};
      const posts = await Post.find(query).populate("likes", "_id").lean();
      res.json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};

export default postController;
