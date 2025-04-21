import { Avatar, Badge, Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { dummyPhoto, nextArrow, rightArrow, user } from '../assets'
import Button from './button'

const GroupSidebar = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
            <Paper sx={{ p: "0px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717", p: "25px" }}>1 member</Typography>
                <Avatar
                    src={user}
                    alt="User"
                    sx={{ width: 40, height: 40, objectFit: "fill", ml: "25px" }}
                />
                <Button sx={{ mt: "20px", width: "fit-content", height: "36px", mb: "15px", ml: "25px" }}>Invite connections</Button>
                <Box sx={{ height: "60px", borderTop: "1px solid #E5E5E5", display: 'flex', justifyContent: "center", alignItems: "center", cursor: "pointer", columnGap: "10px" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Show All</Typography>
                    <img src={rightArrow} alt="" />
                </Box>
            </Paper >
            <Paper sx={{ p: "16px 0px 0px 0px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717", pl: "25px" }}>Analytics</Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050", pl: "25px" }}>Last 15 days activity</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #E4E4E4", mt: "20px", pb: "10px", pl: "10px", width: "90%", m: "20px auto" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>0</Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: "400", color: "#505050" }}>Active members</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #E4E4E4", mt: "20px", pb: "10px", pl: "10px", width: "90%", m: "20px auto" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>0</Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: "400", color: "#505050" }}>New members</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #E4E4E4", mt: "20px", pb: "10px", pl: "10px", width: "90%", m: "20px auto" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>0</Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: "400", color: "#505050" }}>Posts</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", pb: "10px", pl: "10px", width: "90%", m: "20px auto 0px auto" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>0</Typography>
                    <Typography sx={{ fontSize: "13px", fontWeight: "400", color: "#505050" }}>Post views</Typography>
                </Box>
                <Box sx={{ height: "60px", borderTop: "1px solid #E5E5E5", display: 'flex', justifyContent: "center", alignItems: "center", cursor: "pointer", columnGap: "10px" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Show All</Typography>
                    <img src={rightArrow} alt="" />
                </Box>
            </Paper>
            <Paper>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Admin</Typography>
                <Box sx={{ display: "flex", columnGap: "10px" }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        color="success"
                    >
                        <Avatar alt="Travis Howard" src={user} />
                    </Badge>
                    <Box sx={{ display: "flex", columnGap: "5px", alignItems: "center" }}>
                        <Box>
                            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>rotten ria</Typography>
                        </Box>
                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>•</Typography>
                        <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>You</Typography>
                        <Box sx={{ p: "5px 15px", backgroundColor: "#d3d3d3" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Owner</Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            <Paper>
                <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Groups you might be interested in</Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", columnGap: "10px", pb: "15px", borderBottom: "1px solid #E4E4E4",mt:"20px" }}>
                        <img src={dummyPhoto} alt="Image" style={{ width: "40px", height: "40px", objectFit: "fill" }} />
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "2px" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Graphic Design Freelancers</Typography>
                            <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>99, 517 members</Typography>
                            <Box sx={{ border: "1px solid black", p: "8px 15px", borderRadius: "12px", width: "fit-content", mt: "10px" }}>Join</Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default GroupSidebar
