// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ChangePasswordPage from './ChangePasswordPage';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login Page */}
        <Route path="/" element={<LoginPage />} />

         {/* Route for the Sign Up Page */}
         <Route path="/signup" element={<SignUpPage />} />

         {/* Route for the forgot password Page */}
         <Route path="/forgotpassword" element={<ForgotPasswordPage />} />

         {/* Route for the Change password Page */}
         <Route path="/ChangePassword" element={<ChangePasswordPage />} />

        {/* Route for the Home Page */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
