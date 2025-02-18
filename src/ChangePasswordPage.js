import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, Link } from '@mui/material';
import Logo from './logo.png'; // Adjust the import path to your logo image
import './ChangePasswordPage.css'; // Import CSS for styling

const ChangePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChangePassword = () => {
    let isValid = true;

    if (!password) {
      setPasswordError('Required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Required');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      setSuccessMessage(true);
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Box className="change-password-container">
      <Box className="change-password-box">
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

        {/* Change Password Title and Description */}
        <Typography variant="h5" className="title" mb={2}>
          Change Your Password
        </Typography>
        <Typography variant="body1" className="description" mb={2}>
          Please enter your new password and confirm it below.
        </Typography>

        {/* Success Message Alert */}
        {successMessage && (
          <Alert severity="success" className="success-alert">
            Your password has been changed successfully!
          </Alert>
        )}

        {/* New Password Input Field */}
        <TextField 
          fullWidth 
          label="New Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          className="text-field"
          required
          style={{ marginBottom: '20px' }}
        />

        {/* Confirm Password Input Field */}
        <TextField 
          fullWidth
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          className="text-field "
          required
          mt={12}
        />

        <Typography variant="caption" className="required-text">
          *Required
        </Typography>

        {/* Change Password Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="change-button"
          onClick={handleChangePassword}
        >
          Change Password
        </Button>

        {/* Back to Login Link */}
        <Box textAlign="center" mt={3}>
          <Link href="/" underline="hover" variant="body2">
            Back to Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePasswordPage;
