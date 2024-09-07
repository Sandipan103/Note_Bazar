/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext, server } from "../context/UserContext";
import axios from 'axios';
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    setLoading(true);
    try {
      // Assuming a backend endpoint for logging out
      const response = await axios.get(`${server}/logout`, { withCredentials: true });
      console.log(response);
      Cookies.remove("tokenf");
      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" component="div" className="navbar-title">
          <Button color="inherit" component={Link} to="/" className="navbar-logo">
            NoteHub
          </Button>
        </Typography>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard" className="navbar-link">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/notes" className="navbar-link">
                Buy Notes
              </Button>
              <Button color="inherit" component={Link} to="/myNotes" className="navbar-link">
                My Notes
              </Button>
              <Button color="inherit" component={Link} to="/profile" className="navbar-link">
                Profile
              </Button>
              <Button
                disabled={loading}
                onClick={logoutHandler}
                color="inherit"
                className="navbar-link"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" className="navbar-link">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup" className="navbar-link">
                Signup
              </Button>
            </>
          )}
        </div>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          className="navbar-menu-icon"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="navbar-menu"
        >
          <MenuItem onClick={handleClose} component={Link} to="/">
            Home
          </MenuItem>
          {isAuthenticated ? [
            <MenuItem key="dashboard" onClick={handleClose} component={Link} to="/dashboard">
              Dashboard
            </MenuItem>,
            <MenuItem key="notes" onClick={handleClose} component={Link} to="/notes">
              Buy Notes
            </MenuItem>,
            <MenuItem key="myNotes" onClick={handleClose} component={Link} to="/myNotes">
              My Notes
            </MenuItem>,
            <MenuItem key="profile" onClick={handleClose} component={Link} to="/profile">
              Profile
            </MenuItem>,
            <MenuItem key="logout" onClick={logoutHandler}>
              Logout
            </MenuItem>,
          ] : [
            <MenuItem key="login" onClick={handleClose} component={Link} to="/login">
              Login
            </MenuItem>,
            <MenuItem key="signup" onClick={handleClose} component={Link} to="/signup">
              Signup
            </MenuItem>
          ]}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
