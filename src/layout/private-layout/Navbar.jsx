import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import { OutlinedInput } from "../../components";
import {
  bellActive,
  bondsActive,
  cellActive,
  downArrow,
  homeActive,
  logo,
  settings,
  HomeBlack,
  bondBlack,
  cellBlack,
  bellBlack,
  searchIcon,
} from "../../assets";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { handleChange } from "../../store/slices/search";
import { logout } from "../../store/slices/auth";
import { api } from "../../services/rtk";

const Navbar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:1280px)");
  const open = Boolean(anchorEl);
  const [activeItem, setActiveItem] = useState("Home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const token = window.localStorage.getItem("token")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = useMemo(
    () => [
      {
        name: "Home",
        activeIcon: homeActive,
        inactiveIcon: HomeBlack,
        url: "/",
      },
      {
        name: "Bonds",
        activeIcon: bondsActive,
        inactiveIcon: bondBlack,
        url: "/bonds",
      },
      {
        name: "Cell",
        activeIcon: cellActive,
        inactiveIcon: cellBlack,
        url: "/cells",
      },
      {
        name: "Pulses",
        activeIcon: bellActive,
        inactiveIcon: bellBlack,
        url: "/pulses",
      },
    ],
    []
  );

  useEffect(() => {
    const pathToNameMap = {
      "/": "Home",
      "/bonds": "Bonds",
      "/cells": "Cell",
      "/pulses": "Pulses",
    };
    setActiveItem(pathToNameMap[location?.pathname] || "Home");
  }, [location]);

  const handleNavigation = (item) => {
    setActiveItem(item.name);
    navigate(item.url);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const { search } = useSelector(state => state.search);
  const dispatch = useDispatch();
  const onInputChange = (e) => {
    dispatch(handleChange(e.target.value));
  }

  const { user } = useSelector(state => state.auth);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.light,
        height: "65px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: "10px", lg: "30px" },
      }}
    >
      <Box sx={{ width: { xs: "0px", lg: "204px" }, visibility: "hidden", border: "1px solid red" }}></Box>
      {isMobile ?
        <Box sx={{ display: "flex", pr: "5px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <img
              style={{ width: "22px", height: "22px" }}
              src={settings}
              alt=""
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  backgroundImage:
                    "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Settings
              </Typography>
              <img
                style={{ width: "12px", height: "6px" }}
                src={downArrow}
                alt=""
              />
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {
                token
                  ?
                  <>
                    <MenuItem
                      onClick={(e) => {
                        navigate(`/profile/${user?.id}`);
                        handleClose(e);
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={(e) => {
                      navigate("/settings");
                      handleClose(e);
                    }} >Settings</MenuItem>
                    {/* <MenuItem onClick={handleClose}>Privacy & Security</MenuItem> */}
                    {/* <MenuItem onClick={handleClose}>Language</MenuItem> */}
                    {/* <MenuItem onClick={handleClose}>Help</MenuItem> */}
                    <MenuItem onClick={(e) => {
                      dispatch(logout());
                      dispatch(api.util.resetApiState());
                      navigate("/login");
                      handleClose(e);
                    }}>Logout</MenuItem>
                  </>
                  :
                  <MenuItem onClick={(e) => {
                    navigate("/login");
                    handleClose(e);
                  }} sx={{ width: "245px" }}>Login</MenuItem>
              }
            </Menu>
          </Box>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: theme.palette.primary.main }}
          >
            <MenuIcon sx={{ fontSize: 30, color: theme.palette.primary.dark }} />
          </IconButton>
        </Box>
        :
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "40px",
              }}
            >
              {menuItems.map((item) => {
                const isActive = activeItem === item.name;
                return (
                  <Box
                    key={item.name}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      width: "137px",
                      minWidth: "137px",
                      textAlign: "center",
                    }}
                    onClick={() => handleNavigation(item)}
                  >
                    <img
                      style={{ width: "28px", height: "28px" }}
                      src={item.activeIcon}
                      alt={item.name}
                    />
                    <Typography
                      sx={{
                        backgroundImage: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                        color: "inherit",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: "16px",
                        fontWeight: "500",
                        position: "relative",
                        textAlign: "center",
                        "&::after": {
                          content: '""',
                          display: isActive ? "block" : "none",
                          width: "137px",
                          height: "4px",
                          background:
                            "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                          position: "absolute",
                          bottom: "-6px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              columnGap: "25px",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: "280px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <OutlinedInput
                value={search ? search : ""}
                onInputChange={onInputChange}
                sx={{ width: "280px" }}
                placeholder="Search"
                startAdornment={searchIcon}
                disabled={!token}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              <img
                style={{ width: "22px", height: "22px" }}
                src={settings}
                alt=""
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    backgroundImage:
                      "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Settings
                </Typography>
                <img
                  style={{ width: "12px", height: "6px" }}
                  src={downArrow}
                  alt=""
                />
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {
                  token
                    ?
                    <>
                      <MenuItem
                        sx={{ width: "245px" }}
                        onClick={(e) => {
                          navigate(`/profile/${user?.id}`);
                          handleClose(e);
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem onClick={(e) => {
                        navigate("/settings");
                        handleClose(e);
                      }} sx={{ width: "245px" }}>Settings</MenuItem>
                      {/* <MenuItem onClick={handleClose} sx={{ width: "245px" }}>Privacy & Security</MenuItem> */}
                      {/* <MenuItem onClick={handleClose} sx={{ width: "245px" }}>Language</MenuItem> */}
                      {/* <MenuItem onClick={handleClose} sx={{ width: "245px" }}>Help</MenuItem> */}
                      <MenuItem
                        sx={{ width: "245px" }}
                        onClick={(e) => {
                          dispatch(logout());
                          dispatch(api.util.resetApiState());
                          navigate("/login");
                          handleClose(e);
                        }}
                      >
                        Logout
                      </MenuItem>
                    </>
                    :
                    <MenuItem onClick={(e) => {
                      navigate("/login");
                      handleClose(e);
                    }} sx={{ width: "245px" }}>Login</MenuItem>
                }
              </Menu>
            </Box>
          </Box>
        </>}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            flexDirection: "column"
          }}
        >
          {menuItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <Box
                key={item.name}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  width: "100%",
                  // minWidth: "137px",
                  textAlign: "center",
                }}
                onClick={() => handleNavigation(item)}
              >
                <img
                  style={{ width: "28px", height: "28px" }}
                  src={item.activeIcon}
                  alt={item.name}
                />
                <Typography
                  sx={{
                    backgroundImage: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                    color: "inherit",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "16px",
                    fontWeight: "500",
                    position: "relative",
                    textAlign: "center",
                    "&::after": {
                      content: '""',
                      display: isActive ? "block" : "none",
                      width: "137px",
                      height: "4px",
                      background:
                        "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                      position: "absolute",
                      bottom: "-6px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    },
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <List sx={{ width: 250 }}>
          {/* {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item)}>
                <ListItemIcon>
                  <img src={activeItem === item.name ? item.activeIcon : item.inactiveIcon} alt={item.name} width="24px" />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))} */}
          <Box sx={{ width: "100%", height: "42px", display: "flex", alignItems: "center", mt: 2 }}>
            <OutlinedInput
              sx={{ width: "100%" }}
              placeholder="Search"
              startAdornment={searchIcon}
            />
          </Box>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
