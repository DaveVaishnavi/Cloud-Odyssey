import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
} from "@mui/material";
import {
  Speed,
  Security,
  SettingsEthernet,
  CloudQueue,
  Storage,
  Code,
  Analytics,
  MenuBook,
  KeyboardArrowUp,
  Devices,
  SchoolOutlined,
  BusinessOutlined,
  Science,
} from "@mui/icons-material";
import heroImage from "../assets/images/register_image.jpg"; // You'll need to add this image
import logoImage from "../assets/images/logo.png"; // Add your logo image

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

// Feature card component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
        },
        "& .feature-icon": {
          transition: "all 0.3s ease",
        },
        "&:hover .feature-icon": {
          animation: "pulse 1s ease-in-out infinite",
        }
      }}
      elevation={3}
    >
      <Box
        className="feature-icon"
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 3,
          color: "primary.main",
          animation: "floatUp 3s ease-in-out infinite",
          "@keyframes floatUp": {
            "0%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
            "100%": { transform: "translateY(0)" }
          },
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
            "100%": { transform: "scale(1)" }
          }
        }}
      >
        {icon}
      </Box>
      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Statistics component
const StatItem = ({ value, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // Animation duration in milliseconds
    const interval = 20; // Update interval in milliseconds
    const steps = duration / interval;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Box textAlign="center" p={2}>
      <Typography variant="h3" component="div" fontWeight="bold" color="primary.main">
        {count}+
      </Typography>
      <Typography variant="h6" component="div" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
};

const HomePage = () => {
  // Features data
  const features = [
    {
      icon: <CloudQueue sx={{ fontSize: 60 }} />,
      title: "Decentralized Cloud",
      description: "Harness idle computational resources to create a powerful distributed computing system without dependency on centralized data centers."
    },
    {
      icon: <Security sx={{ fontSize: 60 }} />,
      title: "Secure SSH Access",
      description: "Establish secure SSH connections to the Master Node with robust encryption mechanisms for protected communication."
    },
    {
      icon: <SettingsEthernet sx={{ fontSize: 60 }} />,
      title: "Efficient Workload Distribution",
      description: "Allocate and distribute computation workloads efficiently via OpenMPI and SLURM for maximum throughput."
    },
    {
      icon: <Storage sx={{ fontSize: 60 }} />,
      title: "Dynamic Node Management",
      description: "Worker nodes autonomously integrate and withdraw from the cluster based on real-time resource availability."
    },
    {
      icon: <Code sx={{ fontSize: 60 }} />,
      title: "Parallelized Execution",
      description: "Execute computational tasks in a parallelized fashion to maximize efficiency and reduce processing time."
    },
    {
      icon: <Analytics sx={{ fontSize: 60 }} />,
      title: "Real-time Monitoring",
      description: "Monitor performance and analyze metrics in real-time with Prometheus and Grafana visualization tools."
    },
  ];

  // Use cases
  const useCases = [
    {
      icon: <Science sx={{ fontSize: 40 }} />,
      title: "Research & Academia",
      description: "Accelerate scientific research with high-performance computing resources at a fraction of traditional cloud costs."
    },
    {
      icon: <BusinessOutlined sx={{ fontSize: 40 }} />,
      title: "Enterprise Solutions",
      description: "Scale computational capabilities for businesses without the high expense of proprietary cloud infrastructure."
    },
    {
      icon: <Devices sx={{ fontSize: 40 }} />,
      title: "IoT & Autonomous Systems",
      description: "Power V2V and V2X communication systems for autonomous vehicles and smart city infrastructure."
    },
    {
      icon: <SchoolOutlined sx={{ fontSize: 40 }} />,
      title: "Education & Training",
      description: "Provide students and researchers with hands-on experience in high-performance computing environments."
    },
  ];

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
                <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    Home
                  </Typography>
                </NavLink>
                <NavLink to="/features" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    Features
                  </Typography>
                </NavLink>
                <NavLink to="/documentation" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    Docs
                  </Typography>
                </NavLink>
                <NavLink to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    About
                  </Typography>
                </NavLink>
              </Box>

              <Box sx={{ display: 'flex', ml: 4 }}>
                <NavLink to="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      mr: 2,
                      transition: "all 0.3s ease"
                    }}
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(45deg, #2e7df3, #6ab1ec)',
                      boxShadow: '0 4px 12px rgba(46, 125, 243, 0.3)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 20px rgba(46, 125, 243, 0.6)'
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </NavLink>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* Spacer for fixed AppBar */}

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "90vh",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography
                variant="h2"
                component="h1"
                color="white"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  animation: "fadeIn 1s ease-out",
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "translateY(20px)" },
                    to: { opacity: 1, transform: "translateY(0)" }
                  }
                }}
              >
                Transform Idle Resources Into a Powerful Computing Cluster
              </Typography>
              <Typography
                variant="h5"
                color="white"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  textShadow: '0 2px 5px rgba(0,0,0,0.3)',
                  animation: "fadeIn 1s ease-out 0.3s",
                  animationFillMode: "both"
                }}
              >
                Cloud Odyssey is a sophisticated Beowulf cluster designed to harness idle computational resources,
                transforming them into a distributed cloud computing powerhouse.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  animation: "fadeIn 1s ease-out 0.6s",
                  animationFillMode: "both"
                }}
              >
                <NavLink to="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      background: 'linear-gradient(45deg, #2e7df3, #6ab1ec)',
                      boxShadow: '0 4px 15px rgba(46, 125, 243, 0.5)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 20px rgba(46, 125, 243, 0.6)'
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </NavLink>
                <NavLink to="/documentation" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      color: 'white',
                      borderColor: 'white',
                      transition: "all 0.3s ease",
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Intro Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f9fe' }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
                Next-Generation Cloud Computing
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem' }}>
                Cloud Odyssey bridges the gap between idle computational resources and demanding workloads,
                offering a cost-effective alternative to traditional cloud services. Our platform enables researchers,
                scientists, and organizations to execute complex parallel tasks without the overhead of proprietary solutions.
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderLeft: '4px solid #2e7df3',
                  backgroundColor: 'rgba(46, 125, 243, 0.05)',
                  mb: 3
                }}
              >
                <Typography variant="h6" fontWeight="500" color="primary.main" gutterBottom>
                  Cost-Efficient & Decentralized
                </Typography>
                <Typography variant="body2">
                  Reduce capital expenditures by leveraging existing infrastructure while eliminating dependency
                  on centralized cloud providers. Enjoy the benefits of an open-source framework with modular enhancements.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', height: '100%', minHeight: '400px' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '90%',
                    height: '90%',
                    border: '2px solid #2e7df3',
                    borderRadius: '10px',
                    top: '5%',
                    left: '5%',
                    zIndex: 1
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: '90%',
                    height: '90%',
                    bgcolor: 'background.paper',
                    backgroundImage: `url(/api/placeholder/600/400)`, // Replace with actual image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    top: '10%',
                    left: '10%',
                    zIndex: 2,
                    animation: "floatUp 3s ease-in-out infinite 0.2s",
                    "@keyframes floatUp": {
                      "0%": { transform: "translateY(0)" },
                      "50%": { transform: "translateY(-10px)" },
                      "100%": { transform: "translateY(0)" }
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Key Features */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              sx={{
                mb: 2,
                background: "linear-gradient(45deg, #2e7df3, #6ab1ec)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Key Features
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 2, maxWidth: '700px', mx: 'auto' }}
            >
              Discover how Cloud Odyssey transforms the way you approach high-performance computing
            </Typography>
            <Divider sx={{ width: '80px', mx: 'auto', borderWidth: 2, borderColor: 'primary.main' }} />
          </Box>

          <Grid container spacing={4} className="feature-grid">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Use Cases */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              sx={{
                mb: 2,
                background: "linear-gradient(45deg, #2e7df3, #6ab1ec)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Use Cases
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 2, maxWidth: '700px', mx: 'auto' }}
            >
              Cloud Odyssey adapts to various computational needs across different sectors
            </Typography>
            <Divider sx={{ width: '80px', mx: 'auto', borderWidth: 2, borderColor: 'primary.main' }} />
          </Box>

          <Grid container spacing={4}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                    },
                    "& .feature-icon": {
                      transition: "all 0.3s ease",
                    },
                    "&:hover .feature-icon": {
                      animation: "pulse 1s ease-in-out infinite",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.05)" },
                        "100%": { transform: "scale(1)" }
                      }
                    }
                  }}
                  elevation={2}
                >
                  <Box
                    className="feature-icon"
                    sx={{
                      color: 'primary.main',
                      mr: 2,
                      animation: "floatUp 3s ease-in-out infinite",
                      "@keyframes floatUp": {
                        "0%": { transform: "translateY(0)" },
                        "50%": { transform: "translateY(-10px)" },
                        "100%": { transform: "translateY(0)" }
                      }
                    }}
                  >
                    {useCase.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" component="h3" fontWeight="600" gutterBottom>
                      {useCase.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {useCase.description}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          backgroundImage: 'linear-gradient(135deg, #2e3445 0%, #1a1f35 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
            Ready to Start Your Cloud Odyssey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.8, maxWidth: '700px', mx: 'auto' }}>
            Join researchers, scientists, and organizations who are revolutionizing their
            computational capabilities with our distributed cloud platform.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <NavLink to="/register" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  background: 'linear-gradient(45deg, #2e7df3, #6ab1ec)',
                  boxShadow: '0 4px 15px rgba(46, 125, 243, 0.5)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(46, 125, 243, 0.6)'
                  }
                }}
              >
                Get Started Now
              </Button>
            </NavLink>
            <Button
              variant="outlined"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                color: 'white',
                borderColor: 'white',
                transition: "all 0.3s ease",
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
              startIcon={<MenuBook />}
            >
              Read Documentation
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 5, backgroundColor: '#1a1f35', color: 'white' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography
                  variant="h6"
                  component="div"
                  fontWeight="bold"
                  sx={{
                    background: "linear-gradient(45deg, #2e7df3, #6ab1ec)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Cloud Odyssey
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                Transforming idle resources into powerful computing clusters
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Social icons would go here */}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Product
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Features
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Use Cases
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Pricing
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Roadmap
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Resources
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Documentation
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                API
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Guides
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Support
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Company
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Team
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Careers
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Contact
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Legal
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mb: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                    color: "primary.light"
                  }
                }}
              >
                Security
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" sx={{ opacity: 0.6, textAlign: 'center' }}>
            © {new Date().getFullYear()} Cloud Odyssey. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Scroll to top button */}
      <ScrollTop />
    </>
  );
};

export default HomePage;