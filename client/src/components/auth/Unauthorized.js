import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleRedirect = () => {
    // Redirect based on role
    if (userRole === "Master") {
      navigate("/MasterService");
    } else if (userRole === "Worker") {
      navigate("/WorkerService");
    } else {
      navigate("/");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      p={3}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" paragraph>
        You don't have permission to access this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirect}
        sx={{ mt: 2 }}
      >
        Go to your dashboard
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;