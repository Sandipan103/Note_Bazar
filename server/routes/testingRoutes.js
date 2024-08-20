// Required dependencies
import cookieParser from "cookie-parser";
import express from "express";
import {signup} from '../controller/Auth.js';

const router = express.Router();
const app = express();

app.use(cookieParser);



router.post('/signup', signup);


// Export route
export default router;
