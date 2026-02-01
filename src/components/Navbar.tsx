import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import {
    bellActive, bondsActive, cellActive, downArrow, homeActive, logo, settings, HomeBlack, bondBlack, cellBlack, bellBlack,
    searchIcon
} from '../assets'
import OutlinedInput from './OutlinedInput'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [activeItem, setActiveItem] = useState("Home");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const location = useLocation();
    const navigate = useNavigate();
    const menuItems = useMemo(
        () => [
            { name: "Home", activeIcon: homeActive, inactiveIcon: HomeBlack, url: "/" },
            { name: "Bonds", activeIcon: bondsActive, inactiveIcon: bondBlack, url: "/bonds" },
            { name: "Cell", activeIcon: cellActive, inactiveIcon: cellBlack, url: "/cells" },
            { name: "Pulses", activeIcon: bellActive, inactiveIcon: bellBlack, url: "/pulses" }
        ],
        []
    );

    useEffect(() => {
        const pathToNameMap = {
            "/": "Home",
            "/bonds": "Bonds",
            "/cells": "Cell",
            "/pulses": "Pulses"
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

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.primary.light,
                height: '65px',
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: "30px"
            }}
        >
            <img src={logo} alt="" />
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
                                <img style={{ width: "28px", height: "28px" }} src={isActive ? item.activeIcon : item.inactiveIcon} alt={item.name} />
                                <Typography
                                    sx={{
                                        backgroundImage: isActive ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "none",
                                        color: isActive ? "inherit" : "black",
                                        WebkitBackgroundClip: isActive ? "text" : "initial",
                                        WebkitTextFillColor: isActive ? "transparent" : "black",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        position: "relative",
                                        textAlign: "center",
                                        "&::after": {
                                            content: '""',
                                            display: isActive ? "block" : "none",
                                            width: "137px",
                                            height: "4px",
                                            background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                            position: "absolute",
                                            bottom: "-6px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                        }
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
                        sx={{ width: "280px" }}
                        placeholder="Search"
                        startAdornment={searchIcon}
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
                    <img style={{ width: "22px", height: "22px" }} src={settings} alt="" />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                backgroundImage: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: "16px",
                                fontWeight: "500",
                            }}
                        >
                            Settings
                        </Typography>
                        <img style={{ width: "12px", height: "6px" }} src={downArrow} alt="" />
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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Account</MenuItem>
                        <MenuItem onClick={handleClose}>Privacy & Security</MenuItem>
                        <MenuItem onClick={handleClose}>Language</MenuItem>
                        <MenuItem onClick={handleClose}>Help</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Box >
    )
}

export default Navbar
