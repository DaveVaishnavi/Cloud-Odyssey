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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Assignment,
} from "@mui/icons-material";
import { useRegisterUserMutation } from "../services/userAuthApi";
import { storeToken } from "../services/LocalStorageService";
import logo from "../assets/images/login_image.png";
import "../components/LoginPage/LoginPage.css";

const Registration = () => {
  const [serverError, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("Guest");
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
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      role: data.get("role"),
      tc: data.get("tc"),
    };

    try {
      const res = await registerUser(actualData);
      if (res.error) {
        setServerError(res.error.data.errors);
      }
      if (res.data) {
        storeToken(res.data.token);
        navigate("/LogIn");
      }
    } catch (error) {
      console.error("Registration error:", error);
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

          <Box component="form" noValidate onSubmit={handleSubmit} className="login-form">
            <TextField
              margin="normal"
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
              error={Boolean(serverError.name)}
              helperText={serverError.name ? serverError.name[0] : ""}
            />

            <TextField
              margin="normal"
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

            <FormControl fullWidth margin="normal" className="login-input">
              <InputLabel id="role-label">User Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                label="User Role"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Assignment color="primary" />
                    </InputAdornment>
                  ),
                }}
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

            <TextField
              margin="normal"
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

            <TextField
              margin="normal"
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

            <Box className="terms-checkbox">
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
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </Button>

            {serverError.non_field_errors && (
              <Alert severity="error" className="login-error">
                {serverError.non_field_errors[0]}
              </Alert>
            )}

            <Box className="signup-prompt">
              <Typography variant="body2">
                Already have an account?
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