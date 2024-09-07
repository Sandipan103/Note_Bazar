/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext, server } from "../context/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(AuthContext);
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            className="navbar-title"
          >
            Note_Bazar
          </Button>
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/" className="navbar-link">
            Home
          </Button>
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
          className="navbar-icon"
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
          <MenuItem onClick={handleClose} component={Link} to="/" className="navbar-menu-item">
            Home
          </MenuItem>
          {isAuthenticated ? (
            <>
              <MenuItem onClick={handleClose} component={Link} to="/dashboard" className="navbar-menu-item">
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/notes" className="navbar-menu-item">
                Buy Notes
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/myNotes" className="navbar-menu-item">
                My Notes
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/profile" className="navbar-menu-item">
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler} className="navbar-menu-item">
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={handleClose} component={Link} to="/login" className="navbar-menu-item">
                Login
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/signup" className="navbar-menu-item">
                Signup
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
