import { Box, Grid2, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import GroupMembers from './GroupMembers';
import GroupAdmins from './GroupAdmins';
import GroupRequests from './GroupRequests';
import GroupInvited from './GroupInvited';
import GroupBlocked from './GroupBlocked';

const GroupMembership = () => {
    const tabs = [
        {
            label: "Members",
            component: (
                <GroupMembers />
            ),
        },
        {
            label: "Admins",
            component: <GroupAdmins />
        },
        {
            label: "Requests",
            component: <GroupRequests />
        },
        {
            label: "Invited",
            component: <GroupInvited />
        },
        {
            label: "Blocked",
            component: <GroupBlocked />
        },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    return (
        <Box sx={{ margin: "20px 25px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, rowGap: "20px" }}>
                <Box sx={{ width: { xs: "100%", md: "30%", lg: "20%" } }}>
                    <Paper sx={{ p: "0px" }}>
                        {tabs?.map((item) => {
                            const isActive = item.label === activeTab.label;
                            return (
                                <Box
                                    onClick={() => setActiveTab(item)} // Missing tab switch on click
                                    sx={{
                                        p: "15px 30px",
                                        cursor: "pointer",
                                        position: "relative",
                                        background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                        "-webkit-background-clip": "text",
                                        "-webkit-text-fill-color": isActive ? "transparent" : "#000",
                                        "&::after": {
                                            content: '""',
                                            display: isActive ? "block" : "none",
                                            width: "6px",
                                            height: "100%",
                                            background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                            position: "absolute",
                                            bottom: "0px",
                                            left: "0px",
                                            borderRadius: "2px",
                                        },
                                    }}
                                >
                                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717", lineHeight: "normal" }} variant={isActive ? "gradientText" : "subtitle2"}>
                                        {item.label}
                                    </Typography>
                                </Box>
                            );
                        })}

                    </Paper>
                </Box>
                <Box sx={{ width: { xs: "100%", md: "65%", lg: "78%" } }}>
                    {activeTab?.component}
                </Box>
            </Box >
        </Box >
    )
}

export default GroupMembership
