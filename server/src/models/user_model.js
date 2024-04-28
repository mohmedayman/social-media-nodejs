import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.plugin(uniqueValidator);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  next();
});

userSchema.methods.comparePassword = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
