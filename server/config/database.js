import mongoose from "mongoose";
import dotenv from "dotenv";

// Configure environment variables
dotenv.config();

const dbConnect = () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((error) => {
    console.log(`error occur db not connected: ${error}`);
    process.exit(1);
  });
};

export default dbConnect;
