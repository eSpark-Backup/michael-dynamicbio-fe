import { Avatar, Card, CardContent, Typography, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { profilePicture, three_vertical_dots, three_vertical_dots_white } from '../assets';

const PulseProfileCard = ({ userImage, userRole, description, time, activeItem, id, HandleClick }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screens

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row", // Column on small screens, row otherwise
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
                />
            </div>
        </Card>
    );
}

export default PulseProfileCard;
