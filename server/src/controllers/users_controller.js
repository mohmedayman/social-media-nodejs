import User from "./../models/user_model.js";
import userCreateValidator from "./../validators/user_create_validator.js";
import jwt from "jsonwebtoken";

class UserController {
  static async createNewUser(req, res, next) {
    const { error, value } = userCreateValidator(req.body);
    if (error)
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    try {
      const user = await User.create(value);
      res.status(201).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      res.status(419).json({
        status: "error",
        message: err,
      });
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password.",
        });
      }

      // Check if the password is correct
      const isPasswordValid = user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password.",
        });
      }
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "90d",
        }
      );
      res.status(200).json({
        status: "success",
        data: {
          user,
          token: token,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.find();
      res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    } catch (err) {
      console.error("Error getting users:", err);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async getUserById(req, res, next) {
    try {
      const userId = req.params.id;

      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      console.error("Error getting user by ID:", err);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default UserController;
