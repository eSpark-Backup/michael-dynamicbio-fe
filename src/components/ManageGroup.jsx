import { Box, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { dummyPhoto } from '../assets'
import GroupMembership from './GroupMembership';
import GroupContentSection from './GroupContentSection';
import GroupAnalytics from './GroupAnalytics';

const ManageGroup = () => {

    const tabs = [
        {
            label: "Membership",
            component: (
                <GroupMembership />
            ),
        },
        {
            label: "Content",
            component: <GroupContentSection />
        },
        {
            label: "Analytics",
            component: <GroupAnalytics />
        },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    return (
        <>
            <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                <Box sx={{ borderBottom: "1px solid #E4E4E4", borderTop: "1px solid #E4E4E4", p: "0px 25px", display: "flex", alignItems: "center", columnGap: "20px" }}>
                    <img src={dummyPhoto} alt="Image" style={{ width: "45px", height: "45px" }} />
                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }} variant='gradientText'>free</Typography>
                </Box>
                <Typography sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}>Management Group</Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap={5}
                    sx={{
                        background: "#FFF",
                        borderRadius: "4px",
                        padding: "18px 30px 0px 0px",
                    }}
                >
                    {tabs.map((tab) => (
                        <Typography
                            sx={{
                                cursor: "pointer",
                                position: "relative",
                                background:
                                    "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                "-webkit-background-clip": "text",
                                "-webkit-text-fill-color":
                                    tab?.label === activeTab?.label ? "transparent" : "#000",
                                textAlign: "center",
                                "&::after": {
                                    content: '""',
                                    display: tab?.label === activeTab?.label ? "block" : "none",
                                    width: { xs: "45px", md: "90px" },
                                    height: "4px",
                                    background:
                                        "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                                    position: "absolute",
                                    bottom: "-16px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    borderRadius: "2px",
                                },
                            }}
                            fontSize={{ xs: "12px", md: "14px" }}
                            fontWeight={500}
                            onClick={() => setActiveTab(tab)}
                            key={tab.label}
                        >
                            {tab.label}
                        </Typography>


                    ))}
                </Stack>
            </Paper>
            {activeTab?.component}
        </>
    )
}

export default ManageGroup
