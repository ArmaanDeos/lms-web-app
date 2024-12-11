import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected : ${connectionInstance.connection.host} \n Running on http://localhost:${process.env.PORT}`
    );
  } catch (error) {
    console.log("MongoDB connection Failed !", error);
    process.exit(1);
  }
};

export default connectDB;
