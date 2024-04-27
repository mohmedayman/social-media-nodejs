import mongoose from "mongoose";
const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("DB is connected!");
  } catch (err) {
    throw new Error(err.message);
  }
};

export default connectDB;
