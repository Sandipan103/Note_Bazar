/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Modal,
  Paper,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { server, AuthContext } from "../context/UserContext.jsx";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/sendOtp`,
        formData
      );
      console.log("Otp sent : ", response.data);
      setOtp(response.data.otp);
      setIsOtpSent(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("error while otp sending : ", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        `${server}/verifyOtp`,
        { email: formData.email, otp }
      );
      console.log("OTP verification response:", response.data);
      setIsModalOpen(false);
      const response2 = await axios.post(
        `${server}/signup`,
        formData
      )
      console.log("user created successfully : ", response2);
      navigate('/profile');
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSendOtp}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                mb: 2,
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 6,
                  backgroundColor: "#1565C0",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </form>
      </Paper>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
            width: 400,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Enter OTP
          </Typography>
          <TextField
            fullWidth
            label="OTP"
            value={otp}
            onChange={handleOtpChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />
          <Box textAlign="center">
            <Button
              onClick={handleVerifyOtp}
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                mb: 2,
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 6,
                  backgroundColor: "#1565C0",
                },
              }}
            >
              Verify OTP
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};

export default SignupPage;
