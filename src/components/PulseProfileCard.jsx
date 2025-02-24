import { Avatar, Card, CardContent, Typography, useTheme, useMediaQuery, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { bell, deleteIcon, dislike, profilePicture, three_vertical_dots, three_vertical_dots_white } from '../assets';

const PulseProfileCard = ({ userImage, userRole, description, time, activeItem, id, HandleClick }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                alignItems: isSmallScreen ? "center" : "flex-start",
                background: activeItem === id ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "#F8FCFF",
                borderRadius: "2px",
                padding: "16px",
                cursor: "pointer",
                textAlign: isSmallScreen ? "center" : "left",
            }}
            onClick={() => HandleClick(id)}
        >
            <Avatar
                src={userImage}
                alt="User Avatar"
                sx={{ width: 60, height: 60, marginBottom: isSmallScreen ? "12px" : 0, marginRight: isSmallScreen ? 0 : "16px" }}
            />

            <CardContent sx={{ padding: 0, flex: 1 }}>
                <Typography sx={{ fontWeight: 500, fontSize: "16px", color: activeItem === id ? theme.palette.primary.light : "#171717" }}>
                    {userRole}
                </Typography>
                <Typography sx={{ marginTop: "4px", fontSize: "14px", fontWeight: 400, color: activeItem === id ? theme.palette.primary.light : "#505050" }}>
                    {description}
                </Typography>
            </CardContent>

            <div style={{ display: "flex", alignItems: "center", flexDirection: isSmallScreen ? "row" : "column", marginTop: isSmallScreen ? "12px" : 0 }}>
                <Typography sx={{ marginRight: isSmallScreen ? "8px" : "0px", fontSize: "12px", fontWeight: 400, color: activeItem === id ? theme.palette.primary.light : "#505050" }}>
                    {time}
                </Typography>
                <img
                    src={activeItem === id ? three_vertical_dots_white : three_vertical_dots}
                    alt="Icon"
                    style={{ marginTop: isSmallScreen ? '0px' : '6px', width: "20px", height: "20px" }}
                    onClick={handleClick}
                />
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handleClose} sx={{ width: "224px", display: "flex", justifyContent: "center", alignItems: "center", columnGap: "5px" }}>
                    <img style={{ width: "24px", height: "24px" }} src={bell} alt="Bell" />
                    <Typography sx={{ fontSize: "12px", fontWeight: 300, color: "#505050", width: "100%" }}>Change pulse preferences</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "224px", display: "flex", justifyContent: "center", alignItems: "center", columnGap: "5px" }}>
                    <img style={{ width: "24px", height: "24px" }} src={deleteIcon} alt="Bell" />
                    <Typography sx={{ fontSize: "12px", fontWeight: 300, color: "#505050", width: "100%" }}>Delete pulse</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ width: "224px", display: "flex", justifyContent: "center", alignItems: "center", columnGap: "5px" }}>
                    <img style={{ width: "24px", height: "24px" }} src={dislike} alt="Bell" />
                    <Typography sx={{ fontSize: "12px", fontWeight: 300, color: "#505050", width: "100%" }}>Show less like this</Typography>
                </MenuItem>
            </Menu>
        </Card>
    );
}

export default PulseProfileCard;
