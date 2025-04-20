import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Add these imports at the top of your file alongside the other imports
import {
  ErrorOutline,
  Info,
} from "@mui/icons-material";
import {
  FormControlLabel,
  Switch,
} from "@mui/material";

import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Divider,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Modal,
  TextField,
  Alert,
  Snackbar,
  useTheme,
  LinearProgress
} from "@mui/material";
import {
  Speed,
  Security,
  Upload,
  CloudQueue,
  Storage,
  Computer,
  Analytics,
  MenuBook,
  KeyboardArrowUp,
  Devices,
  Check,
  CloudUpload,
  Warning,
  Memory,
  NetworkCheck,
  Timeline,
  Timer,
  CloudDownload,
  Settings,
  People,
  DeveloperBoard,
  Close,
  Logout
} from "@mui/icons-material";
import logoImage from "../assets/images/logo.png"; // Add your logo image

// Chart components
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Add these functions after the existing data generation functions
// and before the HideOnScroll component function

// Function to generate earnings data for the chart
const generateEarningsData = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [];

  for (let i = 0; i < 7; i++) {
    data.push({
      day: daysOfWeek[i],
      earnings: parseFloat((Math.random() * 15 + 5).toFixed(2))
    });
  }

  return data;
};

// Function to generate resource allocation data for the pie chart
const generateResourceAllocationData = () => {
  // Initial resource allocation when not active
  if (!window.isResourceAllocationDataGenerated) {
    window.isResourceAllocationDataGenerated = true;
    return [
      { name: 'Available', value: 60 },
      { name: 'In Use', value: 40 },
    ];
  }

  return [
    { name: 'Available', value: 60 },
    { name: 'In Use', value: 40 },
  ];
};
// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Scroll to top component
function ScrollTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <Box
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        display: visible ? "block" : "none",
      }}
    >
      <IconButton
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          transition: "all 0.3s ease",
        }}
      >
        <KeyboardArrowUp />
      </IconButton>
    </Box>
  );
}

// Custom circular progress component with label
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        size={80}
        thickness={5}
        {...props}
        sx={{
          color: props.value < 30 ? 'success.main' :
            props.value < 70 ? 'warning.main' : 'error.main',
          ...props.sx
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

// Simulated data for charts
const generateCPUUsageData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      usage: Math.floor(Math.random() * 40) + 20,
    });
  }
  return data;
};

const generateMemoryUsageData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      usage: Math.floor(Math.random() * 30) + 30,
    });
  }
  return data;
};

const generateNodeStatusData = () => {
  return [
    { name: 'Active', value: Math.floor(Math.random() * 30) + 40 },
    { name: 'Idle', value: Math.floor(Math.random() * 15) + 5 },
    { name: 'Offline', value: Math.floor(Math.random() * 10) + 2 },
  ];
};

const COLORS = ['#2e7df3', '#6ab1ec', '#ff8042'];

const generateRecentJobsData = () => {
  return [
    { name: 'Job 1', executionTime: 240, status: 'Completed' },
    { name: 'Job 2', executionTime: 180, status: 'Completed' },
    { name: 'Job 3', executionTime: 300, status: 'Running' },
    { name: 'Job 4', executionTime: 120, status: 'Queued' },
    { name: 'Job 5', executionTime: 150, status: 'Running' },
  ];
};

// Style for modals
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};
// Complete the component implementation
const WorkerNodeDashboard = () => {
  const theme = useTheme();

  // State for dashboard data
  const [cpuUsage, setCpuUsage] = useState(32);
  const [memoryUsage, setMemoryUsage] = useState(48);
  const [networkUsage, setNetworkUsage] = useState(27);
  const [storageUsage, setStorageUsage] = useState(39);
  const [isActive, setIsActive] = useState(false);
  const [autoRent, setAutoRent] = useState(true);
  const [earnings, setEarnings] = useState(74.25);
  const [cpuUsageData, setCpuUsageData] = useState(generateCPUUsageData());
  const [memoryUsageData, setMemoryUsageData] = useState(generateMemoryUsageData());
  const [earningsData, setEarningsData] = useState(generateEarningsData());
  const [resourceAllocationData, setResourceAllocationData] = useState(generateResourceAllocationData());
  const [uptime, setUptime] = useState(0);
  const [safeThreshold, setSafeThreshold] = useState({ cpu: 80, memory: 85, storage: 90 });
  const [warnings, setWarnings] = useState([]);

  // State for modals and dialogs
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Simulated data update for dynamic effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (isActive) {
        // More variation when active
        setCpuUsage(prev => {
          const newValue = prev + (Math.random() * 8 - 3);
          return Math.max(35, Math.min(95, newValue));
        });

        setMemoryUsage(prev => {
          const newValue = prev + (Math.random() * 6 - 2);
          return Math.max(30, Math.min(90, newValue));
        });

        setNetworkUsage(prev => {
          const newValue = prev + (Math.random() * 10 - 4);
          return Math.max(15, Math.min(85, newValue));
        });
      } else {
        // Less variation when idle
        setCpuUsage(prev => {
          const newValue = prev + (Math.random() * 4 - 2);
          return Math.max(10, Math.min(40, newValue));
        });

        setMemoryUsage(prev => {
          const newValue = prev + (Math.random() * 3 - 1.5);
          return Math.max(20, Math.min(55, newValue));
        });

        setNetworkUsage(prev => {
          const newValue = prev + (Math.random() * 5 - 2.5);
          return Math.max(5, Math.min(40, newValue));
        });
      }

      setStorageUsage(prev => {
        const newValue = prev + (Math.random() * 1 - 0.5);
        return Math.max(30, Math.min(85, newValue));
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isActive]);

  // Update charts data periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsageData(generateCPUUsageData());
      setMemoryUsageData(generateMemoryUsageData());
      setEarningsData(generateEarningsData());
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // Track uptime when active
  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setUptime(prev => prev + 1);
        
        // Update earnings while active (approximately $0.025 per hour)
        setEarnings(prev => prev + 0.025 / 60);
      }, 60000); // Every minute
    }
    
    return () => clearInterval(timer);
  }, [isActive]);

  // Check for resource threshold warnings
  useEffect(() => {
    const newWarnings = [];
    
    if (cpuUsage > safeThreshold.cpu) {
      newWarnings.push({ type: 'CPU', value: cpuUsage, threshold: safeThreshold.cpu, message: 'CPU usage exceeds safe threshold' });
    }
    
    if (memoryUsage > safeThreshold.memory) {
      newWarnings.push({ type: 'Memory', value: memoryUsage, threshold: safeThreshold.memory, message: 'Memory usage exceeds safe threshold' });
    }
    
    if (storageUsage > safeThreshold.storage) {
      newWarnings.push({ type: 'Storage', value: storageUsage, threshold: safeThreshold.storage, message: 'Storage usage exceeds safe threshold' });
    }
    
    if (newWarnings.length > 0 && newWarnings.length !== warnings.length) {
      setSnackbarMessage(`Warning: ${newWarnings[0].message}`);
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
    }
    
    setWarnings(newWarnings);
  }, [cpuUsage, memoryUsage, storageUsage, safeThreshold]);

  // Format uptime
  const formatUptime = (minutes) => {
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const mins = minutes % 60;
    
    return `${days}d ${hours}h ${mins}m`;
  };

  // Handle rent resources button click
  const handleRentResources = () => {
    setOpenConfirmDialog(true);
  };

  // Handle confirmation dialog close
  const handleConfirmClose = (confirmed) => {
    setOpenConfirmDialog(false);

    if (confirmed) {
      setIsActive(true);
      setResourceAllocationData([
        { name: 'Available', value: 20 },
        { name: 'In Use', value: 80 },
      ]);
      setSnackbarMessage('Worker node resources are now available for rent. Connected to the master node.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  // Handle stop sharing resources
  const handleStopSharing = () => {
    setIsActive(false);
    setResourceAllocationData([
      { name: 'Available', value: 60 },
      { name: 'In Use', value: 40 },
    ]);
    setSnackbarMessage('Resource sharing stopped. Disconnected from the master node.');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  // Toggle auto-rent setting
  const handleAutoRentToggle = () => {
    setAutoRent(!autoRent);
  };

  // Handle settings modal
  const handleOpenSettings = () => {
    setOpenSettingsModal(true);
  };

  // Handle settings modal close
  const handleCloseSettings = () => {
    setOpenSettingsModal(false);
  };
  // Handle logout
const handleLogout = () => {
  // Any logout logic here (clear tokens, etc)
  setSnackbarMessage('Successfully logged out');
  setSnackbarSeverity('info');
  setSnackbarOpen(true);

  // Redirect to home route after a brief delay
  setTimeout(() => {
    navigate('/');
  }, 1500);
};
const navigate = useNavigate();
  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle settings save
  const handleSaveSettings = (event) => {
    event.preventDefault();
    // Get form data and update settings
    const formData = new FormData(event.target);
    setSafeThreshold({
      cpu: Number(formData.get('cpuThreshold')),
      memory: Number(formData.get('memoryThreshold')),
      storage: Number(formData.get('storageThreshold'))
    });
    
    setAutoRent(formData.get('autoRent') === 'on');
    
    handleCloseSettings();
    setSnackbarMessage('Settings updated successfully');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  return (
    <>
      {/* Global styles */}
      <Box
        sx={{
          "@global": {
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(20px)" },
              to: { opacity: 1, transform: "translateY(0)" }
            },
            "@keyframes floatUp": {
              "0%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-10px)" },
              "100%": { transform: "translateY(0)" }
            },
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.05)" },
              "100%": { transform: "scale(1)" }
            },
            "@keyframes blink": {
              "0%": { opacity: 0.4 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0.4 }
            },
            "::-webkit-scrollbar": {
              width: "8px"
            },
            "::-webkit-scrollbar-track": {
              background: "#f1f1f1"
            },
            "::-webkit-scrollbar-thumb": {
              background: "#2e7df3",
              borderRadius: "4px"
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#1b5ec7"
            }
          }
        }}
      />

      {/* Navbar */}
      <HideOnScroll>
        <AppBar position="fixed" color="default" elevation={0} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}>
          <Container>
            <Toolbar disableGutters>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <img src={logoImage} alt="Cloud Odyssey Logo" height="40" style={{ marginRight: '10px' }} />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    background: "linear-gradient(45deg, #2e7df3, #6ab1ec)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Cloud Odyssey
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 3 }}>
                <NavLink to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      transition: "all 0.3s ease"
                    }}
                  >
                    Dashboard
                  </Typography>
                </NavLink>
                <NavLink to="/earnings" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    Earnings
                  </Typography>
                </NavLink>
                <NavLink to="/performance" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    Performance
                  </Typography>
                </NavLink>
                <NavLink to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    Settings
                  </Typography>
                </NavLink>
              </Box>

              <Box sx={{ display: 'flex', ml: 4 }}>
  <Button
    variant="outlined"
    color="primary"
    sx={{
      mr: 2,
      transition: "all 0.3s ease"
    }}
    startIcon={<Settings />}
    onClick={handleOpenSettings}
  >
    Options
  </Button>

  {isActive ? (
    <Button
      variant="contained"
      color="error"
      sx={{
        mr: 2,
        boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 20px rgba(211, 47, 47, 0.6)'
        }
      }}
      onClick={handleStopSharing}
    >
      Stop Sharing
    </Button>
  ) : (
    <Button
      variant="contained"
      sx={{
        mr: 2,
        background: 'linear-gradient(45deg, #2e7df3, #6ab1ec)',
        boxShadow: '0 4px 12px rgba(46, 125, 243, 0.3)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 20px rgba(46, 125, 243, 0.6)'
        }
      }}
      onClick={handleRentResources}
    >
      Rent Resources
    </Button>
  )}

  <Button
    variant="outlined"
    color="error"
    sx={{
      ml: 'auto',
      transition: "all 0.3s ease"
    }}
    startIcon={<Logout />}
    onClick={handleLogout}
  >
    Logout
  </Button>
</Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* Spacer for fixed AppBar */}

      {/* Main Dashboard Content */}
      <Box sx={{ bgcolor: '#f5f9fe', minHeight: 'calc(100vh - 64px)', pt: 3, pb: 8 }}>
        <Container>
          {/* Dashboard Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Worker Node Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor your system performance and manage resource sharing
            </Typography>
          </Box>

          {/* Resource Sharing Status Alert */}
          {isActive ? (
            <Alert
              severity="success"
              variant="filled"
              sx={{
                mb: 4,
                animation: 'pulse 2s infinite ease-in-out',
                display: 'flex',
                alignItems: 'center'
              }}
              icon={<NetworkCheck />}
              action={
                <Button
                  color="inherit"
                  size="small"
                  variant="outlined"
                  sx={{ border: '1px solid white' }}
                  onClick={handleStopSharing}
                >
                  STOP
                </Button>
              }
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Resources Currently Being Shared
                  </Typography>
                  <Typography variant="body2">
                    Connected to Master Node | Uptime: {formatUptime(uptime)} | Earnings: ${earnings.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Alert>
          ) : (
            <Alert
              severity="info"
              variant="filled"
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center'
              }}
              icon={<Computer />}
              action={
                <Button
                  color="inherit"
                  size="small"
                  variant="outlined"
                  sx={{ border: '1px solid white' }}
                  onClick={handleRentResources}
                >
                  SHARE
                </Button>
              }
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Resources Available for Sharing
                  </Typography>
                  <Typography variant="body2">
                    Not connected to any Master Node | Auto-rent: {autoRent ? 'Enabled' : 'Disabled'}
                  </Typography>
                </Box>
              </Box>
            </Alert>
          )}

          {/* Warning Alerts - Show when resources exceed thresholds */}
          {warnings.length > 0 && (
            <Alert
              severity="warning"
              sx={{
                mb: 4,
                animation: 'pulse 2s infinite ease-in-out',
              }}
              icon={<ErrorOutline />}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Resource Warning Alerts
              </Typography>
              {warnings.map((warning, index) => (
                <Typography key={index} variant="body2">
                  {warning.type} usage at {warning.value.toFixed(1)}% (threshold: {warning.threshold}%)
                </Typography>
              ))}
            </Alert>
          )}

          {/* Status Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* CPU Usage */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  p: 2,
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  },
                  border: cpuUsage > safeThreshold.cpu ? '1px solid #f44336' : 'none'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    CPU Usage
                  </Typography>
                  <CircularProgressWithLabel value={cpuUsage} />
                  <Typography 
                    variant="body2" 
                    color={cpuUsage > safeThreshold.cpu ? 'error' : 'text.secondary'} 
                    sx={{ mt: 2, display: 'flex', alignItems: 'center' }}
                  >
                    {cpuUsage > safeThreshold.cpu && <Warning sx={{ fontSize: 16, mr: 0.5 }} />}
                    {cpuUsage < 30 ? 'Low' : cpuUsage < 70 ? 'Moderate' : 'High'} Utilization
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Memory Usage */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  p: 2,
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  },
                  border: memoryUsage > safeThreshold.memory ? '1px solid #f44336' : 'none'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Memory Usage
                  </Typography>
                  <CircularProgressWithLabel value={memoryUsage} />
                  <Typography 
                    variant="body2" 
                    color={memoryUsage > safeThreshold.memory ? 'error' : 'text.secondary'} 
                    sx={{ mt: 2, display: 'flex', alignItems: 'center' }}
                  >
                    {memoryUsage > safeThreshold.memory && <Warning sx={{ fontSize: 16, mr: 0.5 }} />}
                    {memoryUsage < 30 ? 'Low' : memoryUsage < 70 ? 'Moderate' : 'High'} Utilization
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Network Usage */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  p: 2,
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Network Usage
                  </Typography>
                  <CircularProgressWithLabel value={networkUsage} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {networkUsage < 30 ? 'Low' : networkUsage < 70 ? 'Moderate' : 'High'} Traffic
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Storage Usage */}
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  p: 2,
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  },
                  border: storageUsage > safeThreshold.storage ? '1px solid #f44336' : 'none'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Storage Usage
                  </Typography>
                  <CircularProgressWithLabel value={storageUsage} />
                  <Typography 
                    variant="body2" 
                    color={storageUsage > safeThreshold.storage ? 'error' : 'text.secondary'} 
                    sx={{ mt: 2, display: 'flex', alignItems: 'center' }}
                  >
                    {storageUsage > safeThreshold.storage && <Warning sx={{ fontSize: 16, mr: 0.5 }} />}
                    {storageUsage < 30 ? 'Low' : storageUsage < 70 ? 'Moderate' : 'High'} Utilization
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* Worker Node Status and Earnings */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Resource Allocation
                </Typography>
                <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resourceAllocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {resourceAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    System Status:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: isActive ? 'success.main' : 'text.secondary',
                      fontWeight: 'medium'
                    }}
                  >
                    {isActive ? (
                      <>
                        <Check sx={{ mr: 1, color: 'success.main' }} />
                        Active & Connected to Master Node
                      </>
                    ) : (
                      <>
                        <Timer sx={{ mr: 1 }} />
                        Idle - Ready for Resource Sharing
                      </>
                    )}
                  </Typography>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Earnings Overview
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      ${earnings.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Earnings
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={earningsData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                      <Legend />
                      <Bar dataKey="earnings" name="Daily Earnings ($)" fill="#2e7df3" radius={[5, 5, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Hourly Rate
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      $0.25
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Uptime
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {formatUptime(uptime)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Last Payment
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      $12.45
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Payment Status
                    </Typography>
                    <Typography variant="h6" fontWeight="medium" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Check sx={{ mr: 1, color: 'success.main', fontSize: 20 }} />
                      All Paid
                    </Typography>
                  </Grid>
                </Grid>
                </Card>
            </Grid>
          </Grid>

          {/* Performance Graphs */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  CPU Usage Trend
                </Typography>
                <Box sx={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={cpuUsageData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'CPU Usage']} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="usage"
                        name="CPU Usage (%)"
                        stroke="#2e7df3"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      {/* Add safe threshold reference line */}
                      <CartesianGrid vertical={false} />
                      <Line
                        type="monotone"
                        dataKey="threshold"
                        name="Safe Threshold"
                        stroke="#f44336"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        dot={false}
                        data={cpuUsageData.map(d => ({ ...d, threshold: safeThreshold.cpu }))}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Memory Usage Trend
                </Typography>
                <Box sx={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={memoryUsageData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Memory Usage']} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="usage"
                        name="Memory Usage (%)"
                        stroke="#2e7df3"
                        fill="#6ab1ec"
                        fillOpacity={0.3}
                      />
                      {/* Add safe threshold reference line */}
                      <Line
                        type="monotone"
                        dataKey="threshold"
                        name="Safe Threshold"
                        stroke="#f44336"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        dot={false}
                        data={memoryUsageData.map(d => ({ ...d, threshold: safeThreshold.memory }))}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* System Information */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <Card
                sx={{
                  p: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  System Information
                </Typography>
                <Grid container spacing={3} mt={1}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, bgcolor: 'rgba(46, 125, 243, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Memory color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2">
                          Hardware
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        CPU: Intel i7-10700K (8 cores)
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        RAM: 32GB DDR4 3200MHz
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        GPU: NVIDIA RTX 3070
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, bgcolor: 'rgba(46, 125, 243, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Storage color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2">
                          Storage
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Primary: 1TB NVMe SSD
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Secondary: 2TB HDD
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Available: 1.2TB
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, bgcolor: 'rgba(46, 125, 243, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <NetworkCheck color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2">
                          Network
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Speed: 1Gbps Ethernet
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        IP: 192.168.1.205
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Latency: 8ms
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, bgcolor: 'rgba(46, 125, 243, 0.05)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <DeveloperBoard color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2">
                          Software
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        OS: Ubuntu 22.04 LTS
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Node Version: 2.4.1
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last Update: 3 days ago
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Activity */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                sx={{
                  p: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Recent Activity
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 2,
                      bgcolor: 'rgba(46, 125, 243, 0.05)',
                      borderLeft: '4px solid #2e7df3'
                    }}
                  >
                    <Typography variant="subtitle2">Resource Sharing Started</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Connected to Master Node at 192.168.1.110 • 2 hours ago
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 2,
                      bgcolor: 'rgba(76, 175, 80, 0.05)',
                      borderLeft: '4px solid #4caf50'
                    }}
                  >
                    <Typography variant="subtitle2">Payment Received</Typography>
                    <Typography variant="body2" color="text.secondary">
                      $12.45 credited to account • 6 hours ago
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 2,
                      bgcolor: 'rgba(255, 152, 0, 0.05)',
                      borderLeft: '4px solid #ff9800'
                    }}
                  >
                    <Typography variant="subtitle2">CPU Usage Alert</Typography>
                    <Typography variant="body2" color="text.secondary">
                      CPU usage reached 87% (above threshold) • 8 hours ago
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 2,
                      bgcolor: 'rgba(244, 67, 54, 0.05)',
                      borderLeft: '4px solid #f44336'
                    }}
                  >
                    <Typography variant="subtitle2">Resource Sharing Stopped</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Disconnected from Master Node • 12 hours ago
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'rgba(158, 158, 158, 0.05)',
                      borderLeft: '4px solid #9e9e9e'
                    }}
                  >
                    <Typography variant="subtitle2">System Update</Typography>
                    <Typography variant="body2" color="text.secondary">
                      System updated to version 2.4.1 • 3 days ago
                    </Typography>
                  </Paper>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Confirmation Dialog for Resource Sharing */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => handleConfirmClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CloudQueue sx={{ mr: 1, color: 'primary.main' }} />
            Confirm Resource Sharing
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to make your system's resources available for rent on the network. This will allow the master node to utilize your CPU, memory, and storage resources for distributed computing tasks.
          </DialogContentText>
          <Box sx={{ mt: 3, bgcolor: 'background.paper', p: 2, borderRadius: 1, border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" gutterBottom>
              Resource Sharing Details:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  • CPU: Up to 80% utilization
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Memory: Up to 75% utilization
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Storage: 500GB available
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  • Network: 1Gbps connection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Hourly Rate: $0.25/hour
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Payment: Automatic weekly
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, bgcolor: '#f5f9fe', p: 1, borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Info sx={{ fontSize: 16, mr: 1, color: 'info.main' }} />
                You can stop sharing your resources at any time. Your system performance will be monitored to ensure that resource usage stays within safe limits.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => handleConfirmClose(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmClose(true)}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #2e7df3, #6ab1ec)',
              boxShadow: '0 4px 12px rgba(46, 125, 243, 0.3)',
            }}
            autoFocus
          >
            Start Sharing
          </Button>
        </DialogActions>
      </Dialog>

      {/* Settings Modal */}
      <Modal
        open={openSettingsModal}
        onClose={handleCloseSettings}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
              Worker Node Settings
            </Typography>
            <IconButton onClick={handleCloseSettings} size="small">
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSaveSettings}>
            <Typography variant="subtitle2" gutterBottom>
              Resource Threshold Settings
            </Typography>
            <Typography variant="caption" color="text.secondary" paragraph>
              Set the maximum safe thresholds for your system resources. Warnings will be shown when these values are exceeded.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="CPU Threshold (%)"
                  name="cpuThreshold"
                  type="number"
                  defaultValue={safeThreshold.cpu}
                  inputProps={{ min: 50, max: 95 }}
                  helperText="Range: 50-95%"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Memory Threshold (%)"
                  name="memoryThreshold"
                  type="number"
                  defaultValue={safeThreshold.memory}
                  inputProps={{ min: 50, max: 95 }}
                  helperText="Range: 50-95%"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Storage Threshold (%)"
                  name="storageThreshold"
                  type="number"
                  defaultValue={safeThreshold.storage}
                  inputProps={{ min: 50, max: 95 }}
                  helperText="Range: 50-95%"
                  size="small"
                />
              </Grid>
            </Grid>

            <Typography variant="subtitle2" gutterBottom>
              Automatic Resource Sharing
            </Typography>
            <Typography variant="caption" color="text.secondary" paragraph>
              When enabled, your system will automatically start sharing resources when connected to a trusted master node.
            </Typography>

            <FormControlLabel
              control={<Switch name="autoRent" defaultChecked={autoRent} />}
              label="Enable Auto-Rent"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button onClick={handleCloseSettings} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #2e7df3, #6ab1ec)',
                }}
              >
                Save Settings
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Scroll to Top Button */}
      <ScrollTop />
    </>
  );
};

export default WorkerNodeDashboard;