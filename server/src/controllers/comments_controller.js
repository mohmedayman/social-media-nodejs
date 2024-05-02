import Comment from "../models/comment_model.js";
import Post from "../models/post_model.js";
import commentValidator from "../validators/comments_create_validator.js";

const commentController = {
  // Add a new comment
  addComment: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      const { content } = req.body;
      
      const { error, value } = commentValidator({ content });

      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }

      // Create a new comment
      const newComment = new Comment({ user: userId, post: postId, content: value.content });
      await newComment.save();
      
      // Fetch the post to which the comment is associated
      const post = await Post.findById(postId);
      

      // Update the comments array of the fetched post with the ID of the newly created comment
      post.comments.push(newComment._id);
      
      // Save the updated post back to the database
      await post.save();

      res.status(201).json({ 
        status: "success",
        message: "Comment created successfully", 
        comment: newComment 
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        message: "Internal server error", 
        error: error.message 
      });
    }
  },

  // Get all comments for a specific post
  getAllCommentsForPost: async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Retrieve the post by its ID
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }
  
      // Get the comment IDs from the comment array in the post object
      const commentIds = post.comments;
  
      // Fetch the comments using the retrieved comment IDs
      const comments = await Promise.all(commentIds.map(async (commentId) => {
        const comment = await Comment.findById(commentId);
        return comment;
      }));
  
      res.json({
        status: "success",
        data: {
          comments,
        },
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        message: "Internal server error", 
        error: error.message 
      });
    }
  },

  // Delete a comment
  deleteComment: async (req, res) => {
    try {
      const commentId = req.params.commentId;
      await Comment.findByIdAndDelete(commentId);
      res.json({ 
        status: "success",
        message: "Comment deleted successfully" 
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        message: "Internal server error", 
        error: error.message 
      });
    }
  },

  // Update a comment
  updateComment: async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const { content } = req.body;
      
      const { error, value } = commentValidator({ content }); 

      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }

      const updatedComment = await Comment.findByIdAndUpdate(commentId, { content: value.content }, { new: true });
      
      res.json({ 
        status: "success",
        message: "Comment updated successfully", 
        comment: updatedComment 
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        message: "Internal server error", 
        error: error.message 
      });
    }
  },

};

export default commentController;
