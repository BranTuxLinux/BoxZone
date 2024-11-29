import mongoose from "mongoose";
if (!process.env.MONGODB_URI) {
  console.error("Environment variable MONGODB_URI is missing or undefined");
  throw new Error(
    "Please define the MONGODB_URI environment variable in your .env file."
  );
}
const URI: string = process.env.MONGODB_URI;
export default async function mongooseDB() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to mongodb");
  } catch (error) {
    console.error("Error connecting to mongodb:", error);
  }
}