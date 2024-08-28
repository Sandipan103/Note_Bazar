/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App