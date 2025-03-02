import React, { useState } from "react";
import "./LoginPage.css";
import backgroundImage from "./image.png";
import logo from "./logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch("https://my.vivionix.com/employee/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      alert("Login Successful!");
      window.location.href = "/home"; // Redirect after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Background Image */}
      <div className="background-container">
        <div
          className="login-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="Login-form-container">
        <div className="Login-logo">
          <img src={logo} alt="Logo" className="logo" />
          <h3 className="company-Name">Vivionix</h3>
        </div>
        <div className="login-form">
          <h3>Welcome back!</h3>
          <h4>Please sign in to continue with Vivionix.</h4>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="info@vivionix.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-submit-button" type="submit">Sign In</button>
          </form>
          <div className="aonther-site">
            <a href="/forget-password">Forgot password?</a>
            <p className="create-account">
              Don't have an account? <a href="/sign-up">Create an Account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
