import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import OutlinedInput from './outline-input'
import { noPosts, searchIcon } from '../assets'

const GroupRequests = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
            <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Stack direction={"column"}>
                    <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#171717" }}>Automatic member approval</Typography>
                        <Box sx={{ background: "#d3d3d3", p: "5px 10px", borderRadius: "4px" }}>
                            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "#171717" }}>Off</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>Select members who can join this group without admin approval. <span style={{ fontSize: "14px", fontWeight: "600", color: "#505050" }}>Learn more</span></Typography>
                </Stack>
                <Box sx={{ p: "6px 15px", border: "1px solid #E4E4E4", borderRadius: "21px", position: "relative" }}>
                    <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>Set up</Typography>
                    <Box
                        sx={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "purple",
                            borderRadius: "4px",
                            transform: "rotate(45deg)",
                            position: "absolute",
                            right: "-5px",
                            top: "-3px"
                        }}
                    />


                </Box>
            </Paper>
            <Paper sx={{ display: "flex", flexDirection: "column", rowGap: "10px", alignItems: "center", justifyContent: "center" }}>
                <img src={noPosts} alt="" />
                <Typography sx={{ fontSize: "20px", fontWeight: "500", color: "#171717" }}>No requests to review</Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "400", color: "#505050", textAlign: "center" }}>
                    Nice job! Check back later for new requests <br />to join your group.
                </Typography>
                <Box
                    sx={{
                        width: "150px",
                        height: "36px",
                        borderRadius: "2px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "white",
                        position: "relative",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: "8px",
                            padding: "1px",
                            background:
                                "linear-gradient(185.13deg, #37A1F7 49.98%, #1877F2 87.01%)",
                            mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                            WebkitMask:
                                "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                            WebkitMaskComposite: "destination-out",
                            maskComposite: "exclude",
                        },
                        cursor: "pointer",
                    }}
                >
                    <Typography variant="gradientText">View group posts</Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default GroupRequests
