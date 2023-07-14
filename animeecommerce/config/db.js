import mongoose from "mongoose";
import colors from "colors";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db".bgRed);
  } catch (error) {
    console.log(error);
  }
};
