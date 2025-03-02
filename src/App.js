// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUp';
import ForgotPasswordPage from './Forgetpassword';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login Page */}
        <Route path="/" element={<LoginPage />} />

         {/* Route for the Sign Up Page */}
         <Route path="/sign-up" element={<SignUpPage />} />

         {/* Route for the forgot password Page */}
         <Route path="/forget-password" element={<ForgotPasswordPage />} />


        {/* Route for the Home Page */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
