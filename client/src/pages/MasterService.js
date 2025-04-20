import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

const MasterService = () => {
  const theme = useTheme();

  // State for dashboard data
  const [cpuUsage, setCpuUsage] = useState(46);
  const [memoryUsage, setMemoryUsage] = useState(62);
  const [networkUsage, setNetworkUsage] = useState(38);
  const [storageUsage, setStorageUsage] = useState(55);
  const [totalWorkerNodes, setTotalWorkerNodes] = useState(64);
  const [activeWorkerNodes, setActiveWorkerNodes] = useState(52);
  const [connectedWorkerNodes, setConnectedWorkerNodes] = useState(0);
  const [cpuUsageData, setCpuUsageData] = useState(generateCPUUsageData());
  const [memoryUsageData, setMemoryUsageData] = useState(generateMemoryUsageData());
  const [nodeStatusData, setNodeStatusData] = useState(generateNodeStatusData());
  const [recentJobsData, setRecentJobsData] = useState(generateRecentJobsData());

  // State for modals and dialogs
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isJobRunning, setIsJobRunning] = useState(false);
  const [jobStartTime, setJobStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showNodeActivity, setShowNodeActivity] = useState(false);
  const navigate = useNavigate();

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

  // Simulated data update for dynamic effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(prev => {
        const newValue = prev + (Math.random() * 4 - 2);
        return Math.max(10, Math.min(95, newValue));
      });

      setMemoryUsage(prev => {
        const newValue = prev + (Math.random() * 3 - 1.5);
        return Math.max(20, Math.min(90, newValue));
      });

      setNetworkUsage(prev => {
        const newValue = prev + (Math.random() * 5 - 2.5);
        return Math.max(5, Math.min(80, newValue));
      });

      setStorageUsage(prev => {
        const newValue = prev + (Math.random() * 1 - 0.5);
        return Math.max(30, Math.min(85, newValue));
      });

      if (isJobRunning) {
        setConnectedWorkerNodes(prev => {
          // Gradually increase connected nodes when job is running
          if (prev < activeWorkerNodes) {
            return Math.min(prev + Math.floor(Math.random() * 3), activeWorkerNodes);
          }
          return prev;
        });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [activeWorkerNodes, isJobRunning]);

  // Update charts data periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsageData(generateCPUUsageData());
      setMemoryUsageData(generateMemoryUsageData());
      setNodeStatusData(generateNodeStatusData());
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // Timer for job running
  useEffect(() => {
    let timer;
    if (isJobRunning && jobStartTime) {
      timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - jobStartTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isJobRunning, jobStartTime]);

  // Show node activity animation when connecting
  useEffect(() => {
    if (isJobRunning && connectedWorkerNodes < activeWorkerNodes) {
      setShowNodeActivity(true);
    } else {
      setShowNodeActivity(false);
    }
  }, [isJobRunning, connectedWorkerNodes, activeWorkerNodes]);

  // Format elapsed time
  const formatElapsedTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle resource request button click
  const handleRequestResources = () => {
    setOpenConfirmDialog(true);
  };

  // Handle confirmation dialog close
  const handleConfirmClose = (confirmed) => {
    setOpenConfirmDialog(false);

    if (confirmed) {
      setOpenUploadModal(true);
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) {
      setSnackbarMessage('Please select an MPI file first');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploadComplete(true);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  // Handle close upload modal
  const handleCloseUploadModal = () => {
    if (uploadComplete) {
      setIsJobRunning(true);
      setJobStartTime(Date.now());
      setConnectedWorkerNodes(Math.floor(activeWorkerNodes * 0.3)); // Initially connect 30% of active nodes

      // Update recent jobs data with the new job
      const newJob = {
        name: `Job ${recentJobsData.length + 1}`,
        executionTime: 0,
        status: 'Running'
      };
      setRecentJobsData([newJob, ...recentJobsData]);

      setSnackbarMessage('Job submitted successfully. Worker nodes are connecting...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }

    setOpenUploadModal(false);
    setUploadProgress(0);
    setUploadComplete(false);
    setSelectedFile(null);
  };

  // Handle job cancellation
  const handleCancelJob = () => {
    setIsJobRunning(false);
    setConnectedWorkerNodes(0);
    setJobStartTime(null);
    setElapsedTime(0);

    // Update recent jobs data
    const updatedJobs = [...recentJobsData];
    if (updatedJobs.length > 0 && updatedJobs[0].status === 'Running') {
      updatedJobs[0].status = 'Cancelled';
      setRecentJobsData(updatedJobs);
    }

    setSnackbarMessage('Job cancelled. All worker nodes disconnected.');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
                <NavLink to="/jobs" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    Jobs
                  </Typography>
                </NavLink>
                <NavLink to="/nodes" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    Nodes
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
  >
    Admin
  </Button>

  {isJobRunning ? (
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
      onClick={handleCancelJob}
    >
      Cancel Job
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
      onClick={handleRequestResources}
    >
      Request Compute
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
              Master Node Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor your cluster's performance and manage worker node resources
            </Typography>
          </Box>

          {/* Job Status Alert - Show when job is running */}
          {isJobRunning && (
            <Alert
              severity="info"
              variant="filled"
              sx={{
                mb: 4,
                animation: 'pulse 2s infinite ease-in-out',
                display: 'flex',
                alignItems: 'center'
              }}
              icon={<Timeline />}
              action={
                <Button
                  color="inherit"
                  size="small"
                  variant="outlined"
                  sx={{ border: '1px solid white' }}
                  onClick={handleCancelJob}
                >
                  CANCEL
                </Button>
              }
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Active MPI Job Running
                  </Typography>
                  <Typography variant="body2">
                    Connected Nodes: {connectedWorkerNodes}/{activeWorkerNodes} | Elapsed Time: {formatElapsedTime(elapsedTime)}
                  </Typography>
                </Box>
              </Box>
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
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    CPU Usage
                  </Typography>
                  <CircularProgressWithLabel value={cpuUsage} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
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
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Memory Usage
                  </Typography>
                  <CircularProgressWithLabel value={memoryUsage} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
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
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Storage Usage
                  </Typography>
                  <CircularProgressWithLabel value={storageUsage} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {storageUsage < 30 ? 'Low' : storageUsage < 70 ? 'Moderate' : 'High'} Utilization
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* Worker Nodes Status */}
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
                  Worker Nodes Status
                </Typography>
                <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={nodeStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {nodeStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} nodes`, null]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Worker Nodes:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {totalWorkerNodes}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Active Worker Nodes:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {activeWorkerNodes}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Connected Worker Nodes:</Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      color: isJobRunning ? 'success.main' : 'text.primary',
                      display: 'flex',
                      alignItems: 'center',
                      animation: showNodeActivity ? 'blink 1.5s infinite' : 'none'
                    }}
                  >
                    {connectedWorkerNodes}
                    {isJobRunning && (
                      <Check sx={{ ml: 0.5, fontSize: '1rem', color: 'success.main' }} />
                    )}
                  </Typography>
                </Box>
                {isJobRunning && connectedWorkerNodes < activeWorkerNodes && (
                  <Box sx={{ width: '100%', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Node Connection Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(connectedWorkerNodes / activeWorkerNodes) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        bgcolor: 'rgba(46, 125, 243, 0.1)'
                      }}
                    />
                  </Box>
                )}
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
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  System Resource Utilization
                </Typography>
                <Box sx={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={cpuUsageData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="usage"
                        name="CPU Usage (%)"
                        stroke="#2e7df3"
                        fillOpacity={0.3}
                        fill="url(#colorCpu)"
                      />
                      <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2e7df3" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#2e7df3" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 1,
                    bgcolor: isJobRunning ? 'rgba(46, 125, 243, 0.1)' : 'rgba(46, 125, 243, 0.05)',
                    border: isJobRunning ? '1px solid rgba(46, 125, 243, 0.3)' : '1px solid rgba(46, 125, 243, 0.1)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {isJobRunning ? (
                        <Timeline sx={{ mr: 1, color: theme.palette.primary.main }} />
                      ) : (
                        <Timer sx={{ mr: 1, color: theme.palette.info.main }} />
                      )}
                      <Typography variant="body2" color="text.secondary">
                        System Status: {isJobRunning ? (
                          <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                            Active Job Running
                          </span>
                        ) : (
                          <span style={{ color: theme.palette.info.main, fontWeight: 'bold' }}>
                            Idle - Ready for Tasks
                          </span>
                        )}
                      </Typography>
                    </Box>
                    {isJobRunning && (
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Elapsed: {formatElapsedTime(elapsedTime)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* Active Jobs & Connected Nodes */}
          <Grid container spacing={3}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Recent Jobs
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: 'primary.main' }}
                  >
                    View All
                  </Button>
                </Box>
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #eee' }}>Job Name</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #eee' }}>Execution Time</th>
                        <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #eee' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentJobsData.map((job, index) => (
                        <tr key={index}>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #f5f5f5' }}>{job.name}</td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #f5f5f5' }}>
                            {job.status === 'Running' ? (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ mr: 1 }}>In progress</Typography>
                                <CircularProgress size={16} thickness={6} />
                              </Box>
                            ) : (
                              `${Math.floor(job.executionTime / 60)}m ${job.executionTime % 60}s`
                            )}
                          </td>
                          <td style={{ padding: '12px 8px', borderBottom: '1px solid #f5f5f5' }}>
                            <Box
                              component="span"
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                display: 'inline-block',
                                bgcolor:
                                  job.status === 'Completed' ? 'rgba(76, 175, 80, 0.1)' :
                                  job.status === 'Running' ? 'rgba(33, 150, 243, 0.1)' :
                                  job.status === 'Queued' ? 'rgba(255, 152, 0, 0.1)' :
                                  'rgba(244, 67, 54, 0.1)',
                                color:
                                  job.status === 'Completed' ? 'success.main' :
                                  job.status === 'Running' ? 'primary.main' :
                                  job.status === 'Queued' ? 'warning.main' :
                                  'error.main',
                              }}
                            >
                              {job.status}
                            </Box>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Memory Usage
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ color: 'primary.main' }}
                  >
                    Details
                  </Button>
                </Box>
                <Box sx={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={memoryUsageData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="usage"
                        name="Memory Usage (%)"
                        fill="#6ab1ec"
                        radius={[4, 4, 0, 0]}
                        barSize={15}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Scroll to top button */}
      <ScrollTop />

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => handleConfirmClose(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <DialogTitle id="confirm-dialog-title" sx={{ pb: 1 }}>
          {"Request Worker Node Resources"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description" sx={{ mb: 2 }}>
            You are about to request compute resources from available worker nodes. This will allocate resources for your MPI job and will incur charges based on usage time and node count.
          </DialogContentText>
          <Box sx={{
            p: 2,
            bgcolor: 'rgba(46, 125, 243, 0.05)',
            borderRadius: 1,
            border: '1px solid rgba(46, 125, 243, 0.1)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Computer sx={{ mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Available Worker Nodes: {activeWorkerNodes}/{totalWorkerNodes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estimated cost: ${(activeWorkerNodes * 0.025).toFixed(2)}/hour
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => handleConfirmClose(false)}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmClose(true)}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #2e7df3, #6ab1ec)',
              ml: 1
            }}
            autoFocus
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload MPI File Modal */}
      <Modal
        open={openUploadModal}
        onClose={uploadComplete ? handleCloseUploadModal : undefined}
        aria-labelledby="upload-modal-title"
        aria-describedby="upload-modal-description"
      >
        <Box sx={{
          ...modalStyle,
          width: {
            xs: 'calc(100% - 32px)',
            sm: 500
          },
          maxWidth: 'calc(100% - 32px)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="upload-modal-title" variant="h6" component="h2">
              Upload MPI Job File
            </Typography>
            {uploadComplete && (
              <IconButton
                size="small"
                onClick={handleCloseUploadModal}
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Typography id="upload-modal-description" sx={{ mb: 3 }} color="text.secondary">
            Please upload your MPI job file. This file will be distributed to worker nodes for parallel execution.
          </Typography>

          {!uploadComplete ? (
            <>
              <Box
                sx={{
                  border: '2px dashed rgba(0, 0, 0, 0.12)',
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(46, 125, 243, 0.02)'
                  }
                }}
                onClick={() => document.getElementById('mpi-file-input').click()}
              >
                <input
                  type="file"
                  id="mpi-file-input"
                  accept=".c,.cpp,.py,.f90,.f,.mpi"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <CloudUpload sx={{ fontSize: 40, color: 'rgba(0, 0, 0, 0.3)', mb: 1 }} />
                <Typography variant="body1" gutterBottom>
                  {selectedFile ? selectedFile.name : 'Drag & drop your MPI file here or click to browse'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Supported formats: .c, .cpp, .py, .f90, .f, .mpi
                </Typography>
              </Box>

              {uploadProgress > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Uploading...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {uploadProgress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{ height: 6, borderRadius: 1 }}
                  />
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  onClick={() => setOpenUploadModal(false)}
                  color="inherit"
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpload}
                  variant="contained"
                  disabled={!selectedFile || (uploadProgress > 0 && uploadProgress < 100)}
                  sx={{
                    background: 'linear-gradient(45deg, #2e7df3, #6ab1ec)',
                  }}
                  startIcon={uploadProgress === 0 ? <CloudUpload /> : null}
                >
                  {uploadProgress === 0 ? 'Upload & Submit' : 'Uploading...'}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 3
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'success.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <Check sx={{ fontSize: 30, color: 'white' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Upload Complete!
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                  Your MPI file has been uploaded successfully and will be distributed to worker nodes.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCloseUploadModal}
                  sx={{
                    px: 4,
                    background: 'linear-gradient(45deg, #2e7df3, #6ab1ec)',
                  }}
                >
                  Start Job
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MasterService;