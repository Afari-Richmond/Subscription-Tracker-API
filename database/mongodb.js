import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";
//Check if there is a mongodb uri connection string in the environment variables
// If not, throw an error
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}
// Connect to the MongoDB string if a connection exists
// If not, throw an error
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log(`Connected to database in ${NODE_ENV}, mode`);
  } catch (error) {
    console.log("Error connecting to Database:", error.message);
  }
};

export default connectToDatabase;
