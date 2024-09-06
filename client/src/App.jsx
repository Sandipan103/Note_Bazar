/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import NotesBuyingPage from "./pages/NotesBuyingPage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/UserContext";
import MyNotesPage from "./pages/MyNotesPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notes" element={<NotesBuyingPage />} />
          <Route path="/myNotes" element={<MyNotesPage />} />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            right: 0,
            top: "100%", // Position at the middle of the screen vertically
            transform: "translateY(-50%)", // Adjust to center vertically
            margin: "50px",
            maxWidth: "100%",
            width: "250px", // Adjust width as needed
          },
        }}
      />
    </AuthProvider>
  );
};

export default App;
