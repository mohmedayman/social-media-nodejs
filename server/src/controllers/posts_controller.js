import Post from "../models/post_model.js";

const postController = {
  // Add a new post for a specific user
  addPost: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { content } = req.body;
      const newPost = new Post({ user: userId, content });
      await newPost.save();
      res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Delete a post by post ID for a specific user
  deletePost: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      await Post.findOneAndDelete({ _id: postId, user: userId });
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Update a post by post ID for a specific user
  updatePost: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      const { content } = req.body;
      const updatedPost = await Post.findOneAndUpdate({ _id: postId, user: userId }, { content }, { new: true });
      res.json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },


  getPost: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      const post = await Post.findOne({ _id: postId, user: userId }).populate("comments");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Get all posts for a specific user
  getAllPosts: async (req, res) => {
    try {
      const userId = req.params.userId;
      const posts = await Post.find({ user: userId }).populate("comments");
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },
};

export default postController;
