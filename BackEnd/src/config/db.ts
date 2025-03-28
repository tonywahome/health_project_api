import mongoose from "mongoose";
import { config } from "dotenv";

config();
const db = process.env.DB_URL;

if (!db) {
  throw new Error("Database URL is not defined in the environment variables");
}

mongoose
  .connect(db, {})
  .then(() => {})
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const database = mongoose.connection;

database.on("error", (error) => {
  console.error("MongoDB connection error");
});

database.once("open", () => {
  console.log("Connected to the database");
});

export default mongoose;
