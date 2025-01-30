import { Box, Menu, MenuItem, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { bell, bonds, cell, downArrow, home, logo, settings } from '../assets'
import OutlinedInput from './OutlinedInput'

const Navbar = () => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log("HELLLO")
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
                    columnGap: "80px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <img style={{ width: "28px", height: "28px" }} src={home} alt="" />
                    <Typography
                        sx={{
                            backgroundImage: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: "16px",
                            fontWeight: "500"
                        }}
                    >
                        Home
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <img style={{ width: "28px", height: "28px" }} src={bonds} alt="" />
                    <Typography
                        sx={{
                            backgroundImage: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: "16px",
                            fontWeight: "500"
                        }}
                    >
                        Bonds
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <img style={{ width: "28px", height: "28px" }} src={cell} alt="" />
                    <Typography
                        sx={{
                            backgroundImage: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: "16px",
                            fontWeight: "500"
                        }}
                    >
                        Cell
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <img style={{ width: "28px", height: "28px" }} src={bell} alt="" />
                    <Typography
                        sx={{
                            backgroundImage: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: "16px",
                            fontWeight: "500"
                        }}
                    >
                        Bell
                    </Typography>
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
