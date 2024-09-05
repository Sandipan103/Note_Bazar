// required dependencies
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import cloudinaryConnect from "./config/cludinary.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from './routes/userRoutes.js';
import notesRoutes from "./routes/notesRoutes.js";
import fileUpload from 'express-fileupload';

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
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// connect with db
dbConnect();

// connect to cludinary
cloudinaryConnect();

// routing
app.use("/api/v1", authRoutes);
app.use("/api/v1", notesRoutes);
app.use("/api/v1", userRoutes);

// start server
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
