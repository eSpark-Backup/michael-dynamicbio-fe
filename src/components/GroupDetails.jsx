import { Box, Grid2, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { arrowUpRight, bell, bulb, close, conversation, dummyPhoto, editBlue, group, info, plus, three_vertical_dots } from '../assets'
import GroupSlider from './GroupSlider'
import PostCard from './post-card'
import GroupSidebar from './GroupSidebar'

const GroupDetails = () => {
    const [showSlider, setShowSlider] = useState(true);
    const [showTip, setShowTip] = useState(true)
    const [choice, setChoice] = useState("All")
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid2 container spacing={3} sx={{
                width: { xs: "98%", md: "85%", lg: "95%" }, py: "25px", '@media(min-width:1900px)': {
                    width: '75%',
                },
            }}>
                <Grid2 size={{ xs: 12, lg: 3 }} sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    <Paper sx={{ p: "0px" }}>
                        <Box
                            sx={{
                                height: "90px",
                                borderTopRightRadius: "4px",
                                borderTopLeftRadius: "4px",
                                position: "relative",
                                backgroundImage: `url(${dummyPhoto})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                width: "100.1%"
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100px",
                                    height: "100px",
                                    border: "2px solid #fff",
                                    position: "absolute",
                                    top: "40px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    backgroundImage: `url(${dummyPhoto})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    borderRadius: "50%",
                                }}
                            />
                        </Box>
                        <Box sx={{ mt: "70px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: "4px" }}>
                            <Box sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "17px", fontWeight: "500", color: "#171717" }}>rotten ria</Typography>
                                <Box sx={{ p: "5px 15px", backgroundColor: "#d3d3d3" }}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Owner</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ fontSize: "13px", fontWeight: "400", color: "#505050" }}>Group created: Mar 2025</Typography>
                        </Box>
                        <Box sx={{ mt: "40px", px: "20px", display: "flex", flexDirection: "column", rowGap: "10px", pb: "20px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "13px", fontWeight: "400", color: "#505050" }}>Pending posts</Typography>
                                <Typography sx={{ fontSize: "13px", fontWeight: "400" }} variant='gradientText'>0</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "13px", fontWeight: "400", color: "#505050" }}>Requests to join</Typography>
                                <Typography sx={{ fontSize: "13px", fontWeight: "400" }} variant='gradientText'>0</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ height: "60px", borderTop: "1px solid #E5E5E5", display: 'flex', justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Manage group</Typography>
                        </Box>
                        <Box sx={{ height: "60px", borderTop: "1px solid #E5E5E5", display: 'flex', justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Edit group</Typography>
                        </Box>
                    </Paper>
                    <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "0px", p: "0px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px", p: "20px" }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: "400", color: "#171717" }}>Recent</Typography>
                            <Box sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: "400", color: "#505050" }}>mocking</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px", p: "20px" }}>
                            <Typography sx={{ fontSize: "17px", fontWeight: "500" }} variant='gradientText'>Groups</Typography>
                            <Box sx={{ width: { xs: "100%", sm: "85%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "17px", fontWeight: "500" }} variant='gradientText'>Events</Typography>
                                <img src={plus} alt="Icon" />
                            </Box>
                            <Box sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                                    <Typography sx={{ fontSize: '14px', fontWeight: "400", color: "#505050" }}>mocking</Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: "400", color: "#505050" }}>See all</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ height: "60px", borderTop: "1px solid #E5E5E5", display: 'flex', justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Discover more</Typography>
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: 6 }} sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    <Paper sx={{ p: "0px" }}>
                        <Box sx={{ height: "200px", borderTopRightRadius: "4px", borderTopLeftRadius: "4px", position: "relative", backgroundImage: `url(${dummyPhoto})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100.1%" }}>
                            <Box sx={{ width: "128px", height: "128px", border: "2px solid #fff", position: "absolute", top: "128px", left: "15px", backgroundImage: `url(${dummyPhoto})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></Box>
                        </Box>
                        <Box sx={{ p: "20px" }}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", columnGap: "15px" }}>
                                <img src={info} alt="Icon" />
                                <img src={arrowUpRight} alt="Icon" />
                                <img src={bell} alt="Icon" />
                                <img src={editBlue} alt="Icon" />
                                <img src={three_vertical_dots} alt="Icon" />
                            </Box>
                            <Box sx={{ mt: "70px", p: "0px", display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                <Typography sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}>free</Typography>
                                <Box sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}>
                                    <img src={group} alt="Icon" style={{ width: "14px", height: "14px" }} />
                                    <Typography sx={{ fontSize: "17px", fontWeight: "400", color: "#505050" }}>Public group</Typography>
                                </Box>
                                <Typography sx={{ fontSize: "17px", fontWeight: "400" }} variant='gradientText'>Earn an Active Group badge</Typography>
                            </Box>
                        </Box>
                    </Paper>
                    {showSlider && <Paper>
                        <GroupSlider handleClose={() => setShowSlider(false)} />
                    </Paper>}
                    <Paper>
                        <PostCard />
                    </Paper>
                    {showTip && <Paper sx={{ display: "flex", columnGap: "10px" }}>
                        <img src={bulb} alt="Icon" style={{ width: "64px", height: "64px" }} />
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "2px", width: "100%" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>Your comments matter to group members</Typography>
                                <img src={close} alt="Icon" style={{ cursor: "pointer" }} onClick={() => setShowTip(false)} />
                            </Box>
                            <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#505050" }}>Group members are likely to create more posts when they get comments on their posts.</Typography>
                        </Box>
                    </Paper>}
                    <Box sx={{ display: "flex", columnGap: "15px" }}>
                        <Box sx={{ background: choice === "All" ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "transparent", p: "10px 15px", borderRadius: "12px", border: choice === "All" ? "none" : "1px solid #E4E4E4", cursor: "pointer", color: choice === "All" ? "white" : "#505050" }} onClick={() => setChoice("All")}>
                            All
                        </Box>
                        <Box sx={{ background: choice !== "All" ? "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)" : "transparent", p: "10px 15px", borderRadius: "12px", border: choice !== "All" ? "none" : "1px solid #E4E4E4", cursor: "pointer", color: choice !== "All" ? "white" : "#505050" }}
                            onClick={() => setChoice("Recommended")}
                        >
                            Recommended
                        </Box>
                    </Box>
                    <Paper sx={{ display: "flex", justifyContent: "center", flexDirection: "column", rowGap: "15px", alignItems: "center" }}>
                        <img src={conversation} alt="Image" />
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", color: "#171717" }}>No posts to show</Typography>
                        <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#505050", textAlign: "center" }}>
                            Join group to receive updates, add <br /> comments and create posts.
                        </Typography>
                    </Paper>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: 3 }}>
                    <GroupSidebar />
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default GroupDetails
