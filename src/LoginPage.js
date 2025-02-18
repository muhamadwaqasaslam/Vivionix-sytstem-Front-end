import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'; 
import './LoginPage.css'; 
import { BASE_URL } from './config';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 4 characters');
      return;
    }
  
    setIsLoading(true);
    setApiError('');
    try {
      const response = await axios.post(`${ BASE_URL }employee/login/`, {
        email,
        password,
      });
  
      if (response.status === 200 && response.data) {
        const { message, access } = response.data; // Adjust based on actual response structure
        if (message === "Login successful" && access) {
          localStorage.setItem('authToken', access);
          navigate('/home');
        } else {
          setApiError('Invalid credentials. Please try again.');
        }
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const validatePassword = (password) => password.length >= 4; // Allow minimum length of 4 characters
  


  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box className="login-container">
      <Box className="login-box">
        <Box className="logo-container">
          <img src={logo} alt="Vivionix Logo" className="logo" />
          <Typography variant="h5" color="primary" className="company-name">
            Vivionix
          </Typography>
        </Box>
        <Typography variant="h4" className="page-title">
          Login Page
        </Typography>

        {apiError && (
          <Typography color="error" textAlign="center" mb={2}>
            {apiError}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Email ID"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          error={!!emailError}
          helperText={emailError}
          className="text-field"
        />

        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
            error={!!passwordError}
            helperText={passwordError}
            className="text-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Button
      
          variant="contained"
          color="primary"
          className="sign-in-button"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <Typography variant="body2" textAlign="center" mb={1}>
          <a href="/forgotpassword" className="link">
            Forgot password?
          </a>
        </Typography>
         
        <Typography variant="body2" textAlign="center" mb={1}>
          If you forgot your password then you can 
          <a href="/forgotpassword" className="link">
            Change password?
          </a>
        </Typography>


        <Typography variant="body2" textAlign="center" mb={3}>
          Don't have an account?{' '}
          <a href="/signup" className="link">
            Create now
          </a>
        </Typography>

        <Box className="login-with-google">
          <Typography variant="body2" mb={2}>
            or Login with
          </Typography>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            className="google-button"
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
