// Required dependencies
import cookieParser from "cookie-parser";
import express from "express";
import {sendOtp, verifyOtp, signup, login } from "../controller/Auth.js";

const router = express.Router();
const app = express();

app.use(cookieParser);



router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);
router.post('/signup', signup);
router.post('/login', login);


// Export route
export default router;
