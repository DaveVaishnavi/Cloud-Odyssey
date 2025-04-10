import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Paper,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useLoginUserMutation } from "../services/userAuthApi";
import { getToken, storeToken } from "../services/LocalStorageService";
import { setUserToken } from "../features/authSlice";
import logo from "../assets/images/login_image.png";
import "../components/LoginPage/LoginPage.css";

const UserLogin = () => {
  const [serverError, setServerError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const res = await loginUser(actualData);
      if (res.error) {
        setServerError(res.error.data.errors);
      }
      if (res.data) {
        storeToken(res.data.token);
        let { access_token } = getToken();
        dispatch(setUserToken({ access_token }));
        navigate("/Portfolio");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  let { access_token } = getToken();
  useEffect(() => {
    if (access_token) {
      dispatch(setUserToken({ access_token }));
    }
  }, [access_token, dispatch]);

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src={logo} alt="Company Logo" className="login-image" />
      </div>

      <Container component="main" className="login-form-container">
        <Paper elevation={3} className="login-paper">
          <Typography component="h1" variant="h4" className="login-title">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary" className="login-subtitle">
            Please sign in to continue
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} className="login-form">
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

            <Box className="login-options">
              <NavLink to="/sendpasswordresetemail" className="forgot-password-link">
                Forgot Password?
              </NavLink>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            {serverError.non_field_errors && (
              <Alert severity="error" className="login-error">
                {serverError.non_field_errors[0]}
              </Alert>
            )}

            <Box className="signup-prompt">
              <Typography variant="body2">
                Don't have an account?
                <NavLink to="/register" className="signup-link">
                  Sign Up
                </NavLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default UserLogin;