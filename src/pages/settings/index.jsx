import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  accountBlack, accountBlue, adBlack, adBlue, bellActive,
  bellBlack, fullEyeBlack, fullEyeBlue, lockBlack, lockBlue,
  logo2, shieldBlack, shieldBlue, user
} from '../../assets';
import { useSelector } from 'react-redux';
import VisibilitySettings from './VisibilitySettings';
import AccountSettings from './AccountSettings';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 300;

const Settings = () => {
  const { user: userData } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate()

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  const tabs = [
    {
      label: "Account Preferences",
      icon: accountBlack,
      activeIcon: accountBlue,
      component: <AccountSettings />,
    },
    {
      label: "Visibility",
      icon: fullEyeBlack,
      activeIcon: fullEyeBlue,
      component: <VisibilitySettings />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <Paper sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: '6px',
        px: '12px',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1201,
      }}>
        <img src={logo2} alt="Logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!isLargeScreen && (
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Avatar
            src={userData?.profileImage || user}
            alt="User"
            sx={{ width: 32, height: 32, cursor: "pointer" }}
            onClick={() => navigate(`/profile/${userData?.id}`)}
          />
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', pt: '68px' }}>
        <Drawer
          variant={isLargeScreen ? 'persistent' : 'temporary'}
          open={isLargeScreen ? true : mobileOpen}
          onClose={toggleDrawer(false)}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              mt: "68px",
              px: "0px"
            },
          }}
        >
          <Box sx={{ py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mb: 2 }}>
              <Avatar
                src={userData?.profileImage || user}
                sx={{ width: 40, height: 40 }}
              />
              <Typography sx={{ fontSize: 24, fontWeight: 500, ml: 2 }}>
                Settings
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
              {tabs.map((item) => {
                const isActive = item.label === activeTab.label;
                return (
                  <Box
                    key={item.label}
                    onClick={() => setActiveTab(item)}
                    sx={{
                      px: 3,
                      py: 2,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      position: "relative",
                      color: isActive ? "transparent" : "#000",
                      background: isActive
                        ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)"
                        : "transparent",
                      WebkitBackgroundClip: isActive ? "text" : "none",
                      WebkitTextFillColor: isActive ? "transparent" : "inherit",
                      "&::after": {
                        content: '""',
                        display: isActive ? "block" : "none",
                        width: "3px",
                        height: "100%",
                        background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        borderRadius: "2px",
                      },
                    }}
                  >
                    <img
                      src={isActive ? item.activeIcon : item.icon}
                      alt="Icon"
                      style={{ width: 20, height: 20 }}
                    />
                    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                      {item.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Drawer>


        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Paper sx={{ width: { xs: "100%", sm: "95%", md: "90%", lg: "60%", xl: "50%" }, px: "0px", pb: "0px" }}>
            {activeTab.component}
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
