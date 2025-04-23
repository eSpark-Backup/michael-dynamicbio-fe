import { Box, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import BondCard2 from './BondCard';
import { deleteIcon, tick, user } from '../assets';

const GroupContentSection = () => {
    const tabs = [
        {
            label: "Pending Posts",
            component: (
                <></>
            ),
        },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    return (
        <Box sx={{ margin: "20px 25px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, rowGap: "20px" }}>
                <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                    <Paper sx={{ p: "0px" }}>
                        {tabs?.map((item) => {
                            const isActive = item.label === activeTab.label;
                            return (
                                <Box
                                    onClick={() => setActiveTab(item)}
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
                <Box sx={{ width: { xs: "100%", md: "65%" }, display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Stack direction={"column"}>
                            <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>Review new posts</Typography>
                                <Box sx={{ background: "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)", p: "5px 10px", borderRadius: "4px" }}>
                                    <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#fff" }}>On</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Pending posts expire in 14 days from the posting date. <span style={{ fontSize: "14px", fontWeight: "600", color: "#505050" }}>Learn more</span></Typography>
                        </Stack>
                        <Box sx={{ p: "10px", border: "1px solid #E4E4E4", borderRadius: "12px", position: "relative" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Edit</Typography>
                        </Box>
                    </Paper>
                    <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
                        <BondCard2 userImage={user} userName={"Areeba Shakeel"} userRole={"UI/UX Designer | Product Designer | Figma"} time={"8m"} showWorldIcon showActionIcon />
                        <Typography sx={{ fontSize: "15px", fontWeight: "400", color: "#505050" }}>hhh</Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box sx={{ width: { xs: "100%", sm: "85%", md: "80%", lg: "70%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", columnGap: "5px",alignItems:"center" }}>
                                    <img src={deleteIcon} alt="Icon" />
                                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Delete</Typography>
                                </Box>
                                <Box sx={{ display: "flex", columnGap: "5px",alignItems:"center" }}>
                                    <img src={tick} alt="Icon" />
                                    <Typography sx={{ fontSize: "16px", fontWeight: "500" }} variant='gradientText'>Approve</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box >
        </Box >
    )
}

export default GroupContentSection
