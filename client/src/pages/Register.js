import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Paper,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
} from "@mui/icons-material";
import { useRegisterUserMutation } from "../services/userAuthApi";
import logo from "../assets/images/login_image.png";
import "../components/LoginPage/LoginPage.css";

// Define the API base URL
const API_BASE_URL = "http://localhost:8080";

const Registration = () => {
  const [serverError, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("Guest");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const data = new FormData(e.currentTarget);

    // Extract first and last name separately as required by the backend
    const fullName = data.get("name") || "";
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const password = data.get("password");
    const password2 = data.get("password2");

    // Client-side validation for password match
    if (password !== password2) {
      setServerError({ password2: ["Passwords do not match"] });
      return;
    }

    // Map form fields to match the backend expectations
    const actualData = {
      first_name: firstName,
      last_name: lastName,
      email: data.get("email"),
      password: password,
      phone: data.get("phone"),
      role: role,
      tc: data.get("tc") ? true : false,
    };

    try {
      // Make a direct fetch call instead of using RTK Query
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actualData),
      });

      const responseData = await response.json();
      console.log("Registration response:", responseData);

      if (!response.ok) {
        setServerError(responseData.errors || { non_field_errors: ["Registration failed"] });
        return;
      }

      // Registration successful
      setServerError({});
      setRegistrationSuccess(true);

      // Redirect to login page after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setServerError({ non_field_errors: ["An unexpected error occurred"] });
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src={logo} alt="Company Logo" className="login-image" />
      </div>

      <Container component="main" className="login-form-container">
        <Paper elevation={3} className="login-paper">
          <Typography component="h1" variant="h4" className="login-title">
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary" className="login-subtitle">
            Please complete the registration form
          </Typography>

          {registrationSuccess && (
            <Alert severity="success" className="success-alert">
              Registration successful! Redirecting to login...
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit} className="login-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  className="login-input"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(serverError.first_name || serverError.last_name)}
                  helperText={
                    serverError.first_name
                      ? serverError.first_name[0]
                      : serverError.last_name
                      ? serverError.last_name[0]
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  className="login-input"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(serverError.email)}
                  helperText={serverError.email ? serverError.email[0] : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  variant="outlined"
                  className="login-input"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(serverError.phone)}
                  helperText={serverError.phone ? serverError.phone[0] : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth className="login-input">
                  <InputLabel id="role-label">User Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={role}
                    onChange={handleRoleChange}
                    label="User Role"
                    error={Boolean(serverError.role)}
                  >
                    <MenuItem value="Worker">Worker</MenuItem>
                    <MenuItem value="Master">Master</MenuItem>
                    <MenuItem value="Guest">Guest</MenuItem>
                  </Select>
                  {serverError.role && (
                    <Typography variant="caption" color="error">
                      {serverError.role[0]}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  className="login-input"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(serverError.password)}
                  helperText={serverError.password ? serverError.password[0] : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password2"
                  name="password2"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  className="login-input"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(serverError.password2)}
                  helperText={serverError.password2 ? serverError.password2[0] : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
                  label="I agree to terms and conditions"
                  className="terms-label"
                />
                {serverError.tc && (
                  <Typography variant="caption" color="error" className="terms-error">
                    {serverError.tc[0]}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-button"
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </Button>

            {serverError.non_field_errors && (
              <Alert severity="error" className="login-error" sx={{ mt: 2 }}>
                {serverError.non_field_errors[0]}
              </Alert>
            )}

            <Box className="signup-prompt" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <NavLink to="/login" className="signup-link">
                  Sign In
                </NavLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Registration;