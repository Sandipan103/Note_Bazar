// required dependencies
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/database.js"; // Note the .js extension
import testingRoutes from "./routes/testingRoutes.js"; // Note the .js extension

// configure environment variables
dotenv.config();

const app = express();

// required env string
const PORT = process.env.PORT;

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());


// connect with db
dbConnect();

// routing
app.use("/api/v1", testingRoutes);

// start server
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
