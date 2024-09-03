/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { server, AuthContext } from "../context/UserContext.jsx"

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/login`,
        formData,
        { withCredentials: true }
      );
      toast.success(`Logged in`);
      setIsAuthenticated(true);
      Cookies.set("tokenf", response.data.token, {
        expires: 1,
      });
      // console.log("Login response:", response.data);
      navigate("/profile");
    } catch (error) {
      toast.error(`Login Failed`);
      console.error("Login error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
