// model required
import { User } from "../models/UserModel.js";
import { Otp } from "../models/OtpModel.js";

// dependency required
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// here we send a 6 digit otp to the user email id
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: `email is already registered`,
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpBody = await Otp.create({ email, otp });
    res.status(200).json({
      success: true,
      message: `otp send successfully`,
      otp,
    });
  } catch (error) {
    console.log("otp sending error : ", error);
    return res.status(401).json({
      success: false,
      message: `otp sending failed`,
    });
  }
};

// verify the otp
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the latest OTP for the provided email
    const latestOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    // Check if the OTP exists and matches the provided OTP
    if (latestOtp && latestOtp.otp === otp) {
      return res.status(200).json({
        success: true,
        message: "OTP verification successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }
  } catch (error) {
    console.log("OTP verification error: ", error);
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};

// complete the signup process
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = {
      id: user._id,
      email: user.email,
    };

    // Generate a JWT token for the user
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Save the token to the user document
    user.token = token;
    user.password = undefined;
    const options2 = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // after 24 hours
      httpOnly: true,
    };

    // Respond with success message and token
    res.cookie('token', token, options2).status(201).json({
      success: true,
      message: "User registered successfully, then logged in",
      token,
      user,
    });
  } catch (error) {
    console.log("Signup error: ", error);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
    });
  }
};

// login
const login = async (req, res) => {
  try {
    // fetch data
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: `all fields are required`,
      });
    }

    // find emial is registered or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(402).json({
        success: false,
        message: `email is not registered`,
      });
    }

    // match the password with user hashed password
    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword)  {
      return res.status(400).json({
        success: false,
        message: `incorrect password`,
      });
    }

    // creating payload
    const payload = {
      email: user.email,
      id: user._id,
      //  **  we can add any other detail here **
    };

    // generate jwt token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: `2h`,
    });
    user.token = token;
    user.password = undefined;
    const options2 = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // after 24 hours
      httpOnly: true,
    };
    

    // login
    res.cookie('token', token, options2).status(200).json({
      success: true,
      token,
      user,
      message: `user lgged in successfully`,
    });
  } catch (error) {
    console.log("login error : ", error);
    return res.status(401).json({
      success: false,
      message: `somthing went wrong while login`,
    });
  }
};

// logout
const logout = async (req, res) => {
  try {
    // Clearing the token cookie to log out the user
    res.clearCookie('token').status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (error) {
    console.log('logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while logging out',
    });
  }
};


export { sendOtp, verifyOtp, signup, login, logout };
