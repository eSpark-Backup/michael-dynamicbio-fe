import { Box, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { bell, bonds, cell, downArrow, home, logo, settings } from '../assets'
import OutlinedInput from './OutlinedInput'

const Navbar = () => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [activeItem, setActiveItem] = useState("Home");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
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
                    {[
                        { name: "Home", icon: home },
                        { name: "Bonds", icon: bonds },
                        { name: "Cell", icon: cell },
                        { name: "Bell", icon: bell }
                    ].map((item) => (
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
                            onClick={() => setActiveItem(item.name)}
                        >
                            <img
                                style={{ width: "28px", height: "28px" }}
                                src={item.icon}
                                alt={item.name}
                            />
                            <Typography
                                sx={{
                                    backgroundImage: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    position: "relative",
                                    textAlign: "center",
                                    "&::after": {
                                        content: '""',
                                        display: activeItem === item.name ? "block" : "none",
                                        width: "137px", // Width of the ::after element
                                        height: "4px",
                                        background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                        position: "absolute",
                                        bottom: "-6px",
                                        left: "50%", // Center the ::after element horizontally
                                        transform: "translateX(-50%)", // Adjust to center based on the width
                                    }
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>


            <Box
                sx={{
                    display: "flex",
                    columnGap: "25px",
                    alignItems: "center",
                    height: "100%"
                }}
            >
                <Box
                    sx={{
                        width: "280px",
                        height: "42px",
                    }}
                >
                    <OutlinedInput />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer"
                    }}
                    onClick={handleClick}
                >
                    <img style={{ width: "22px", height: "22px" }} src={settings} alt="" />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                backgroundImage: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: "16px",
                                fontWeight: "500"
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
