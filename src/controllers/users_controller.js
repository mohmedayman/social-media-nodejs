import User from "./../models/user_model.js";

class UserController {
  static async createNewUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Username, email, and password are required fields.",
        });
      }

      // Check if the email is already existed
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          status: "error",
          message: "Email is already registered.",
        });
      }

      // Check if the username is already exited
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(409).json({
          status: "error",
          message: "Username is already taken.",
        });
      }

      const user = await User.create({
        username,
        email,
        password,
      });

      

      res.status(201).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password.",
        });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password.",
        });
      }
      res.redirect('/');

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      console.error("Error logging in user:", err);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
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
