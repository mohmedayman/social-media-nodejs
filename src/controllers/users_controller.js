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
}

export default UserController;
