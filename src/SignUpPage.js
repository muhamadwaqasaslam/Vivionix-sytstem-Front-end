import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  Snackbar,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Logo from "./logo.png"; // Adjust the path to your logo
import './SignUpPage.css'; // Import the CSS file

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    cnic: "",
    address: "",
    bank_account_number: "",
    hire_date: "", // Hire date added
    department: "", // Department added
    role: "", // Role added
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);  // Snackbar state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone_number: value });
    setErrors({ ...errors, phone_number: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (
      !formData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "Invalid email format";
    if (!formData.phone_number)
      newErrors.phone_number = "Phone number is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.cnic) newErrors.cnic = "CNIC is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.bank_account_number)
      newErrors.bank_account_number = "Bank account number is required";
    if (!formData.hire_date) newErrors.hire_date = "Hire date is required"; // Hire date validation
    if (!formData.department) newErrors.department = "Department is required"; // Department validation
    if (!formData.role) newErrors.role = "Role is required"; // Role validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://192.168.31.195:8000/employee/registeration/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Registration successful:", data);
          setOpenSnackbar(true); // Show the success message
          // Optionally, reset the form or redirect the user
          setFormData({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            phone_number: "",
            password: "",
            cnic: "",
            address: "",
            bank_account_number: "",
            hire_date: "",
            department: "",
            role: "",
          });
        } else {
          const errorData = await response.json();
          console.error("Registration failed:", errorData);
          setErrors({ apiError: errorData.message || "Something went wrong." });
        }
      } catch (error) {
        console.error("Error occurred during registration:", error);
        setErrors({ apiError: "Failed to connect to the server." });
      }
    }
  };
  

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);  // Close the snackbar
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="white"
    >
      <Box
        width={700}
        p={5}
        borderRadius={8}
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
        bgcolor="white"
      >
        <Box textAlign="center" mb={4}>
          <img
            src={Logo}
            alt="Company Logo"
            style={{ width: "100px", height: "auto" }}
          />
          <Typography variant="h6" component="div" gutterBottom>
            Vivionix
          </Typography>
        </Box>

        <Typography variant="h4" textAlign="center" mb={4}>
          Create Your Account
        </Typography>

        <Grid container spacing={2}>
          {/* First Name and Last Name */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              variant="outlined"
              value={formData.first_name}
              onChange={handleInputChange}
              error={!!errors.first_name}
              helperText={errors.first_name}
              InputProps={{
                style: { height: "40px" },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              variant="outlined"
              value={formData.last_name}
              onChange={handleInputChange}
              error={!!errors.last_name}
              helperText={errors.last_name}
              InputProps={{
                style: { height: "40px" },
              }}
            />
          </Grid>

          {/* Username and Email */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              value={formData.username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{
                style: { height: "40px" },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                style: { height: "40px" },
              }}
            />
          </Grid>

          {/* Phone Number and CNIC */}
          <Grid item xs={6}>
            <PhoneInput
              country={"us"}
              value={formData.phone_number}
              onChange={handlePhoneChange}
              inputStyle={{
                width: "100%",
                height: "40px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CNIC"
              name="cnic"
              variant="outlined"
              value={formData.cnic}
              onChange={handleInputChange}
              error={!!errors.cnic}
              helperText={errors.cnic}
              InputProps={{
                style: { height: "40px" },
              }}
            />
          </Grid>
        </Grid>

        {/* Address and Bank Account Number */}
        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            variant="outlined"
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
            InputProps={{
              style: { height: "40px" },
            }}
          />
        </Grid>

        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Bank Account Number"
            name="bank_account_number"
            variant="outlined"
            value={formData.bank_account_number}
            onChange={handleInputChange}
            error={!!errors.bank_account_number}
            helperText={errors.bank_account_number}
            InputProps={{
              style: { height: "40px" },
            }}
          />
        </Grid>

        {/* Hire Date, Department, and Role */}
        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Hire Date"
            name="hire_date"
            type="date"
            variant="outlined"
            value={formData.hire_date}
            onChange={handleInputChange}
            error={!!errors.hire_date}
            helperText={errors.hire_date}
            InputProps={{
              style: { height: "40px" },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Department"
            name="department"
            variant="outlined"
            value={formData.department}
            onChange={handleInputChange}
            error={!!errors.department}
            helperText={errors.department}
            InputProps={{
              style: { height: "40px" },
            }}
          />
        </Grid>

        <Grid item xs={12} mt={2}>
          <TextField
            fullWidth
            label="Role"
            name="role"
            variant="outlined"
            value={formData.role}
            onChange={handleInputChange}
            error={!!errors.role}
            helperText={errors.role}
            InputProps={{
              style: { height: "40px" },
            }}
          />
        </Grid>

        {/* Password */}
        <Grid item xs={12} mt={2}>
  <TextField
    fullWidth
    label="Password"
    name="password"
    type={showPassword ? "text" : "password"}
    variant="outlined"
    value={formData.password}
    onChange={handleInputChange} // Ensure this is updating the password field
    error={!!errors.password}
    helperText={errors.password}
    InputProps={{
      style: { height: "50px" },
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={handleClickShowPassword}
            edge="end"
            sx={{
              backgroundColor: 'transparent', // Make background transparent
              '&:hover': {
                backgroundColor: 'transparent', // Ensure no background on hover
              },
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
</Grid>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          className="sign-up-btn"
          disabled={
            !formData.first_name ||
            !formData.last_name ||
            !formData.username ||
            !formData.email ||
            !formData.phone_number ||
            !formData.password ||
            !formData.cnic ||
            !formData.address ||
            !formData.bank_account_number ||
            !formData.hire_date ||
            !formData.department ||
            !formData.role
          }
          sx={{ mt: 2, mb: 1, height: "50px" }}
        >
          Sign Up
        </Button>

        <Typography variant="body2" textAlign="center">
          By clicking sign up, you agree to the Privacy Policy and Terms of
          Service.
        </Typography>

        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{" "}
          <a href="/" style={{ textDecoration: "none", color: "#3f51b5" }}>
            Log in!
          </a>
        </Typography>

        {/* Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Your account created successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default SignUpPage;
