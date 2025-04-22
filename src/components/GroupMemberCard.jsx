import { Avatar, Badge, Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { three_vertical_dots, user } from '../assets'

const GroupMemberCard = ({ name, role, groupRole }) => {
    return (
        <Box sx={{ borderTop: "1px solid #E4E4E4", p: "15px 25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color="success"
                >
                    <Avatar alt="Travis Howard" src={user} sx={{ width: 43, height: 43 }} />
                </Badge>
                <Stack direction={"column"}>
                    <Box sx={{ display: "flex", columnGap: "10px" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "500", color: "#171717" }}>{name}</Typography>
                        {groupRole === "owner" && <Box sx={{ p: "2px 10px", backgroundColor: "#d3d3d3" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#171717" }}>Owner</Typography>
                        </Box>}
                    </Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#505050" }}>{role}</Typography>
                </Stack>
            </Stack>
            <Box sx={{ display: "flex", columnGap: "4px" }}>
                <img src={three_vertical_dots} alt="" />
                {groupRole !== "owner" && <Box
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
                    <Typography variant="gradientText">Message</Typography>
                </Box>}
            </Box>
        </Box>
    )
}

export default GroupMemberCard
