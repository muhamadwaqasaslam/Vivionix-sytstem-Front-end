import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, Link } from '@mui/material';
import Logo from './logo.png'; // Adjust the import path to your logo image
import './ForgotPasswordPage.css'; // Import CSS for styling

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleRequestPassword = () => {
    if (!email) {
      setEmailError('Required');
      setSuccessMessage(false);
    } else {
      setEmailError('');
      setSuccessMessage(true); // Show success message
      // Reset email field after submission
      setEmail('');
    }
  };

  return (
    <Box className="forgot-password-container">
      <Box className="forgot-password-box">
        {/* Company Logo and Name */}
        <Box textAlign="center" mb={4}>
          <img
            src={Logo} // The logo image imported at the top
            alt="Company Logo"
            style={{ width: '100px', height: 'auto' }}
          />
          <Typography variant="h6" component="div" gutterBottom>
            Vivionix
          </Typography>
        </Box>

        {/* Forgot Password Title and Description */}
        <Typography variant="h5" className="title" mb={2}>
          Forgot Your Password?
        </Typography>
        <Typography variant="body1" className="description" mb={2}>
          Enter your credentials below. An e-mail with a link to Reset Password
          page will be sent. The e-mail might take a few minutes to reach your
          inbox.
        </Typography>

        {/* Success Message Alert */}
        {successMessage && (
          <Alert severity="success" className="success-alert">
            Request for password change was successful!
          </Alert>
        )}

        {/* Email Input Field */}
        <TextField 
          fullWidth
          label="E-mail, User Name, or User ID"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          className="text-field"
          required
    
        />

        <Typography variant="caption" className="required-text">
          *Required
        </Typography>

        {/* Request Password Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="request-button"
          onClick={handleRequestPassword}
        >
          Request Password
        </Button>

        {/* Login Link */}
        <Box textAlign="center" mt={3}>
          <Link href="/" underline="hover" variant="body2">
            Back to Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
